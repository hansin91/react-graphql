import { gql } from 'apollo-boost'
export const FETCH_TV_SERIES = gql`
  {
    getTVSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
  }
}
`