import React from "react";
import { Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type cardProps = {
  children: JSX.Element | JSX.Element[];
};

export const CardLessons: React.FC<cardProps> = ({ children }) => {
  return (
    <>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <div>{children}</div>
      </Card>
    </>
  );
};
