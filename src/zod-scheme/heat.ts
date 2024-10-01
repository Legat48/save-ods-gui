import { z } from 'zod';

export const heatTask = z.object({ //задание на разливку
  NMAS: z.number(),  // Номер машины
  NZAD: z.string(),  // № задания
  NSTR_ZAD: z.string(),  // № строки задания
  TLSL: z.number(),  // Толщина,мм
  CHIR: z.number(),  // Ширина,мм
  DLSL: z.number(),  // Длина, м
  MARKA: z.string(),  // Марка
  GOST: z.string(),  // Нтд: ГОСТ
  UKAZ_STR: z.string().optional(),  // Нтд: рабочий план
  RAB_PLAN: z.string().optional(),  // Нтд: рабочий план
  TIP_PROD: z.string().optional(),  // ?????????????????
  NSNZ: z.number().optional(),  //  ?????????????????
  GDIS: z.number().optional(),  // ?????????????????
  NOM_POZ: z.number().optional(), // ?????????????????
  KOMU_OTG: z.string().optional(), // Грузополучатель
  POSAD: z.string().optional(), // Посад
})
export const minMax = z.object({ // минимальное и максимальное значение
  min: z.number().nullable().optional(),
  max: z.number().nullable().optional(),
})

export const chemicalRequirements = z.object({ // Требования к химическим веществам
  Al: minMax.optional(), // Алюминий
  B: minMax.optional(), // Бор
  C: minMax.optional(), // Углерод
  N: minMax.optional(), // Азот
  H: minMax.optional(), // Водород
  Si: minMax.optional(), // Кремний
  P: minMax.optional(), // Фосфор
  S: minMax.optional(), // Сера
  Ca: minMax.optional(), // Кальций
  Ti: minMax.optional(), // Титан
  V: minMax.optional(), // Ванадий
  Cr: minMax.optional(), // Хром
  Mn: minMax.optional(), // Марганец
  Ni: minMax.optional(), // Никель
  Cu: minMax.optional(), // Медь
  As: minMax.optional(), // Мышьяк
  Nb: minMax.optional(), // Ниобий
  Mo: minMax.optional(), // Молибден
  Sn: minMax.optional(), // Олово
  Sb: minMax.optional(), // Сурьма
  W: minMax.optional(), // Вольфрам
  Co: minMax.optional(), // Кобальт
  Pb: minMax.optional(), // Свинец
})

