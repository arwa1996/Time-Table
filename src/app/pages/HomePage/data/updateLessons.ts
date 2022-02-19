import { gql } from "@apollo/client";

export const UPDATE_LESSON = gql`
  mutation updateLesson(
    $id: String!
    $subject: String!
    $description: String!
  ) {
    updateLesson(id: $id, subject: $subject, description: $description) {
      id
      subject
      description
    }
  }
`;
