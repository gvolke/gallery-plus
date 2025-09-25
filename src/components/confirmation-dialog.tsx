import React from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./dialog";
import Text from "./text";
import Button from "./button";

interface ConfirmationDialogProps {
  trigger: React.ReactNode;
  tittle: string;
  content: string;
  onConfirm: () => void;
}

export default function ConfirmationDialog({
  trigger,
  tittle,
  content,
  onConfirm,
}: ConfirmationDialogProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isHandlingConfirmation, setIsHandlingConfirmation] =
    React.useTransition();

  function handleConfirmation() {
    setIsHandlingConfirmation(() => {
      onConfirm();
      setModalOpen(false);
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>{tittle}</DialogHeader>

        <DialogBody className="flex justify-center">
          <Text variant="paragraph-large">{content}</Text>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" disabled={isHandlingConfirmation}>
              Não
            </Button>
          </DialogClose>

          <Button
            disabled={isHandlingConfirmation}
            handling={isHandlingConfirmation}
            onClick={handleConfirmation}
            variant="primary"
          >
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
