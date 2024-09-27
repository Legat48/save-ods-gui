import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import {eqStatusScheme, eqStatusArr} from "../zod-scheme/eq-status";

const eqStatus = createSlice({
  name: "eqStatus",
  initialState: {
    eqStatus: [] as z.infer<typeof eqStatusArr>,
  },
  reducers: {
    setEqStatus: (state, action: PayloadAction<{ obj: z.infer<typeof eqStatusScheme> }>) => {
      state.eqStatus = action.payload.obj.result.data;
    },
  },
});

export const { setEqStatus } = eqStatus.actions;

export default eqStatus.reducer;