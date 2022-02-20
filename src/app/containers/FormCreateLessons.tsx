import * as React from "react";
import { Event } from "react-big-calendar";
import { useMutation } from "@apollo/client";
import { CREATE_LESSON, GET_All_LESSONS } from "./data";
import { FormLessons } from "../components/FormLessons";

type FormProps = {
  lessons: Event[];
  start: string | undefined;
  end: string | undefined;
  closeModal: () => void;
};

export const FormCreateLessons: React.FC<FormProps> = ({
  lessons,
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
      lessons={lessons}
    />
  );
};
