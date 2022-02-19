import { gql } from "@apollo/client";

export const REMOVE_LESSON = gql`
  mutation removeLesson($id: String!) {
    removeLesson(id: $id) {
      id
    }
  }
`;