export const chemicalAim = z.object({ // Целевая химия
  Al: z.number().nullable().optional(), // Алюминий
  B: z.number().nullable().optional(), // Бор
  C: z.number().nullable().optional(), // Углерод
  N: z.number().nullable().optional(), // Азот
  H: z.number().nullable().optional(), // Водород
  Si: z.number().nullable().optional(), // Кремний
  P: z.number().nullable().optional(), // Фосфор
  S: z.number().nullable().optional(), // Сера
  Ca: z.number().nullable().optional(), // Кальций
  Ti: z.number().nullable().optional(), // Титан
  V: z.number().nullable().optional(), // Ванадий
  Cr: z.number().nullable().optional(), // Хром
  Mn: z.number().nullable().optional(), // Марганец
  Ni: z.number().nullable().optional(), // Никель
  Cu: z.number().nullable().optional(), // Медь
  As: z.number().nullable().optional(), // Мышьяк
  Nb: z.number().nullable().optional(), // Ниобий
  Mo: z.number().nullable().optional(), // Молибден
  Sn: z.number().nullable().optional(), // Олово
  Sb: z.number().nullable().optional(), // Сурьма
  W: z.number().nullable().optional(), // Вольфрам
  Co: z.number().nullable().optional(), // Кобальт
  Pb: z.number().nullable().optional(), // Свинец
})
export const handling = z.object({ // обработка
  type: z.string(), // Значение характеристики
  sections: z.string(), // Место регистрации манипуляции
  hdl_begin: z.string(), // Дата-время начала выполнения манипуляции
  hdl_end: z.string().nullable().optional(), // Дата-время завершения выполнения манипуляции
  SCALES_NO: z.number().nullable().optional(), // Номер весов
  WGHT_MODE: z.number().nullable().optional(), // Миксер. Задание на нали
  W_MODE: z.string().nullable().optional(), // Режим взвешивания в миксерном отделении
  W_B_HM: z.number().nullable().optional(), // Вес ЧЗК брутто,т
  W_T_HM: z.number().nullable().optional(), // Вес тары ЧЗК,т
  NET_WEIGHT: z.number().nullable().optional(), // Вес нетто
  W_IRON: z.number().nullable().optional(), // Вес чугуна
  T_BEFORE_TMT: z.number().nullable().optional(), // Температура до обработки
  S_BEFORE_TMT: z.number().nullable().optional(), // Сера до обработки
  S_AIM: z.number().nullable().optional(), // Целевая сера
  CALC_LIME: z.number().nullable().optional(), // Расчетное значение извести
  CALC_MG: z.number().nullable().optional(), // Расчетное значение магния
  HM_LOT_NO: z.number().nullable().optional(), // Номер налива
  INJ_NO: z.number().nullable().optional(), // Порядковый номер инжекции
  SQ_LIME: z.number().nullable().optional(), // Суммарный расход извести, кг
  LANCE_NO: z.number().nullable().optional(), // Номер фурмы
  LANCE_A: z.number().nullable().optional(), // Номер фурмы А
  DUR_A: z.number().nullable().optional(), // Стойкость фурмы A
  LANCE_B: z.number().nullable().optional(), // Номер фурмы B
  DUR_B: z.number().nullable().optional(), // Стойкость фурмы B
  WORKTIME_A: z.number().nullable().optional(), // Общее горячее время работы фурмы А за кампанию, мин
  WORKTIME_B: z.number().nullable().optional(), // Общее горячее время работы фурмы B за кампанию, мин
  DIVERTER_MODE: z.string().nullable().optional(), // Режим дивертера
  N_FUR: z.string().nullable().optional(), // Код активной фурмы
  BUB_CNT: z.number().nullable().optional(), // Порядковый номер отдува шлака
  C_MAT: z.string().nullable().optional(), // Код отданного материала КЦ-2
  SCRAP_WEIGHT1: z.number().nullable().optional(), // Вес лома 1
  SCB_ID1: z.number().nullable().optional(), // Ид лотка 1
  SBC_ID2: z.number().nullable().optional(), // Ид лотка 2
  SUM_SCRAP_WEIGHT: z.number().nullable().optional(), // Суммарный вес лома, т
  SKIM_CNT: z.number().nullable().optional(), // Порядковый номер скачивания шлака
  VOL_AR: z.number().nullable().optional(), // Суммарный расход аргона
  VOL_N2: z.number().nullable().optional(), // Суммарный расход азота
  VOL_O2: z.number().nullable().optional(), // Суммарный расход кислорода
  N_PB: z.string().nullable().optional(), // Номер бункера отдачи сыпучих
  MAT_WEIGHT: z.number().nullable().optional(), // Порядковый номер скачивания шлака
  TEMPERATURE: z.number().nullable().optional(), // Температура
  AL: z.number().nullable().optional(), // Химсостав стали(требования) (Al)
  MANUAL_INPUT: z.number().nullable().optional(), // Химсостав стали(требования) (Al)
  FESI65: z.number().nullable().optional(), // Рекомендация по FeSi65
  WGHT_TASK: z.number().nullable().optional(), // Миксер. Задание на налив
  W_FESI_AIM: z.number().nullable().optional() // Вес FeSi в ЧЗК (задание) (КЦ-2, Миксер)
})
export const processItem = z.object({ // Выполненные обработки
  unit: z.string().nullable(), // Агрегат слежения
  id2: z.string().nullable().optional(), // Идентификатор уровня 2
  proc_begin: z.string().nullable().optional(), // Дата, время начала процесса
  proc_end: z.string().nullable().optional(), // Дата, время окончания процесса
  handlings: z.array(handling).nullable(), // обработки
})
export const scheduledProcesses = z.object({ // Запланированные обработки
  unit: z.string().nullable(), // Агрегат слежения
  proc_begin: z.string().nullable().optional(), // Дата, время начала процесса
  proc_end: z.string().nullable().optional(), // Дата, время окончания процесса
})

