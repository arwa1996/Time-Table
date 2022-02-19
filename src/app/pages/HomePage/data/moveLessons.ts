import { gql } from "@apollo/client";

export const MOVE_LESSON = gql`
  mutation moveLesson($id: String!, $start: String!, $end: String!) {
    updateLesson(id: $id, start: $start, end: $end) {
      id
      start
      end
    }
  }
`;
