import React, { useState } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { GetAllLessons } from "../pages/HomePage/data/__generated__/GetAllLessons";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { ModalLessons } from "./ModalLessons";
import { FormLessons } from "./FormLessons";

type calenderProps = {
  lessonsList: GetAllLessons;
};

const localizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);

export const CalenderLessons: React.FC<calenderProps> = ({ lessonsList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [start, setStart] = useState<Date | string>();
  const [end, setEnd] = useState<Date | string>();
  const [createLesson, setCreateLesson] = useState(false);
  const [updateLesson, setUpdateLesson] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  let lessons: Event[] = [];
  lessonsList?.allLessons?.forEach((lesson) => {
    if (lesson)
      lessons.push({
        resource: lesson,
        title: lesson.title,
        start: new Date(lesson.start),
        end: new Date(lesson.end),
      });
  });

  console.log("lessons", lessons);

  const createLessons = (start: Date | string, end: Date | string): void => {
    setCreateLesson(true);
    //open modal
    setIsModalVisible(true);
    //I pass the end and start time from the event
    setStart(start);
    setEnd(end);
    //I want also to pass the other variables which is the lesson title and the subject
    //When a new lesson is created, it should be placed as last lesson for selected date
  };

  const updateLessons = (event: Event): void => {
    setUpdateLesson(true);
    //open modal
    setIsModalVisible(true);
    //I want to know the id of the targeted event
    //send id to the form so it can be displayed
    setSelectedEvent(event);
    //then I will retrive the data of that event( here is where we call the muatation ? )
  };

  return (
    <div>
      <Calendar
        defaultView="week"
        selectable
        localizer={localizer}
        events={lessons}
        // titleAccessor={() => "title"}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={(event) => createLessons(event.start, event.end)}
        onSelectEvent={(event) => updateLessons(event)}
      />
      <ModalLessons
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        <FormLessons
          title="Lessons"
          subject="cs"
          description="description"
          start={start as string}
          end={end as string}
          closeModal={() => setIsModalVisible(false)}
          createLessons={createLesson}
          updateLessons={updateLesson}
          selectedEvent={selectedEvent}
          lessons={lessons}
        />
      </ModalLessons>
      {/* <CardLessons>
        <h1>Title</h1>
        <h1>title</h1>
      </CardLessons> */}
    </div>
  );
};
