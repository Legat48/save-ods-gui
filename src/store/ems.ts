import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmsArrSchemaType, EmsDataType, EmsAttributeType } from "../zod-scheme/ems";

const ems = createSlice({
  name: "ems",
  initialState: {
    emsData: [] as EmsDataType,
    emsAttributes: [] as EmsAttributeType[],
    emsAttributeAsObj: {} as Record<number, EmsAttributeType>
  },
  reducers: {
    // ["result"]["data"] cпособ указать нужное
    setEmsDataStore: (state, action: PayloadAction<EmsArrSchemaType["result"]["data"]['steel_types']>) => {
      state.emsData = action.payload;
    },
    setEmsAttributesStore: (state, action: PayloadAction<EmsArrSchemaType["result"]["data"]['attributes']>) => {
      state.emsAttributes = action.payload;
      state.emsAttributeAsObj = createAttributeAsObj(action.payload);
    },
  },
});

export const { setEmsDataStore, setEmsAttributesStore } = ems.actions;

export default ems.reducer;

function createAttributeAsObj(attributes: EmsAttributeType[]): Record<number, EmsAttributeType> {
  const attributeAsObj: Record<number, EmsAttributeType> = {};
  attributes.forEach(attr => {
    attributeAsObj[attr.attr_id] = attr;
  });
  return attributeAsObj;
}