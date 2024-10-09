
import { z } from 'zod';
// Определение схемы Zod

export const emsObg = z.object({
  invertor_id: z.number(), // уникальный идентификатор
  invertor_name: z.string(), // название карточки преобразователей
  invertor_attrs: z.array( // настройки карточки преобразователей
    z.object({
      attr_id: z.number(),
      attr_value_num: z.number().optional(),
      attr_value_dic: z.number().optional(),
    }).refine(data => {
      // Проверяем, что хотя бы одно из значений присутствует
      return data.attr_value_num !== undefined || data.attr_value_dic !== undefined;
    }, {
      message: 'Должен быть указан хотя бы один из ключей: attr_value_num или attr_value_dic',
    })
  ),
})
export const emsCard = z.object({ // 1 карточка настройки
  card_id: z.number(), // уникальный идентификатор карточки настройки
  card_name: z.string(), // название каточки
  dimension_id: z.number(), // информация о сечении
  dimension_name: z.string(), // информация о сечении
  chg_dt: z.number().optional(),  // дата последнего редактирования
  crt_dt: z.number().optional(),  // дата создания
  invertors: z.array( // массив преобразователей
    emsObg
  ),
})

export const emsUnitObj = z.object({ // тип стали
  steel_type_id: z.number(), // уникальный идентификатор типа стали
  steel_type_name: z.string(), // название типа стали
  cards: z.array(
    emsCard // 1 карточка настройки
  ).optional(),
})
export const emsDataArr = z.array(
  emsUnitObj // тип стали
)

export const attribute = z.object({
  attr_id: z.number(),
  attr_name: z.string(),
  attr_type_id: z.number(),
  attr_type_name: z.string(),
  attr_unit_abbr: z.string().nullable().optional(),
  attr_unit_id: z.number(),
  attribute_values: z.array(z.object(
    {
      value_id: z.number(),
      value_name: z.string()
    }
  )).optional()
})
// Схема JSOM приходящая на ЭМП
export const emsArrSchema = z.object({
  id: z.string(),
  jsonrpc: z.string(),
  result: z.object({
    data: z.object({
      attributes: z.array(attribute), // массив типов стали
      steel_types: emsDataArr // массив типов стали
    }),
  }),
});

export type EmsDataType = z.infer<typeof emsDataArr>;
export type EmsAttributeType = z.infer<typeof attribute>;
export type EmsItemType = z.infer<typeof emsObg>;
export type EmsCardType = z.infer<typeof emsCard>;
export type EmsUnitObjType = z.infer<typeof emsUnitObj>;
export type EmsArrSchemaType = z.infer<typeof emsArrSchema>;
export type EmsAttributeSchemaType = z.infer<typeof attribute>;
