import { gql } from "@apollo/client";

export const GET_All_LESSONS = gql`
  query GetAllLessons {
    allLessons {
      id
      title
      description
      subject
      start
      end
    }
  }
`;
