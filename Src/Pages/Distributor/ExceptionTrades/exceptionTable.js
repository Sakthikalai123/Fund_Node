import React, { useState, useEffect, useRef } from "react";
import { Table} from "react-bootstrap";
import { NoRecordFound, ReloadMsg } from "../../../CommonFunctions/commonComponent";
import { apiCall, commonActions } from "../../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import classes from "./exceptionTable.module.css";
import ExceptionTableData from "./exceptionTableData";
import { getUserRole } from "../../../CommonFunctions/commonFunction";

const MainTable = (props) => {
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState(props.sortData);
  const onMount = useRef(true);
  const commonData = useSelector((state) => state.commonData);
  const tableApi = props.updateApi.search;
  const userRole = getUserRole();
  const availableSortColumn = props.availableSortColumn;
  useEffect(() => {
    if (onMount.current) {
      onMount.current = false;
      return;
    } else { 
      dispatch(commonActions.setPageNumber(1));
      dispatch(commonActions.setSortDate(sorting));
      dispatch(commonActions.setGetRequestData());
      dispatch(apiCall({ ...tableApi }));
    }
  }, [sorting, dispatch, tableApi]); 
  return (
    <div>
      {(!commonData.isError && commonData.records.totalRecords > 0) && (
        <div className={classes.table_responsive}>
          <Table bordered striped size="sm" className={classes.table}>
            <thead>
              <tr>
                {props.tableData.map((data, index) => {
                  let stats = (data.type === "stats");
                  if(data?.name === "Approve / Reject" && userRole !== "Admin" ){ //  To show approval for Admin.
                    return null
                  }
                  return (
                    <th
                      key={index}
                      style={{
                              width:`${data.name === "Approve / Reject" ? data.width : "auto"}`                             
                            }
                            }  
                      rowSpan={`${stats ? 1 : 2}`}
                      colSpan={`${stats ? 3 : 1}`}
                      onClick={() => {
                        const elegibleForSort = availableSortColumn.some(
                          (avilablecolumn) => avilablecolumn === data.id
                        );
                        if (elegibleForSort) {
                          if (sorting.sortColumn === data.id) {
                            setSorting((prev) => {
                              return {
                                ...prev,
                                sortOrder:
                                  prev.sortOrder === "asc" ? "desc" : "asc",
                              };
                            });
                          } else {
                            setSorting({
                              sortColumn: data.id,
                              sortOrder: "asc",
                            });
                          }
                        }
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <div>                                                                   
                          { data.name } 
                        </div>
                        {availableSortColumn.some(
                          (avilablecolumn) => (avilablecolumn === data.id && data.name !== "Approve / Reject") 
                        ) && (
                          <div className="d-inline-flex flex-column px-2">
                            {sorting.sortOrder === "asc" &&
                            sorting.sortColumn === data.id ? (
                              <i
                                style={{ color: "black", height: "1px" }}
                                className="fa fa-sort-up"
                              />
                            ) : (
                              <i
                                style={{
                                  color: "rgb(142 142 147)",
                                  height: "1px",
                                }}
                                className="fa fa-sort-up"
                              />
                            )}
                            {sorting.sortOrder === "desc" &&
                            sorting.sortColumn === data.id ? (
                              <i
                                style={{ color: "black" }}
                                className="fa fa-sort-down"
                              />
                            ) : (
                              <i
                                style={{ color: "rgb(142 142 147)" }}
                                className="fa fa-sort-down"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>              
            </thead>
            <tbody className={commonData.isLoading ? classes.tableBody : ""}>
              { (commonData.records.data === undefined)
                ? []
                : commonData.records.data.map(
                    (data, index) => (
                      <ExceptionTableData
                        key={index}
                        values={data}
                        index={index} // added to set unique controlId for tooltip                       
                        tableData={props.tableData}                        
                        userRole={userRole}
                      ></ExceptionTableData>
                    )
                  )}
            </tbody>
          </Table>
        </div>
      )}
      {commonData.records.totalRecords === 0 &&
        !commonData.isLoading &&
        !commonData.isError && (
          <NoRecordFound/>
        )}
      {commonData.isError && (
        <ReloadMsg/>
      )}
    </div>
  );
};

export default React.memo(MainTable);


