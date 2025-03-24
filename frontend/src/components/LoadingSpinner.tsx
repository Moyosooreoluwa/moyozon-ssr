import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <Spinner
      variant="primary"
      animation="border"
      role="status"
      className="d-flex justify-content-center align-items-center"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default LoadingSpinner;
