
import { z } from 'zod';
// Определение схемы Zod

export const eqChemistryScheme = z.array(z.object({
  elem_code: z.number(),
  elem_name: z.string(),
  elem_content: z.number()
}))

export const unitEquipmentObj = z.object({
  eq_id: z.number(),
  eq_name: z.string(),
  eq_type: z.number(),
  material_name: z.string().nullable(),
  material_code: z.number().nullable(),
  batch_id: z.number().nullable(),
  batch_no: z.string().nullable().optional(),
  batch_no_extra: z.string().nullable().optional(),
  remain_wgt: z.number().nullable().optional(),
  remain_wgt_pim: z.number().nullable().optional(),
  remain_len: z.number().nullable().optional(),
  remain_len_pim: z.number().nullable().optional(),
  run_m_wgt: z.number().nullable().optional(),
  run_m_wgt_fill: z.number().nullable().optional(),
  filling_factor: z.number().nullable().optional(),
  coil_net_wgt: z.number().nullable().optional(),
  coil_len: z.number().nullable().optional(),
  bin_net_wgt: z.number().nullable().optional(),
  density: z.union([z.string(), z.number()]).nullable().optional(),
  material_chemistry: eqChemistryScheme,
})

export const eqStatusObj = z.object({
  unit_id: z.string(),
  unit_name: z.string(),
  unit_equipment: z.array(unitEquipmentObj),
})

// Определение схемы массива объектов EQStatus
export const eqStatusArr = z.array(eqStatusObj);

// Определение схемы Zod для EQStatus
export const eqStatusScheme = z.object({
  jsonrpc: z.string(),
  result: z.object({
    timestamp: z.number(),
    data: eqStatusArr, // Использование eqStatusArr внутри eqStatusScheme
  }),
  id: z.string(),
});

