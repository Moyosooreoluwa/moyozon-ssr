import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface CheckoutStepsProps {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = (props) => {
  return (
    <Row className="checkout-steps mb-4">
      <Col
        className={`pb-2 ${
          props.step1
            ? 'text-green-600 border-b-2 border-green-600'
            : 'text-gray-500 border-b-2 border-gray-500'
        }`}
      >
        Sign-In
      </Col>
      <Col
        className={`pb-2 ${
          props.step2
            ? 'text-green-600 border-b-2 border-green-600'
            : 'text-gray-500 border-b-2 border-gray-500'
        }`}
      >
        Shipping
      </Col>
      <Col
        className={`pb-2 ${
          props.step3
            ? 'text-green-600 border-b-2 border-green-600'
            : 'text-gray-500 border-b-2 border-gray-500'
        }`}
      >
        Payment
      </Col>
      <Col
        className={`pb-2 ${
          props.step4
            ? 'text-green-600 border-b-2 border-green-600'
            : 'text-gray-500 border-b-2 border-gray-500'
        }`}
      >
        Place Order
      </Col>
    </Row>
  );
};

export default CheckoutSteps;
