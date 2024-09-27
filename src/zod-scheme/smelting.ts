
import { z } from 'zod';
// Определение схемы Zod

export const smeltingArrSchema = z.object({
  id: z.string(),
  jsonrpc: z.string(),
  result: z.object({
    data:  z.record(z.any()),
  }),
});

export type SmeltingArrSchemaType = z.infer<typeof smeltingArrSchema>;
