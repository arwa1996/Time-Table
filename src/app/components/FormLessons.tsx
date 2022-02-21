import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Event } from "react-big-calendar";
import { Button, Form, Input } from "antd";

type FormProps = {
  start?: string | undefined;
  end?: string | undefined;
  closeModal: () => void;
  selectedEvent?: Event;
  onSubmit: (data: any) => void;
};

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export const FormLessons: React.FC<FormProps> = ({
  selectedEvent,
  start,
  end,
  onSubmit,
  closeModal,
}) => {
  const lessonDefaultValues = {
    title: selectedEvent?.title || "",
    subject: selectedEvent?.resource.subject || "",
    start: (selectedEvent?.start as string | undefined) || "",
    end: (selectedEvent?.end as string | undefined) || "",
    description: selectedEvent?.resource.description || "",
  };

  const { setValue, handleSubmit, control, reset } = useForm<FormProps>({
    defaultValues: lessonDefaultValues,
  });

  useEffect(() => {
    reset(lessonDefaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent, start, end]);

  return (
    <Form {...layout} name="nest-messages" onFinish={handleSubmit(onSubmit)}>
      <Form.Item name={["lesson", "title"]} label="lesson Title">
        <Controller
          render={({ value, onChange }) => (
            <Input value={value} onChange={onChange} />
          )}
          control={control}
          rules={{ required: true }}
          name={"title"}
          defaultValue={lessonDefaultValues.title}
        />
      </Form.Item>
      <Form.Item name={["lesson", "subject"]} label="Subject">
        <Controller
          render={({ value, onChange }) => (
            <Input value={value} onChange={onChange} />
          )}
          name="subject"
          control={control}
          defaultValue={lessonDefaultValues.subject}
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
          defaultValue={lessonDefaultValues.start}
        />
      </Form.Item>

      <Form.Item name={["lesson", "end"]} label="End">
        <Controller
          render={() => (
            <Input value={end} onChange={() => setValue("end", end)} />
          )}
          name="end"
          control={control}
          defaultValue={lessonDefaultValues.end}
        />
      </Form.Item>
      <Form.Item name={["lesson", "description"]} label="Description">
        <Controller
          render={({ value, onChange }) => (
            <Input.TextArea value={value} onChange={onChange} />
          )}
          name="description"
          control={control}
          defaultValue={lessonDefaultValues.description}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            closeModal();
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
