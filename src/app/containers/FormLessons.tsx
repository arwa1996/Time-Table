import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Event } from "react-big-calendar";
import { useMutation } from "@apollo/client";
import {
  CREATE_LESSON,
  GET_All_LESSONS,
  UPDATE_LESSON,
  REMOVE_LESSON,
} from "./data";
import { Button, Form, Input } from "antd";

type FormProps = {
  title: string;
  subject: string;
  description: string;
  lessons: Event[];
  start: string | undefined;
  end: string | undefined;
  closeModal: () => void;
  createLessons: boolean;
  updateLessons: boolean;
  selectedEvent?: Event;
};

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export const FormLessons: React.FC<FormProps> = ({
  lessons,
  createLessons,
  updateLessons,
  selectedEvent,
  start,
  end,
  closeModal,
}) => {
  const { setValue, handleSubmit, control, reset } = useForm<FormProps>();

  const [createLessonsMutation, { error }] = useMutation(CREATE_LESSON, {
    refetchQueries: [GET_All_LESSONS, "GetAllLessons"],
  });

  if (error) return <p>Something went wrong :(</p>;

  const onSubmit = handleSubmit((data) => {
    console.log("inside submit");
    if (createLessons) {
      console.log("createLessons");
      createLessonsMutation({
        variables: {
          title: data.title,
          description: data.description,
          subject: data.subject,
          start: start,
          end: end,
        },
      });
      reset({
        title: "",
        subject: "",
        start: "",
        end: "",
        description: "",
      });
    }
    // if (updateLessons) {
    //   // I have selected event as a prop
    //   console.log("updateLessons");
    //   updateLessonsMutation({
    //     variables: {
    //       id: selectedEvent?.resource.id,
    //       title: data?.title,
    //       description: data.description,
    //       subject: data.subject,
    //       start: selectedEvent?.start,
    //       end: selectedEvent?.end,
    //     },
    //   });
    // }
  });

  return (
    <Form {...layout} name="nest-messages" onFinish={onSubmit}>
      <Form.Item name={["lesson", "title"]} label="lesson Title">
        <Controller
          render={({ value, onChange }) => (
            <Input value={value} onChange={onChange} />
          )}
          control={control}
          rules={{ required: true }}
          name="title"
          defaultValue={selectedEvent?.title || ""}
        />
      </Form.Item>
      <Form.Item name={["lesson", "subject"]} label="Subject">
        <Controller
          render={({ value, onChange }) => (
            <Input value={value} onChange={onChange} />
          )}
          name="subject"
          control={control}
          defaultValue={selectedEvent?.resource.subject || ""}
          rules={{ required: true }}
        />
      </Form.Item>
      <Form.Item name={["lesson", "start"]} label="Start">
        <Controller
          render={() => (
            <Input value={start} onChange={() => setValue("start", start)} />
          )}
          name="start"
          control={control}
          defaultValue={selectedEvent?.start || ""}
        />
      </Form.Item>

      <Form.Item name={["lesson", "end"]} label="End">
        <Controller
          render={() => (
            <Input value={end} onChange={() => setValue("end", end)} />
          )}
          name="end"
          control={control}
          defaultValue={selectedEvent?.end || ""}
        />
      </Form.Item>
      <Form.Item name={["lesson", "description"]} label="Description">
        <Controller
          render={({ value, onChange }) => (
            <Input.TextArea value={value} onChange={onChange} />
          )}
          name="description"
          control={control}
          defaultValue={selectedEvent?.resource.description || ""}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
        <Button
          type="primary"
          htmlType="submit"
          // onClick={() => closeModal()}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
