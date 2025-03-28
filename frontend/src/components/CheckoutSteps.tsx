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
            ? 'text-[#edcf5d] border-b-2 border-[#edcf5d]'
            : 'text-[#edcf5d] border-b-2 border-[#edcf5d]'
        }`}
      >
        Sign-In
      </Col>
      <Col
        className={`pb-2 ${
          props.step2
            ? 'text-[#edcf5d] border-b-2 border-[#edcf5d]'
            : 'text-[#a4a4a4] border-b-2 border-[#a4a4a4]'
        }`}
      >
        Shipping
      </Col>
      <Col
        className={`pb-2 ${
          props.step3
            ? 'text-[#edcf5d] border-b-2 border-[#edcf5d]'
            : 'text-[#a4a4a4] border-b-2 border-[#a4a4a4]'
        }`}
      >
        Payment
      </Col>
      <Col
        className={`pb-2 ${
          props.step4
            ? 'text-[#edcf5d] border-b-2 border-[#edcf5d]'
            : 'text-[#a4a4a4] border-b-2 border-[#a4a4a4]'
        }`}
      >
        Place Order
      </Col>
    </Row>
  );
};

export default CheckoutSteps;
