import * as React from "react";
import { Event } from "react-big-calendar";
import { useMutation } from "@apollo/client";
import { GET_All_LESSONS, REMOVE_LESSON } from "./data";
import { Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ModalFunc } from "antd/lib/modal/confirm";

type FormProps = {
  closeModal: () => void;
  selectedEvent?: Event;
  confirm: ModalFunc;
};

export const DeleteLessons: React.FC<FormProps> = ({
  selectedEvent,
  closeModal,
  confirm,
}) => {
  const [deleteLessonsMutation, { error }] = useMutation(REMOVE_LESSON, {
    refetchQueries: [GET_All_LESSONS, "GetAllLessons"],
  });

  if (error) return <p>Something went wrong :(</p>;

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure about deleting this lesson ?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteLessonsMutation({
          variables: {
            id: selectedEvent?.resource.id,
          },
        });
        closeModal();
      },
    });
  };

  return (
    <>
      <Button type="dashed" onClick={() => showDeleteConfirm()}>
        Delete Lesson
      </Button>
    </>
  );
};
