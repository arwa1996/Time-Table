import * as React from "react";
import { Event } from "react-big-calendar";
import { useMutation } from "@apollo/client";
import { GET_All_LESSONS, UPDATE_LESSON } from "./data";
import { FormLessons } from "../components/FormLessons";

type FormProps = {
  closeModal: () => void;
  selectedLesson?: Event;
};

export const UpdateLessons: React.FC<FormProps> = ({
  selectedLesson,
  closeModal,
}) => {
  const [updateLessonsMutation, { error }] = useMutation(UPDATE_LESSON, {
    refetchQueries: [GET_All_LESSONS, "GetAllLessons"],
  });

  if (error) return <p>Something went wrong :(</p>;

  const onSubmit = (data: any) => {
    updateLessonsMutation({
      variables: {
        id: selectedLesson?.resource.id,
        title: selectedLesson?.title,
        description: data.description,
        subject: data.subject,
        start: selectedLesson?.start,
        end: selectedLesson?.end,
      },
    });
    closeModal();
  };
  return (
    <FormLessons
      onSubmit={onSubmit}
      start={selectedLesson?.start as string | undefined}
      end={selectedLesson?.end as string | undefined}
      selectedLesson={selectedLesson}
    />
  );
};
