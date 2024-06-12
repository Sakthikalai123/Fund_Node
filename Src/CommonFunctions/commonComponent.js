import { DatePicker, Pagination } from 'rsuite';
import { Fragment, useEffect, useCallback } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall } from '../Redux/action';
import { commonActions } from '../Redux/action';
import classes from './commonComponent.module.css';
export const DateSelector = (props) => {
  const shouldDisableDate = (date) => {
    const today = new Date();
    return date > today;
  };
  return (
    <DatePicker
      /* size='sm' */
      className={classes.datePicker}
      cleanable={false}
      editable={false}
      format='dd MMM yyyy'
      placeholder="select"
      shouldDisableDate={shouldDisableDate}
      /* showMeridian */
      oneTap={true}
      placement={`${props.placement !== undefined ? props.placement : 'auto'}`}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  );
};
export const Title = (props) => {
  return (
    <div className={classes.title}>
      <span>
        <strong data-testid='title'>{props.title}</strong>
        {props.children}
      </span>
    </div>
  );
};
export const Response = (props) => {
  let iconBackground, loader, message;
  const dispatch = useDispatch();
  const closeAlert = useCallback(() => {
    dispatch(commonActions.setUpdating(false));
    dispatch(commonActions.setResponse({ message: null, status: null }));
  }, [dispatch]);  
  if (props.status === 'SUCCESS') {
    iconBackground = 'rgb(48, 198, 48, 15%)';
    loader = 'rgb(48, 198, 48)';
    message = props.message;
  } else {
    iconBackground = 'rgb(220, 53, 69, 15%)';
    loader = 'red';
    message = props.message;
  }
  useEffect(() => {
    let time = setTimeout(() => closeAlert(), 4900);
    return () => clearTimeout(time);
  }, [closeAlert]);
  return (    
    <div
      className={classes.toast}
      style={{ borderLeft: `.25rem solid ${loader}` }}
    >
      <section className={classes.toastHeader}>
        <div className='d-flex align-items-center'>
          <div
            className={`${classes.toastIcon} ${classes.toastIconEffect}`}
            style={{ backgroundColor: `${iconBackground}` }}
          >
            {props.status === 'SUCCESS' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='rgb(48, 198, 48)'
                className='bi bi-check-circle-fill '
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='red'
                className='bi bi-exclamation-circle-fill '
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
              </svg>
            )}
          </div>
          <div className='px-3'>
            <strong>{props.status}</strong>
            <div className='text-secondary'>{message}</div>
          </div>
        </div>
        <div className={classes.toastIcon} onClick={closeAlert}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='gray'
            className='bi bi-x'
            viewBox='0 0 16 16'
          >
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
          </svg>
        </div>
      </section>
      <div
        className={classes.toastLoader}
        style={{ backgroundColor: `${loader}` }}
      ></div>
    </div>
  );
};
export const CustomButton = (props) => {
  let className =
    props.className === 'default' ? classes.customButton : props.className;

  return (
    <Button
      style={props.style}
      onClick={props.onClick}
      size='sm'
      className={`${className} `}
      variant={props.variant}
      type={props.type}
    >
      {props.children}
    </Button>
  );
};

export const Layout = (props) => {
  return (
    <div className={classes.layout} data-testid='mainLayout'>
      {props.children}
    </div>
  );
};
export const Header = (props) => {
  return (
    <div className={classes.layout_header} data-testid='header'>
      {props.children}
    </div>
  );
};
export const FormLayout = (props) => {
  return (
    <div className={classes.formlayout} data-testid='formLayout'>
      {props.children}
    </div>
  );
};

export const ActionBar = (props) => {
  return (
    <div className={classes.layout_actionbar} data-testid='actionbar'>
      {props.children}
    </div>
  );
};
export const Body = (props) => {
  return (
    <div className={classes.layout_body} data-testid='body'>
      {props.children}
    </div>
  );
};
export const Footer = (props) => {
  return (
    <div className={classes.layout_footer} data-testid='footer'>
      {props.children}
    </div>
  );
};

