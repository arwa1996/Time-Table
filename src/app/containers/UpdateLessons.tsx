import * as React from "react";
import { Event } from "react-big-calendar";
import { useMutation } from "@apollo/client";
import { GET_All_LESSONS, UPDATE_LESSON } from "./data";
import { FormLessons } from "../components/FormLessons";

type FormProps = {
  closeModal: () => void;
  selectedEvent?: Event;
};

export const UpdateLessons: React.FC<FormProps> = ({
  selectedEvent,
  closeModal,
}) => {
  const [updateLessonsMutation, { error }] = useMutation(UPDATE_LESSON, {
    refetchQueries: [GET_All_LESSONS, "GetAllLessons"],
  });

  if (error) return <p>Something went wrong :(</p>;

  const onSubmit = (data: any) => {
    updateLessonsMutation({
      variables: {
        id: selectedEvent?.resource.id,
        title: selectedEvent?.title,
        description: data.description,
        subject: data.subject,
        start: selectedEvent?.start,
        end: selectedEvent?.end,
      },
    });
  };

  return (
    <FormLessons
      onSubmit={onSubmit}
      closeModal={() => closeModal()}
      start={selectedEvent?.start as string | undefined}
      end={selectedEvent?.end as string | undefined}
      selectedEvent={selectedEvent}
    />
  );
};
