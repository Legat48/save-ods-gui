
import { z } from 'zod';
// Определение схемы Zod

export const emsObg = z.object({
  idInverter: z.number(), // уникальный идентификатор
  title: z.string(), // название карточки преобразователей
  units: z.record( // настройки карточки преобразователей
    z.string(), // ключ настройки преобразователей
    z.object({ // состав настройки преобразователей
      value: z.number(), // значение
      title: z.string(), // название конкретной настройки преобразователей
      unit: z.string(), // размерность настройки преобразователей
      valueText: z.array(z.string()).optional(), // если переключается, то массив названий переключения, value - индекс массива
    })
  ),
})
export const emsCard =  z.object({ // 1 карточка настройки
  steelCardId: z.number(), // уникальный идентификатор карточки настройки
  steelCardName: z.string(), // название каточки
  dimension: z.string(), // информация о сечении
  abr: z.string(),  // описание карточки
  date_edit: z.number().optional(),  // дата последнего редактирования редактирования
  unitArr: z.array( // массив преобразователей
    emsObg
  ),
})

export const emsUnitObj = z.object({ // тип стали
  typeSteelId: z.number(), // уникальный идентификатор типа стали
  nameSteel: z.string(), // название типа стали
  settingArr: z.array(
    emsCard.optional() // 1 карточка настройки
  ),
})
export const emsDataArr = z.array(
  emsUnitObj // тип стали
)
// Схема JSOM приходящая на ЭМП
export const emsArrSchema = z.object({
  id: z.string(),
  v: z.string(), // версия для работы с локальным хранилищем
  jsonrpc: z.string(),
  result: z.object({
    data: z.object({
      typeSteelArr: emsDataArr // массив типов стали
    }),
  }),
});

export type EmsDataType = z.infer<typeof emsDataArr>;
export type EmsItemType = z.infer<typeof emsObg>;
export type EmsCardType = z.infer<typeof emsCard>;
export type EmsUnitObjType = z.infer<typeof emsUnitObj>;
export type EmsArrSchemaType = z.infer<typeof emsArrSchema>;
