import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ReactComponent as Logo } from "./images/jobcoin-logo.svg";

function Login(props: RouteComponentProps) {
  const [address, setAddress] = React.useState<string>("");

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const addressVal = event.target.value.trim();
    setAddress(addressVal);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.navigate && props.navigate(`/home/${address}`);
  };

  return (
    <Flex
      height="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Logo width="200px" />
      <Heading as="h2" size="lg" maxW={300} pb={8} textAlign="center">
        Jobcoiner
      </Heading>
      <Box px={16} py={16} borderRadius="md" borderWidth="1px">
        <Stack spacing={8}>
          <Heading as="h4" size="md" maxW={300} textAlign="center">
            Welcome! Sign in with your Jobcoin Address
          </Heading>
          <hr />
          <Stack as="form" onSubmit={handleSubmit} spacing={8}>
            <Stack spacing={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="address">Jobcoin Address</FormLabel>
                <Input
                  autoFocus
                  name="address"
                  type="text"
                  onChange={handleAddressChange}
                  placeholder="E.g 'Alice'"
                />
              </FormControl>
            </Stack>
            <Button type="submit" isFullWidth>
              Sign In
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Login;
