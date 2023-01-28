import { FC } from 'react';
import Button from './Layout/Button';
import Container from './Layout/Container';
import HelperText from './Layout/HelperText';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="grid h-screen w-screen place-items-center" role="alert">
      <Container>
        <span>Ein Fehler ist aufgetretten</span>
        <HelperText type="error">{error.message}</HelperText>
        <Button onClick={resetErrorBoundary}>Erneut Versuchen</Button>
      </Container>
    </div>
  );
};

export default ErrorFallback;
