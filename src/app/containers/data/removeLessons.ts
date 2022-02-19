import { gql } from "@apollo/client";

export const REMOVE_LESSON = gql`
  mutation removeLesson($id: ID!) {
    removeLesson(id: $id) {
      id
    }
  }
`;
