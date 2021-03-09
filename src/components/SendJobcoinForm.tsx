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
import { TransactionParams } from "../api/jobcoinApi";

interface SendJobcoinFormProps {
  address?: string;
  handleSubmit: (params: TransactionParams) => void;
}

function SendJobcoinForm(props: SendJobcoinFormProps) {
  // State Hooks (controlled inputs)
  const [toAddress, setToAddress] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");

  const handleSendJobcoin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (props.address) {
      const params: TransactionParams = {
        fromAddress: props.address,
        toAddress: toAddress.trim(),
        amount: amount.trim(),
      };
      // Submit send jobcoin API call
      props.handleSubmit(params);
      // Clear inputs
      setToAddress("");
      setAmount("");
    }
  };

  const handleDestinationAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const destinationAddressVal = event.target.value;
    setToAddress(destinationAddressVal);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amountVal = event.target.value;
    setAmount(amountVal);
  };

  return (
    <>
      <Text fontSize="xl">Send Jobcoin</Text>
      <Divider />
      <Stack as="form" onSubmit={handleSendJobcoin} spacing={4}>
        <FormControl isRequired>
          <FormLabel>Destination Address:</FormLabel>
          <Input
            value={toAddress}
            type="text"
            name="toAddress"
            placeholder="E.g Jasmine"
            onChange={handleDestinationAddressChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Amount To Send:</FormLabel>
          <Input
            value={amount}
            type="number"
            name="amount"
            placeholder="E.g 20"
            onChange={handleAmountChange}
          />
        </FormControl>
        <Button type="submit">Send Jobcoins</Button>
      </Stack>
    </>
  );
}

export default SendJobcoinForm;
