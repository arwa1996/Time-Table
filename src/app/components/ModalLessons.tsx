import React from "react";
import { Modal } from "antd";

type modalProps = {
  onCancel: () => void;
  open: boolean;
  children: JSX.Element | JSX.Element[];
  footer?: React.ReactNode;
};

export const ModalLessons: React.FC<modalProps> = ({
  onCancel,
  open,
  children,
  footer,
}) => {
  return (
    <div>
      <Modal
        title="Lessons Modal"
        visible={open}
        onCancel={() => {
          onCancel();
        }}
        footer={footer}
      >
        <div>{children}</div>
      </Modal>
    </div>
  );
};
