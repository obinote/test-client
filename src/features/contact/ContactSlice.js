import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContact = createAsyncThunk(
  'contact/getContact',
  async () => {
    return axios.get('http://localhost/api/contact')
      .then(response => response.data)
  }
)

export const storeContact = createAsyncThunk(
  'contact/storeContact',
  async (data) => {
    return axios.post('http://localhost/api/contact', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => console.log(response))
  }
)

const contactSlice = createSlice ({
  name : 'contact',
  initialState : {
    posted : {
      age: "",
      name: "",
      city: "",
      submited: false
    },
    list : [],
    status: null
  },
  reducers: {
    onInputCahnge : (state, { payload : { name , value } }) => {
      state.posted[name] = value
    },
  },
  extraReducers: {
    [getContact.pending]: (state, actions) => {
      state.status = "Loading..."
    },
    [getContact.fulfilled]: (state, { payload }) => {
      state.list   = payload
      state.status = "Success"
      state.posted.submited = false
    },
    [getContact.rejected]: (state, actions) => {
      state.status = "Failed"
    },
    [storeContact.pending]: (state, actions) => {
      state.status = "Loading..."
    },
    [storeContact.fulfilled]: (state, { payload }) => {
      state.status = "Success"
      state.posted.age = ""
      state.posted.name = ""
      state.posted.city = ""
      state.posted.submited = true
    },
    [storeContact.rejected]: (state, actions) => {
      state.status = "Failed"
      state.posted.submited = true;
    },
  }
})

export const { onInputCahnge } = contactSlice.actions

export const contactList = state => state.contact.list
export const postContact = state => state.contact.posted

export default contactSlice.reducer