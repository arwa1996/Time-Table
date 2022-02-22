import React from "react";
import { useQuery } from "@apollo/client";
import { CalenderLessons } from "../../containers/CalenderLessons";
import { GET_All_LESSONS } from "../../containers/data";

export function HomePage(): JSX.Element {
  const { loading, error, data } = useQuery(GET_All_LESSONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <CalenderLessons lessonsList={data} />
    </div>
  );
}
