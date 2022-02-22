import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Event } from "react-big-calendar";
import { Button, Form, Input } from "antd";

type FormProps = {
  start?: string | undefined;
  end?: string | undefined;
  selectedLesson?: Event;
  onSubmit: (data: any) => void;
};

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export const FormLessons: React.FC<FormProps> = ({
  selectedLesson,
  start,
  end,
  onSubmit,
}) => {
  const lessonDefaultValues = {
    title: selectedLesson?.title || "",
    subject: selectedLesson?.resource.subject || "",
    start: (selectedLesson?.start as string | undefined) || "",
    end: (selectedLesson?.end as string | undefined) || "",
    description: selectedLesson?.resource.description || "",
  };

  const { setValue, handleSubmit, control, reset } = useForm<FormProps>({
    defaultValues: lessonDefaultValues,
  });

  useEffect(() => {
    reset(lessonDefaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLesson, start, end]);

  return (
    <Form {...layout} name="nest-messages" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        name={["lesson", "title"]}
        label="lesson Title"
        initialValue={lessonDefaultValues.title}
      >
        <Controller
          render={({ value, onChange }) => (
            <Input value={value} onChange={onChange} />
          )}
          control={control}
          name={"title"}
          // defaultValue={lessonDefaultValues.title}
          rules={{ required: true }}
        />
      </Form.Item>
      <Form.Item
        name={["lesson", "subject"]}
        label="Subject"
        initialValue={lessonDefaultValues.subject}
      >
        <Controller
          render={({ value, onChange }) => (
            <Input value={value} onChange={onChange} />
          )}
          name="subject"
          control={control}
          //defaultValue={lessonDefaultValues.subject}
          rules={{ required: true }}
        />
      </Form.Item>
      <Form.Item
        name={["lesson", "start"]}
        label="Start"
        initialValue={lessonDefaultValues.start}
      >
        <Controller
          render={() => (
            <Input value={start} onChange={() => setValue("start", start)} />
          )}
          name="start"
          control={control}
          //  defaultValue={lessonDefaultValues.start}
        />
      </Form.Item>

      <Form.Item
        name={["lesson", "end"]}
        label="End"
        initialValue={lessonDefaultValues.end}
      >
        <Controller
          render={() => (
            <Input value={end} onChange={() => setValue("end", end)} />
          )}
          name="end"
          control={control}
          // defaultValue={lessonDefaultValues.end}
        />
      </Form.Item>
      <Form.Item
        name={["lesson", "description"]}
        label="Description"
        initialValue={lessonDefaultValues.description}
      >
        <Controller
          render={({ value, onChange }) => (
            <Input.TextArea value={value} onChange={onChange} />
          )}
          name="description"
          control={control}
          // defaultValue={lessonDefaultValues.description}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
