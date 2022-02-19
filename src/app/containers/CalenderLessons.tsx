import React, { useState } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { GetAllLessons } from "./data/__generated__/GetAllLessons";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { ModalLessons } from "../components/ModalLessons";
import { FormLessons } from "./FormLessons";
import { useMutation } from "@apollo/client";
import {
  GET_All_LESSONS,
  REMOVE_LESSON,
  UPDATE_LESSON,
  MOVE_LESSON,
} from "./data/";

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

  console.log("lessons", lessonsList);
  // const [deleteLessonsMutation] = useMutation(REMOVE_LESSON);
  // const [updateLessonsMutation] = useMutation(UPDATE_LESSON);
  // const [moveLessonsMutation] = useMutation(MOVE_LESSON);

  const sendStartEndDate = (start: Date | string, end: Date | string): void => {
    console.log(start, end);
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

    //delete mutation ( the id has a wired behavior)

    // console.log(~~selectedEvent?.resource.id, selectedEvent?.resource.id);
    // let eventId: number = ~~selectedEvent?.resource.id;
    // deleteLessonsMutation({
    //   variables: { id: eventId },
    //   refetchQueries: [GET_All_LESSONS, "GetAllLessons"],
    // });

    // update Mutation

    // updateLessonsMutation({
    //   variables: {
    //     id: ~~selectedEvent?.resource.id,
    //     //title: data?.title,
    //     description: "description update",
    //     subject: "update",
    //     // start: selectedEvent?.start,
    //     //  end: selectedEvent?.end,
    //   },
    // });

    //Move mutation
    // moveLessonsMutation({
    //   variables: {
    //     id: ~~selectedEvent?.resource.id,
    //     start:
    //       "Sat Feb 19 2022 16:00:00 GMT+0200 (Eastern European Standard Time)",
    //     end: "Sat Feb 19 2022 16:30:00 GMT+0200 (Eastern European Standard Time)",
    //   },
    // });
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
        onSelectSlot={(event) => sendStartEndDate(event.start, event.end)}
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
