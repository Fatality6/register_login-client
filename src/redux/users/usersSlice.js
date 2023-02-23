import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'

const initialState = {
    users: [],
    isLoading: false
}

export const getAllUsers = createAsyncThunk('user/getAllUsers', async() => {
  try {
      const { data } = await axios.get('/users')
      return data
  } catch (error) {
      console.log(error)
  }
})

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers:{
  //Получение всех users
  [getAllUsers.pending]: (state) => {
      state.isLoading = true
  },
  [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false
      state.users = action.payload
  },
  [getAllUsers.rejected]: (state) => {
      state.isLoading = false
  }
}})

export default usersSlice.reducer