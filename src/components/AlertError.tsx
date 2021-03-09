import * as React from "react";
import {
  UseModalProps,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

type Props = {
  headerLabel: string;
  bodyText: string;
  buttonLabel: string;
  leastDestructiveRef: React.RefObject<any>;
};

export type AlertErrorProps = UseModalProps & Props;

/**
 * This alert condenses the verbose <AlertDialog> UI code into a reusable component. This simple alert exposes:
 * - A header message
 * - A body of text
 * - One button that executes a callback passed in
 * @param props: type AlertErrorProps
 */
function AlertError(props: AlertErrorProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{props.headerLabel}</AlertDialogHeader>

        <AlertDialogBody>{props.bodyText}</AlertDialogBody>

        <AlertDialogFooter>
          <Button colorScheme="red" onClick={props.onClose}>
            {props.buttonLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertError;
