import React, { useEffect } from "react";
import { Event } from "react-big-calendar";
import { Button, Form, Input } from "antd";

type FormProps = {
  start?: string | undefined;
  end?: string | undefined;
  selectedLesson?: Event;
  onSubmit: (data: {
    lesson: { title: string; description: string; subject: string };
  }) => void;
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
  const [form] = Form.useForm();
  const lessonDefaultValues = {
    title: selectedLesson?.title || "",
    subject: selectedLesson?.resource.subject || "",
    start: (selectedLesson?.start as string | undefined) || start,
    end: (selectedLesson?.end as string | undefined) || end,
    description: selectedLesson?.resource.description || "",
  };

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLesson, start, end]);

  return (
    <Form {...layout} name="control-hooks" form={form} onFinish={onSubmit}>
      <Form.Item
        name={["lesson", "title"]}
        label="lesson Title"
        rules={[
          {
            required: true,
            message: "This field is required",
          },
          {
            min: 3,
            pattern: /^[A-Za-z0-9 ]+$/i,
            message: "Please enter a valid lesson title",
          },
          { max: 100, message: "Maximum characters allowed is 100" },

          { min: 3, message: "Minimum characters allowed is 3 " },
        ]}
        initialValue={lessonDefaultValues.title}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["lesson", "subject"]}
        label="Subject"
        rules={[
          {
            required: true,
            message: "This field is required",
          },
          {
            min: 3,
            pattern: /^[A-Za-z0-9 ]+$/i,
            message: "Please enter a valid lesson title",
          },
          { max: 100, message: "Maximum characters allowed is 100" },

          { min: 3, message: "Minimum characters allowed is 3 " },
        ]}
        initialValue={lessonDefaultValues.subject}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["lesson", "start"]}
        label="Start"
        initialValue={lessonDefaultValues.start}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        name={["lesson", "end"]}
        label="End"
        initialValue={lessonDefaultValues.end}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name={["lesson", "description"]}
        label="Description"
        initialValue={lessonDefaultValues.description}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
