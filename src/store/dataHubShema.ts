import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataHubShemaState, Scheme } from './interface';
import { removeRefs } from '../components/JsonWrapInfo/resolveRefs';

// import $RefParser from '@apidevtools/json-schema-ref-parser';

const initialState: dataHubShemaState = {
  baseScheme: null,
  scheme: null
};

const exampleSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "This document contains a schema for validating a batch instance",
  "title": "JSON representation of equipment status in KC-2",
  "type": "array",
  "additionalProperties": true,
  "definitions": {
    "eq_param": {
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "param_code": {
          "type": "number",
          "title": "Код параметра"
        },
        "param_name": {
          "type": "string",
          "title": "Имя параметра"
        },
        "param_value": {
          "type": "number",
          "title": "Значение параметра"
        }
      }
    }
  },
  "properties": {
    "eq_params": {
      "type": "array",
      "uniqueItems": true,
      "title": "Дополнительные параметры оборудования",
      "items": {
        "$ref": "#/definitions/eq_param"
      }
    }
  }
};

const dataHubShema = createSlice({
  name: 'dataHubShema',
  initialState,
  reducers: {
    setScheme(state, action: PayloadAction<Scheme[]>) {
      state.baseScheme = action.payload.map((e) => {
        if (typeof e.jsonSchema === 'string') {
          try {
            e.jsonSchema = JSON.parse(e.jsonSchema);
          } catch (error) {
            console.error('Error parsing jsonSchema:', error);
          }
        }
        return e;
      });
      const newScheme: Record<string, Scheme> = {};
            state.baseScheme.forEach((e) => {
              // console.log(e.jsonSchema)
              // console.log('hui', removeRefs(e.jsonSchema));
              newScheme[e.methodName] = e;
        if (Object.keys(e.jsonSchema).length > 0) {
          try {
            const schemeObj: Record<string, string> = {};
            let keyObg: string = 'scheme';

            function findTitle(obg: any): void {
              if (Array.isArray(obg)) {
                obg.forEach((item) => {
                  findTitle(item);
                });
              } else if (typeof obg === 'object' && obg !== null) {
                for (const [key, value] of Object.entries(obg)) {
                  if (key === 'title') {
                    schemeObj[`${keyObg}`.toLowerCase()] = `${value}`;
                    keyObg = key;
                  }
                  if (value.title) {
                    schemeObj[`${key}`.toLowerCase()] = value.title;
                  }
                  if (typeof value === 'object' && value !== null) {
                    keyObg = key;
                    if (Array.isArray(value)) {
                      findTitle(value);
                    } else {
                      const array = Object.entries(value).map(([key, value]) => ({
                        [key]: value,
                      }));
                      findTitle(array);
                    }
                  }
                }
              }
            }
            findTitle(e.jsonSchema);
            newScheme[e.methodName].jsonTitle = schemeObj;
          } catch (error) {
            console.error('Error parsing jsonSchema:', error);
          }
        }
      });
      state.scheme = newScheme;
    },
  }
});

export const { setScheme } = dataHubShema.actions;
export default dataHubShema.reducer;