import * as React from "react";
import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { ReactComponent as Logo } from "../images/jobcoin-logo.svg";

interface NavbarProps {
  address?: string;
  handleSignOut: () => void;
}

function Navbar(props: NavbarProps) {
  return (
    <Flex
      as="nav"
      padding={2}
      alignItems="center"
      borderBottom="1px"
      borderColor="#ddd"
    >
      <Logo width={50} />
      <Heading as="h3" size="lg">
        Jobcoiner
      </Heading>
      <Spacer />
      <Text marginX={4}>Hi, {props.address}!</Text>
      <Button onClick={props.handleSignOut}>Sign Out</Button>
    </Flex>
  );
}

export default Navbar;