export const operationItem = z.object({ // Выполненная обработки
  date_begin: z.string().nullable(), // Зафиксированное начало операции
  date_end: z.string().nullable(), // Зафиксированное завершение операции
  operation: z.string().nullable(), // Наименование операции
  characteristics: z.array(z.object({ // Характеристики обработки
    "value name": z.string().nullable().optional(),
    value: z.number().nullable().optional(),
    uom: z.string().nullable().optional()
  }))
})

export const rsProcess = z.object({ // Выполненные обработки
  unit: z.string().nullable(), // Агрегат слежения
  proc_begin: z.string().nullable().optional(), // Дата, время начала процесса
  proc_end: z.string().nullable().optional(), // Дата, время окончания процесса
  operations: z.array(operationItem).nullable(), // Обработки
})


export const chemicalAnalysis = z.object({ // хим анализ
  sample_point: z.string().nullable(), // место отбора пробы
  sample_no: z.number().nullable(), // Номер пробы химанализа
  result_time: z.string().nullable(), // Дата-время получения анализа
  material_type: z.string().nullable(), // Тип анализируемого материала
  analisys_type: z.string().nullable(), // Тип анализа
  laboratory: z.string().nullable(), // Название лаборатории
  Al: z.number().nullable().optional(), // Алюминий
  B: z.number().nullable().optional(), // Бор
  C: z.number().nullable().optional(), // Углерод
  N: z.number().nullable().optional(), // Азот
  H: z.number().nullable().optional(), // Водород
  Si: z.number().nullable().optional(), // Кремний
  P: z.number().nullable().optional(), // Фосфор
  S: z.number().nullable().optional(), // Сера
  Ca: z.number().nullable().optional(), // Кальций
  Ti: z.number().nullable().optional(), // Титан
  V: z.number().nullable().optional(), // Ванадий
  Cr: z.number().nullable().optional(), // Хром
  Mn: z.number().nullable().optional(), // Марганец
  Ni: z.number().nullable().optional(), // Никель
  Cu: z.number().nullable().optional(), // Медь
  As: z.number().nullable().optional(), // Мышьяк
  Nb: z.number().nullable().optional(), // Ниобий
  Mo: z.number().nullable().optional(), // Молибден
  Sn: z.number().nullable().optional(), // Олово
  Sb: z.number().nullable().optional(), // Сурьма
  W: z.number().nullable().optional(), // Вольфрам
  Co: z.number().nullable().optional(), // Кобальт
  Pb: z.number().nullable().optional(), // Свинец
})

