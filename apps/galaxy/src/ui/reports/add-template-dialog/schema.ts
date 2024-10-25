import z from 'zod';

const templateSchema = z.object({
  id: z.string().optional(),
  displayName: z.string().min(1, "Required"),
  shortName: z.string().min(1, "Required"),
  reportCategoryCode: z.string().min(1, "Required"),
  isAdhocAllowed: z.boolean().optional(),
  parameters: z.array(
    z.object({
      id: z.string().optional(),
      reportParameterCode: z.string(),
      displayName: z.string(),
      resourceStatus: z.string(),
      reportTemplateId: z.string().optional(),
      displayOrder: z.number(),
    })
  ).optional(),
  permittedRoles: z.array(z.string()).optional(),
});

export const addTemplateSchema = templateSchema.extend({
  definitionPayloadUrl: z.any().refine((file) => file instanceof File, {
    message: "Required",
  }),
});

export const editTemplateSchema = templateSchema.extend({
  definitionPayloadUrl: z.any().optional(),
});

export type TemplateSchemaType = z.infer<typeof templateSchema>;
export type AddTemplateSchemaType = z.infer<typeof addTemplateSchema>;
export type EditTemplateSchemaType = z.infer<typeof editTemplateSchema>;
