import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_LESSON, GET_All_LESSONS } from "./data";
import { FormLessons } from "../components/FormLessons";

type FormProps = {
  start: string | undefined;
  end: string | undefined;
  closeModal: () => void;
};

export const CreateLessons: React.FC<FormProps> = ({
  start,
  end,
  closeModal,
}) => {
  const [createLessonsMutation, { error }] = useMutation(CREATE_LESSON, {
    refetchQueries: [GET_All_LESSONS, "GetAllLessons"],
  });

  if (error) return <p>Something went wrong :(</p>;

  const onSubmit = (data: {
    lesson: { title: string; description: string; subject: string };
  }) => {
    createLessonsMutation({
      variables: {
        title: data.lesson.title,
        description: data.lesson.description,
        subject: data.lesson.subject,
        start: start,
        end: end,
      },
    });
    closeModal();
  };

  return <FormLessons onSubmit={onSubmit} start={start} end={end} />;
};