export const Page = (props) => {
  const searchApi = props.updateApi.search;
  const dispatch = useDispatch();
  const commonData = useSelector((state) => state.commonData);
  let count = Math.ceil(props.totalRecords / 10);
  let limitOptions = [];
  let showRecordPerPage = true;
  if (props.name === 'Exception Trade') {
    for (let i = 2; i <= count; i++) {
      if (i <= 5) {
        limitOptions[i - 1] = i * 10;
      } else break;
    }
  } else {
    for (let i = 1; i <= count; i++) {
      if (i <= 5) {
        limitOptions[i - 1] = i * 10;
      } else break;
    }
  }
  if (props.name === 'Exception Trade') {
    showRecordPerPage = props.totalRecords > 20 ? true : false;
  } else {
    showRecordPerPage = props.totalRecords > 10 ? true : false;
  }
  const changeRecordPerPage = async (e) => {
    let pageSize = parseInt(e.target.value);
    dispatch(commonActions.setPageSize(pageSize));
    dispatch(commonActions.setPageNumber(1));
    dispatch(commonActions.setGetRequestData());
    dispatch(commonActions.setLoading(true));
    await dispatch(apiCall({ ...searchApi }));
    dispatch(commonActions.setLoading(false));
  };
  const changePageNumber = async (e) => {
    dispatch(commonActions.setPageNumber(e));
    dispatch(commonActions.setGetRequestData());
    dispatch(commonActions.setLoading(true));
    await dispatch(apiCall({ ...searchApi }));
    dispatch(commonActions.setLoading(false));
  };
  return (
    <>
      {props.totalRecords > 0 && !commonData.isError && (
        <Row data-testid='pagination'>
          <Col sm={3} className='d-inline-flex align-items-center'>
            <strong>{`Total Records :  ${props.totalRecords}`}</strong>
          </Col>
          <Col sm={9} className='d-flex flex-row-reverse'>
            {showRecordPerPage && (
              <Form.Select
                name='rowcountselector'
                size='sm'
                style={{ width: 'fit-content' }}
                onChange={changeRecordPerPage}
              >
                {limitOptions.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </Form.Select>
            )}
            <Pagination
              prev
              next
              boundaryLinks
              maxButtons={5}
              ellipsis
              total={props.totalRecords}
              limit={props.recordsPerPage}
              activePage={props.pageNo}
              onChangePage={changePageNumber}
            />
          </Col>
        </Row>
      )}
    </>
  );
};
export const WarningModal = (props) => {
  return (
    <Modal
      show={props.isOpen}
      size='sm'
      backdrop='static'
      keyboard={false}
      centered
    >
      <Modal.Header className='text-center p-0 border-0'>
        <div className={classes.conformationModalTop}>
          <span className={classes.conformationModalTopIcon}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-exclamation-triangle'
              viewBox='0 0 16 16'
            >
              <path d='M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z' />
              <path d='M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z' />
            </svg>
          </span>
        </div>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <h5 className='mt-3'>Are you sure ?</h5>
        <span className='p-1'>{props.message}.</span>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            size='sm'
            style={{ minWidth: '4rem' }}
            variant='danger'
            className='mx-2 '
            onClick={props.proceed}
          >
            Ok
          </Button>
          <Button
            size='sm'
            style={{ minWidth: '4rem' }}
            variant='light'
            onClick={props.cancel}
          >
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export const ErrorModal = ({ totalError, title, ...props }) => {
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton className={classes.errorModalHeader}>
        <div className={classes.errorModalHeaderContent}>          
          <span>{title}</span>
        </div>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>

      {totalError !== undefined ? ( // checking wheather we have totalError props or not
        <Modal.Footer>
          <div className='d-flex w-100 justify-content-between'>
            <span>
              <strong>Total Records :&nbsp;{totalError}</strong>
            </span>
            <Button onClick={props.onHide} size='sm' variant='light'>
              Close
            </Button>
          </div>
        </Modal.Footer>
      ) : (
        <Modal.Footer>
          <Button size='sm' variant='light' onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};
export const NoRecordFound = (props) => {
  const { page } = props;
  return (
    <Fragment>
      <div className={classes.noRecordFound}>
        <span>
          <i className='bi bi-file-earmark-x-fill fs-1 '></i>
        </span>
        <div>Data Not Found</div>
        {page === 'dashboard' && (
          <div className={classes.suggestionMsg}>
            <span>
              No data found for the selected daterange. please try with
              different daterange.
            </span>
          </div>
        )}
        {/*  <div className={classes.suggestionMsg}>
          {page === 'dashboard' ?
          <span>
              No data found for the selected daterange. please try with different daterange.
          </span>
          :
          <span>
            Please try with different search criteria.
            </span>}
        </div> */}
      </div>
    </Fragment>
  );
};
export const ReloadMsg = () => {
  return (
    <div className='text-center'>
      <hr></hr>
      <h6 className='text-danger'>Something went wrong</h6>
      <Button
        size='sm'
        variant='light'
        onClick={() => window.location.reload()}
      >
        Reload Page
      </Button>
    </div>
  );
};

export const Frame = (props) =>{
return <div className='p-2 m-5 d-flex justify-content-center text-center fw-bold text-secondary'>
  {props.children}
</div>
}
