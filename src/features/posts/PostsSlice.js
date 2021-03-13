import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPost = createAsyncThunk(
  'posts/getPost',
  async () => {
    return axios.get('http://localhost/api/todos')
      .then(response => console.log(response))
  }
)


const postSlice = createSlice ({
  name : 'posts',
  initialState : {
    list : [],
    status: null
  },
  extraReducers: {
    [getPost.pending]: (state, actions) => {
      state.status = "Loading..."
    },
    [getPost.fulfilled]: (state, { payload }) => {
      state.status = "Success"
    },
    [getPost.rejected]: (state, actions) => {
      state.status = "Failed"
    }
  }
})

export default postSlice.reducer