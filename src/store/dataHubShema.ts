import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataHubShemaState, Scheme } from './interface';
import { removeRefs } from '../components/JsonWrapInfo/resolveRefs';

const initialState: dataHubShemaState = {
  baseScheme: null,
  scheme: null
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
        newScheme[e.methodName] = e;

        if (Object.keys(e.jsonSchema).length > 0) {
          try {
            // Обработка jsonSchema с помощью removeRefs
            const modifiedJsonSchema = removeRefs(e.jsonSchema);
            // console.log(modifiedJsonSchema)
            const schemeObj: Record<string, string> = {};
            let keyObg: string = 'scheme';

            function findTitle(obg: any, oldKey = ''): void {
              if (Array.isArray(obg)) {
                obg.forEach((item) => {
                  findTitle(item, oldKey);
                });
              } else if (typeof obg === 'object' && obg !== null) {
                for (const [key, value] of Object.entries(obg)) {
                  if (key === 'title') {
                    schemeObj[keyObg] = value;
                    keyObg = key;
                  }
                  if (value.title) {
                    oldKey = oldKey ? `${oldKey}_${key}` : `${key}`;
                    schemeObj[`${oldKey}`] = value.title;
                  }
                  if (typeof value === 'object' && value !== null) {
                    keyObg = key;
                    if (Array.isArray(value)) {
                      findTitle(value, oldKey);
                    } else {
                      const array = Object.entries(value).map(([key, value]) => ({
                        [key]: value,
                      }));
                      findTitle(array, oldKey);
                    }
                  }
                }
              }
            }

            // Используйте измененную схему для поиска заголовков
            findTitle(modifiedJsonSchema);
            newScheme[e.methodName].jsonTitle = schemeObj;
          } catch (error) {
            console.error('Error processing jsonSchema:', error);
          }
        }
      });
      // console.log(newScheme)
      state.scheme = newScheme;
    },
  },
});

export const { setScheme } = dataHubShema.actions;
export default dataHubShema.reducer;