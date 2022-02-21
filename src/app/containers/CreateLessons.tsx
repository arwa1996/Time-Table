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

  const onSubmit = (data: any) => {
    createLessonsMutation({
      variables: {
        title: data.title,
        description: data.description,
        subject: data.subject,
        start: start,
        end: end,
      },
    });
  };

  return (
    <FormLessons
      onSubmit={onSubmit}
      start={start}
      end={end}
      closeModal={() => closeModal()}
    />
  );
};
