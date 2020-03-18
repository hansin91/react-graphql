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
export const FETCH_TV_SERIE = gql`
  query GetTVSerie ($id: ID!)
  {
    getTVSerie(id: $id){
      _id
      title
      overview
      poster_path
      popularity
      tags
      delete_hash
    }
  }
`