import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import {
  Divider,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import AlertError from "./components/AlertError";
import Navbar from "./components/Navbar";
import SendJobcoinForm from "./components/SendJobcoinForm";
import { AddressData, getAddressInfo } from "./api/jobcoinApi";

interface HomeProps {
  // @see: App.tsx - Route component <Home> has a URL Parameter "address" used to fetch the data for home screen
  address: string;
}

function Home(props: RouteComponentProps<HomeProps>) {
  const returnToSignIn = () => {
    if (props.navigate) props.navigate("/");
  };

  const [showError, setShowError] = React.useState<boolean>(false);
  const onOpenError = () => {
    setShowError(true);
  };
  const onCloseError = () => {
    setShowError(false);
    returnToSignIn();
  };

  const [addressData, setAddressData] = React.useState<AddressData>();

  React.useEffect(() => {
    const loadAddressData = async () => {
      try {
        if (!props.address || props.address.length < 1) {
          throw new Error("Invalid address provided");
        }
        const res = await getAddressInfo(props.address);
        const data = res.data;
        if (data.transactions.length) {
          setAddressData(data);
        } else {
          throw new Error("Address does not have any transactions");
        }
      } catch (e) {
        console.warn(e);
        onOpenError();
      }
    };

    loadAddressData();
  }, [props.address]);

  //   @see: AlertError.tsx - ref needed for <AlertDialog>
  const cancelRef = React.useRef();

  console.log("address", props.address);

  return (
    <>
      <main>
        <Navbar address={props.address} handleSignOut={returnToSignIn} />
        <HStack align="flex-start" spacing={16} padding={16}>
          <Stack spacing={8}>
            <Stack
              padding={4}
              border="1px"
              borderColor="#ddd"
              borderRadius="4px"
            >
              <Text fontSize="xl">Balance:</Text>
              <Divider />

              {addressData ? (
                <Heading as="h2" size="2xl">
                  {addressData.balance}
                </Heading>
              ) : (
                <Spinner size="md" />
              )}
            </Stack>
            <Stack
              padding={4}
              border="1px"
              borderColor="#ddd"
              borderRadius="4px"
            >
              <SendJobcoinForm />
            </Stack>
          </Stack>
          <Stack padding={4} border="1px" borderColor="#ddd" borderRadius="4px">
            <Text>Balance:</Text>
            {addressData ? (
              <Heading as="h2" size="2xl">
                {addressData.balance}
              </Heading>
            ) : (
              <Spinner size="md" />
            )}
          </Stack>
        </HStack>
      </main>

      <AlertError
        leastDestructiveRef={cancelRef}
        isOpen={showError}
        onClose={onCloseError}
        headerLabel={"No activity found at the provided address"}
        bodyText={
          "Please return to the sign in page and enter a Jobcoin address that has at least one transaction."
        }
        buttonLabel={"Go Back"}
      />
    </>
  );
}

export default Home;
