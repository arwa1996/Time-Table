import React, { ComponentType, useEffect, useState } from "react";
import {
  Calendar,
  CalendarProps,
  Event,
  momentLocalizer,
  stringOrDate,
} from "react-big-calendar";
import { useMutation } from "@apollo/client";
import { GetAllLessons } from "./data/__generated__/GetAllLessons";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { ModalLessons } from "../components/ModalLessons";
import { GET_All_LESSONS, MOVE_LESSON } from "./data";
import { CreateLessons } from "./CreateLessons";
import { UpdateLessons } from "./UpdateLessons";
import { DeleteLessons } from "./DeleteLessons";
import { Modal } from "antd";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

type calenderProps = {
  lessonsList: GetAllLessons;
};

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(
  Calendar as ComponentType<CalendarProps>
);

export const CalenderLessons: React.FC<calenderProps> = ({ lessonsList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [start, setStart] = useState<Date | string>();
  const [end, setEnd] = useState<Date | string>();
  const [createLesson, setCreateLesson] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Event>();
  const [lessons, setLessons] = useState<Event[]>([]);

  const { confirm } = Modal;

  let lessonList: Event[] = [];

  useEffect(() => {
    lessonsList?.allLessons?.forEach((lesson) => {
      if (lesson)
        lessonList.push({
          resource: lesson,
          title: lesson.title,
          start: new Date(lesson.start),
          end: new Date(lesson.end),
        });
    });
    setLessons(lessonList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonsList?.allLessons]);

  const [moveLessonsMutation] = useMutation(MOVE_LESSON, {
    refetchQueries: [GET_All_LESSONS, "GetAllLessons"],
  });

  const sendStartEndDate = (start: string, end: string): void => {
    setIsModalVisible(true);
    setStart(start);
    setEnd(end);
    setCreateLesson(true);
  };

  const updateLessons = (event: Event): void => {
    setCreateLesson(false);
    setIsModalVisible(true);
    setSelectedLesson(event);
  };

  const moveLesson = (event: Event, start: string, end: string): void => {
    moveLessonsMutation({
      variables: {
        id: event.resource.id,
        start: start,
        end: end,
      },
    });
  };

  return (
    <>
      <DragAndDropCalendar
        defaultView="week"
        selectable
        resizable
        localizer={localizer}
        events={lessons}
        views={["day", "week"]}
        onEventResize={(args: {
          event: Event;
          start: stringOrDate;
          end: stringOrDate;
          isAllDay: boolean;
        }) => moveLesson(args.event, args.start as string, args.end as string)}
        onSelectSlot={(event) =>
          sendStartEndDate(event.start as string, event.end as string)
        }
        onSelectEvent={(event) => updateLessons(event)}
        onEventDrop={(args: {
          event: Event;
          start: stringOrDate;
          end: stringOrDate;
          isAllDay: boolean;
        }) => moveLesson(args.event, args.start as string, args.end as string)}
        eventPropGetter={(event) => lessonStyleGetter(event)}
      />
      <ModalLessons
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          !createLesson ? (
            <DeleteLessons
              closeModal={() => setIsModalVisible(false)}
              confirm={confirm}
              selectedLesson={selectedLesson}
            />
          ) : null
        }
      >
        {createLesson ? (
          <CreateLessons
            start={start as string}
            end={end as string}
            closeModal={() => setIsModalVisible(false)}
          />
        ) : (
          <UpdateLessons
            closeModal={() => setIsModalVisible(false)}
            selectedLesson={selectedLesson}
          />
        )}
      </ModalLessons>
    </>
  );
};
const lessonStyleGetter = (_event: Event) => {
  var style = {
    border: "0px",
    display: "inline-table",
  };
  return {
    style: style,
  };
};
