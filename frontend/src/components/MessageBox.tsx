import { Alert } from 'react-bootstrap';

interface MessageBoxProps {
  variant?: string;
  children: React.ReactNode;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  variant = 'info',
  children,
}) => {
  return (
    <Alert variant={variant} className="m-auto text-center">
      {children}
    </Alert>
  );
};

export default MessageBox;
