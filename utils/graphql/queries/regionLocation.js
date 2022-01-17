import { gql } from "@apollo/client";

export const REGION_LOCATION = gql`
query regions {
    regions {
      count
      next
      previous
      results {
        url
        name
      }
    }
  }
`;