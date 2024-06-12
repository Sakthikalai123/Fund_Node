const PageNotFound = () => {
  document.title = '404: Page Not Found'
  return (
    <div
      className="mt-5 pt-5 d-flex flex-column align-items-center justify-content-center text-secondary"
      style={{ fontWeight: 600 }}
    >
      <div className="d-flex align-items-center">
        <span className="h3">
          <strong>Error 404</strong>
        </span>
        <span className="h5">&nbsp;-&nbsp; Page Not Found</span>
      </div>
      <p>
        Sorry, but the page you were trying to view does not exist.        
      </p>
    </div>
  );
};

export default PageNotFound;
