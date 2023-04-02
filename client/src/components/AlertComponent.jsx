import { Alert, AlertDescription, AlertIcon, Box } from "@chakra-ui/react";

const AlertComponent = ({status,description}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginBottom="10px">
      <Alert w={["200px","350px","450px"]} status={status}  borderRadius="5px">
        <AlertIcon />
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>
    </Box>
  );
};

export default AlertComponent;
