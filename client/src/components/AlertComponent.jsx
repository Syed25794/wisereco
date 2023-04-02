import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";

const AlertComponent = ({status,description}) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
