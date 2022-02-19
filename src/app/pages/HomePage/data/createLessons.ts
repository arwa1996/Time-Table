import { gql } from "@apollo/client";

export const CREATE_LESSON = gql`
  mutation createLesson(
    $title: String!
    $subject: String!
    $description: String!
    $start: String!
    $end: String!
  ) {
    createLesson(
      title: $title
      subject: $subject
      description: $description
      start: $start
      end: $end
    ) {
      id
      title
      subject
      description
      start
      end
    }
  }
`;
