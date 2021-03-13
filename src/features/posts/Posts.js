import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPost } from './PostsSlice'

export default function Posts() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  return (
    <div>
      <h1>
        Post...
      </h1>
    </div>
  )
}
