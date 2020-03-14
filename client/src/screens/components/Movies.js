import React from 'react'
import ItemList from './ItemList'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_MOVIES } from '../../apollo/query'
import { setLoadingMovies, setErrorMovies, setMovies } from '../../redux/actions'

function Movies () {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(FETCH_MOVIES)
  if (loading) {
    dispatch(setLoadingMovies(loading))
  } else if (error) {
    dispatch(setErrorMovies(error))
  } else {
    dispatch(setMovies(data))
    dispatch(setLoadingMovies(loading))
  }
  const movies = useSelector((state) => state.movie.movies)

  return (
    <ItemList>
    </ItemList>
  )
}

export default Movies