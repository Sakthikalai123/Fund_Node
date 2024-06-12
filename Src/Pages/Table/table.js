import React, { useState, useEffect, Fragment, useRef } from "react";
import { Table} from "react-bootstrap";
import { Whisper, Tooltip } from "rsuite";
import { NoRecordFound, ReloadMsg } from "../../CommonFunctions/commonComponent";
import { apiCall, commonActions } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import classes from "./table.module.css";
import TableData from "./tableData";
import { getUserRole, useCustomLocation } from "../../CommonFunctions/commonFunction";

const MainTable = (props) => {
  const dispatch = useDispatch();
  const {isClientView} = useCustomLocation();
  const [sorting, setSorting] = useState(props.sortData);
  const onMount = useRef(true);
  const commonData = useSelector((state) => state.commonData);
  const tableApi = props.updateApi.search;
  const userRole = getUserRole();
  const availableSortColumn = props.availableSortColumn;
  useEffect(() => {
    const triggerApiCall = async() =>{
      dispatch(commonActions.setPageNumber(1));
      dispatch(commonActions.setSortDate(sorting));
      dispatch(commonActions.setGetRequestData());
      dispatch(commonActions.setLoading(true));
      await dispatch(apiCall({ ...tableApi }));
      dispatch(commonActions.setLoading(false));
  }
    if (onMount.current) {
      onMount.current = false;
      return;
    } else {
      triggerApiCall();
    }    
  }, [sorting, dispatch, tableApi]); // need to check
  return (
    <div>
      {(!commonData.isError && commonData.records.totalRecords > 0) && (
        <div className={`${isClientView ? classes.client_table_responsive : classes.ops_table_responsive}`}>
          <Table bordered striped size="sm" className={classes.table}>
            <thead>
              <tr>
                {props.tableData.map((data, index) => {
                  if(data?.name === "Approve / Reject" && userRole !== "Admin" ){ // only for distributor Upload table. To show approval for Admin.
                    return null
                  }else{
                  let stats = (data.type === "stats");                  
                  return (
                    <th
                      key={index}
                      style={{
                              width:`${(data.name === "Action") ? data.width : "auto"}`                             
                            }
                            }  
                      rowSpan={`${stats ? 1 : 2}`}
                      colSpan={`${stats ? 3 : 1}`}
                      onClick={() => {
                        const elegibleForSort = availableSortColumn.some(
                          (avilablecolumn) => ((avilablecolumn === data.id) && (data.name !== "Approve / Reject"))
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
                          {(data.name === "Action" && userRole !== "Admin") ? null : data.name } 
                        </div>
                        {availableSortColumn.some(
                          (avilablecolumn) => (avilablecolumn === data.id && data.name !== "Approve / Reject") //newly added for upload
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
                   }
                })}
              </tr>
              <tr style={{ backgroundColor: "rgb(210 215 234)" }}>
                {props.tableData.map((data, index) => {
                  let stats = data.type === "stats";
                  if (stats) {
                    return (
                      <Fragment key={index}>
                        <th className={classes.stats}>                          
                          <Whisper
                            placement="bottomStart"
                            controlid="control-id-total"
                            trigger="hover"
                            speaker={<Tooltip>Total</Tooltip>}
                          >                            
                            <i className="bi bi-clipboard2-check-fill text-primary"></i>
                          </Whisper>
                        </th>
                        <th className={classes.stats}>
                          <Whisper
                            placement="bottomStart"
                            controlid="control-id-success"
                            trigger="hover"
                            speaker={<Tooltip>Success</Tooltip>}
                          >                           
                            <i className="bi bi-hand-thumbs-up-fill text-success"></i>
                          </Whisper>
                        </th>
                        <th className={classes.stats}>                          
                          <Whisper
                            placement="bottomStart"
                            controlid="control-id-failed"
                            trigger="hover"
                            speaker={<Tooltip>Failed</Tooltip>}
                          >                           
                            <i className="bi bi-hand-thumbs-down-fill text-danger"></i>
                          </Whisper>
                        </th>
                      </Fragment>
                    );
                  } else return null;
                })}
              </tr>
            </thead>
            <tbody className={commonData.isLoading ? classes.tableBody : ""}>
              { (commonData.records.data === undefined)
                ? []
                : commonData.records.data.map(
                    (data, index) => (
                      <TableData
                        key={index}
                        values={data}
                        index={index}  // added to set unique controlId for tooltip
                        id={props.id}
                        tableData={props.tableData}
                        updateApi={props.updateApi}
                        userRole={userRole}
                      ></TableData>
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
