import * as React from "react";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

function SendJobcoinForm() {
  return (
    <>
      <Text fontSize="xl">Send Jobcoin</Text>
      <Divider />
      <Stack
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
        spacing={4}
      >
        <FormControl isRequired>
          <FormLabel>Destination Address:</FormLabel>
          <Input type="text" name="toAddress" placeholder="E.g Jasmine" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Amount To Send:</FormLabel>
          <Input type="number" name="amount" placeholder="E.g 20" />
        </FormControl>
        <Button type="submit">Send Jobcoins</Button>
      </Stack>
    </>
  );
}

export default SendJobcoinForm;
