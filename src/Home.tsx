import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import {
  Flex,
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
import AddressHistoryGraph from "./components/AddressHistoryGraph";
import {
  AddressData,
  TransactionParams,
  getAddressInfo,
  sendJobcoin,
} from "./api/jobcoinApi";

interface HomeProps {
  // @see: App.tsx - Route component <Home> has a URL Parameter "address" used to fetch the data for home screen
  address: string;
}

function Home(props: RouteComponentProps<HomeProps>) {
  // Navigate back to sign in
  const returnToSignIn = () => {
    if (props.navigate) props.navigate("/");
  };

  // State hooks
  const [showAddressError, setShowAddressError] = React.useState<boolean>(
    false
  );
  const [addressData, setAddressData] = React.useState<AddressData>();
  const [sendJobcoinError, setSendJobcoinError] = React.useState<string>("");
  // @see: <AlertError> - show/hide alert callbacks
  const onOpenAddressError = () => {
    setShowAddressError(true);
  };
  const onCloseAddressError = () => {
    setShowAddressError(false);
    returnToSignIn();
  };
  const onOpenSendJobcoinError = (errorMsg: string) => {
    setSendJobcoinError(errorMsg);
  };
  const onCloseSendJobcoinError = () => {
    setSendJobcoinError("");
  };

  const handleSendJobcoin = async (params: TransactionParams) => {
    try {
      if (props.address) {
        await sendJobcoin(params);
        const { data } = await getAddressInfo(props.address);
        setAddressData(data);
      }
    } catch (e) {
      onOpenSendJobcoinError(e.response.data.error);
    }
  };

  // Load address data on component load
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
        // Any errors will spawn alert
        console.warn(e);
        onOpenAddressError();
      }
    };

    loadAddressData();
  }, [props.address]);

  //   @see: AlertError.tsx - ref needed for <AlertDialog>
  const cancelRef = React.useRef();

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
              <SendJobcoinForm
                address={props.address}
                handleSubmit={handleSendJobcoin}
              />
            </Stack>
          </Stack>
          <Flex
            flexGrow={1}
            flexDirection="column"
            padding={4}
            border="1px"
            borderColor="#ddd"
            borderRadius="4px"
          >
            <AddressHistoryGraph
              address={props.address}
              addressData={addressData}
            />
          </Flex>
        </HStack>
      </main>

      <AlertError
        leastDestructiveRef={cancelRef}
        isOpen={showAddressError}
        onClose={onCloseAddressError}
        headerLabel={"No activity found at the provided address"}
        bodyText={
          "Please return to the sign in page and enter a Jobcoin address that has at least one transaction."
        }
        buttonLabel={"Go Back"}
      />

      <AlertError
        leastDestructiveRef={cancelRef}
        isOpen={!!sendJobcoinError}
        onClose={onCloseSendJobcoinError}
        headerLabel={"Could not send coins"}
        bodyText={sendJobcoinError}
        buttonLabel={"Go Back"}
      />
    </>
  );
}

export default Home;
