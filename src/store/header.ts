import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "headerTitle",
  initialState: {
    headerTitle: 'ОДС',
    title: 'ОДС'
  },
  reducers: {
    setHeaderTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.headerTitle = action.payload.title;
    },
    setTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title;
    },
  },
});

export const { setHeaderTitle, setTitle } = todoSlice.actions;

export default todoSlice.reducer;