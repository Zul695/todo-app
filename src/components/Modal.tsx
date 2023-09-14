import React from "react";
import { Modal as MantineModal } from "@mantine/core";

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, setOpen, title, children }: IModal) {
  return (
    <React.Fragment>
      <MantineModal
        opened={open}
        onClose={() => setOpen(false)}
        title={<h3>{title}</h3>}
      >
        {children}
      </MantineModal>
    </React.Fragment>
  );
}
