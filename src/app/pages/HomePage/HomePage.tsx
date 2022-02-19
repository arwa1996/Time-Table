import React from "react";
import { useQuery } from "@apollo/client";
import { CalenderLessons } from "../../components/CalenderLessons";
import { GET_All_LESSONS } from "./data";

export function HomePage(): JSX.Element {
  const { loading, error, data } = useQuery(GET_All_LESSONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("All lessons", data.allLessons);

  return (
    <div>
      <CalenderLessons lessonsList={data} />
    </div>
  );
}
