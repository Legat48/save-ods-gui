import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "headerTitle",
  initialState: {
    headerTitle: 'ОДС',
    showHeader: true,
    title: 'ОДС'
  },
  reducers: {
    setHeaderTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.headerTitle = action.payload.title;
    },
    setTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title;
    },
    setShowHeader: (state, action: PayloadAction<{ value: boolean }>) => {
      state.showHeader = action.payload.value;
    },
  },
});

export const { setHeaderTitle, setTitle, setShowHeader } = todoSlice.actions;

export default todoSlice.reducer;