export const heat = z.object({
  batch_id: z.number(), // id плавки
  heat_no: z.string(), // Номер плавки
  tasks: z.array(heatTask).nullable(),  // Задание на разливку
  GRADE_BOF: z.string().nullable().optional(),  // Марка стали для KV
  GRADE_LF: z.string().nullable().optional(),  // Марка стали для УПК
  GRADE_CCM: z.string().nullable().optional(),  // Марка стали для УНРС
  STANDARD_BOF: z.string().nullable().optional(),  // Гост для KV
  STANDARD_LF: z.string().nullable().optional(),  // Гост для УПК
  STANDARD_CCM: z.string().nullable().optional(),  // Гост для УНРС
  NOTE_CCM: z.string().nullable().optional(),  // Note для УНРС
  STEELCODE_BOF1: z.string().nullable().optional(),  // STEEL_CODE для KV1
  STEELCODE_CCM: z.string().nullable().optional(),  // STEEL_CODE для УНРС 678
  TECHNOTES_BOF: z.string().nullable().optional(),  // TechNotes для KV
  TECHNOTES_LF: z.string().nullable().optional(),  // TechNotes для УПК
  TECHNOTES_CCM: z.string().nullable().optional(),  // TechNotes для УНРС
  ANALIT_PROG_BOF: z.string().nullable().optional(),  // ANALITICAL_PROGRAM для KV
  ROUTE_SCHED: z.string().nullable().optional(),  // ROUTE (маршрута) план
  ROUTE_FACT: z.string().nullable().optional(),  // ROUTE (маршрут) факт
  ROUTE_FACT_SCHED: z.string().nullable().optional(),  // ROUTE факт+план
  TECHNOTES_RH: z.string().nullable().optional(),  // TechNotes для АЦВ
  STANDARD_RH: z.string().nullable().optional(),  // Гост для АЦВ
  GRADE_RH: z.string().nullable().optional(),  // Марка стали для АЦВ
  SCHED_CAST_UNIT: z.string().nullable().optional(),  // Суточное задание. Агрегат разливки
  STEEL_CODE: z.string().nullable().optional(),  // Тип стали (Steel_code)
  SCHED_CAST_SPEED_STR1: z.number().nullable().optional(),  // УНРС. Планируемая скорость разливки (ручей 1)
  SCHED_CAST_SPEED_STR2: z.number().nullable().optional(),  // УНРС. Планируемая скорость разливки (ручей 2)
  LIQUIDUS_CALC: z.number().nullable().optional(),  // Расчетная температура ликвидуса
  LDL_TEMP4CAST: z.object({ // Интервал температур в стальковшке перед отдачей на разливку
    min: z.number().nullable(),  //
    max: z.number().nullable()
  }).nullable().optional(),  //
  ADD_CA: z.string().nullable().optional(),  // Признак легирования Ca
  WIDTH_TASK_STR1: z.string().nullable().optional(),  // Ширина сляба по первому ручью (задание из заказа)
  THICK_TASK_STR1: z.string().nullable().optional(),  // Толщина сляба по первому ручью (задание из заказа)
  WIDTH_TASK_STR2: z.string().nullable().optional(),  // Ширина сляба по второму ручью (задание из заказа)
  THICK_TASK_STR2: z.string().nullable().optional(),  // Толщина сляба по второму ручью (задание из заказа)
  TECH_KEY: z.number().nullable().optional(),  // Группа разливки на УНРС-9
  AS: z.number().nullable().optional(),  // Химсостав стали(требования) (As) Мышьяк
  SN: z.number().nullable().optional(),  // Химсостав стали(требования) (Sn) Олово
  SB: z.number().nullable().optional(),  // Химсостав стали(требования) (Sb) Сурьма
  HEAT_PROC_SCHEME_APK3: z.union([z.number(), z.string()]).nullable().optional(), // СХЕМА ПРОЦЕССА плавки APK3
  "chemical requirements": chemicalRequirements, // Требования к химическим веществам
  "chemical aim": chemicalAim, // Целевая химия
  LDL_NO: z.union([z.number(), z.string()]).nullable(), // Номер стальковша
  LDL_IDLE_TIME: z.number().nullable(), // Межплавочный простой ковша перед плавкой ????минут????
  LDL_DUR: z.number().nullable(), // Стойкость стальковша
  processes: z.array(processItem).nullable(), // Выполненные обработки
  "scheduled processes": z.array(scheduledProcesses).nullable(), // Запланированные обработки
  "rs processes": z.array(rsProcess), // Зафиксированные в учетной системе процессы
  "sample request": z.any().nullable().optional(), // Задание на анализ пробы
  "chemical analysises": z.array(chemicalAnalysis)
})

export type HeatTask = z.infer<typeof heatTask>;
export type MinMax = z.infer<typeof minMax>;
export type ChemicalRequirements = z.infer<typeof chemicalRequirements>;
export type ChemicalAim = z.infer<typeof chemicalAim>;
export type Handling = z.infer<typeof handling>;
export type ProcessItemZ = z.infer<typeof processItem>;
export type ScheduledProcesses = z.infer<typeof scheduledProcesses>;
export type OperationItem = z.infer<typeof operationItem>;
export type RsProcess = z.infer<typeof rsProcess>;
export type ChemicalAnalysis = z.infer<typeof chemicalAnalysis>;
export type Heat = z.infer<typeof heat>;