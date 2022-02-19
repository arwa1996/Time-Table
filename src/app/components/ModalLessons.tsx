import React from "react";
import { Modal } from "antd";

type modalProps = {
  onCancel: () => void;
  open: boolean;
  children: JSX.Element | JSX.Element[];
};

export const ModalLessons: React.FC<modalProps> = ({
  onCancel,
  open,
  children,
}) => {
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={open}
        onCancel={() => {
          onCancel();
        }}
        footer={null}
      >
        <div>{children}</div>
      </Modal>
    </div>
  );
};
