import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmsArrSchemaType, EmsDataType } from "../zod-scheme/ems";

const ems = createSlice({
  name: "ems",
  initialState: {
    emsData: [] as EmsDataType,
  },
  reducers: {
    // ["result"]["data"] cпособ указать нужное
    setEmsDataStore: (state, action: PayloadAction<EmsArrSchemaType["result"]["data"]>) => {
      state.emsData = action.payload.typeSteelArr;
    },
  },
});

export const { setEmsDataStore } = ems.actions;

export default ems.reducer;