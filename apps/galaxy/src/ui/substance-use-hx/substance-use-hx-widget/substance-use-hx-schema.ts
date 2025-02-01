import { z } from 'zod'

type SubstanceUseHxWidgetSchemaType = z.infer<typeof substanceUseHxWidgetSchema>

const substanceUseHxWidgetSchema = z
  .object({
    tobacco: z.enum(['yes', 'no']).optional(),
    tobaccoChewSmoke: z.enum(['chew', 'smoke']).optional(),
    widgetContainerCheckboxField: z.string().optional(),
    smokePacks: z.enum(['0.5', '1', '2']).optional(),
    smokingCessationOption: z.string().optional(),
    counselingOption: z.string().optional(),
    smokingCessationDiscussionDuration: z
      .enum(['≥ 3 mins', '≥ 11 mins'])
      .optional(),
    otherTobacco: z.string().optional(),
    alcohol: z.enum(['yes', 'no']).optional(),
    drugs: z.enum(['yes', 'no']).optional(),
    opioids: z.oboolean(),
    opioidsDetails: z.ostring(),
    sedative: z.oboolean(),
    sedativeDetails: z.ostring(),
    cocaine: z.oboolean(),
    cocaineDetails: z.ostring(),
    amphetamine: z.oboolean(),
    amphetamineDetails: z.ostring(),
    pcp: z.oboolean(),
    pcpDetails: z.ostring(),
    inhalants: z.oboolean(),
    inhalantsDetails: z.ostring(),
    questionnaire: z.enum(['yes', 'no']).optional(),
    briefIntervention: z.oboolean(),
    briefInterventionDetail: z.ostring(),
    referralTreatment: z.array(z.string()).optional(),
    alcoholSubstanceCessationDiscussionDuration: z
      .enum(['≥ 15 mins', '≥ 31 mins'])
      .optional(),
    otherAlcoholDrugs: z.ostring(),
    QuicknoteSectionQuestionnaireDast10: z.boolean().optional().default(false),
    QuicknoteSectionQuestionnaireAudit: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    const conditions = [
      data.opioids,
      data.sedative,
      data.cocaine,
      data.amphetamine,
      data.pcp,
      data.inhalants,
    ]

    if (data.drugs === 'yes') {
      if (
        conditions.every(
          (condition) => condition === false || condition === undefined,
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['drugs'],
          message: 'Select at least one drug.',
        })
      }

      if (!data.QuicknoteSectionQuestionnaireDast10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['QuicknoteSectionQuestionnaireDast10'],
          message: 'Please fill out the Dast questionnaire',
        })
      }
    }

    if (data.alcohol === 'yes' && !data.QuicknoteSectionQuestionnaireAudit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['QuicknoteSectionQuestionnaireAudit'],
        message: 'Please fill out the Audit questionnaire',
      })
    }
  })

export { substanceUseHxWidgetSchema, type SubstanceUseHxWidgetSchemaType }
