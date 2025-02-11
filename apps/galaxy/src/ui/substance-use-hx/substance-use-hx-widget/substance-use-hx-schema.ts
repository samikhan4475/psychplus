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
    briefInterventionDetail: z.string(),
    referralTreatment: z.array(z.string()).optional(),
    alcoholSubstanceCessationDiscussionDuration: z
      .enum(['≥ 15 mins', '≥ 31 mins'])
      .optional(),
    otherAlcoholDrugs: z.ostring(),
    QuicknoteSectionQuestionnaireDast10: z.boolean().optional().default(false),
    QuicknoteSectionQuestionnaireAudit: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    const isAlcoholYes = data.alcohol === 'yes'
    const isDrugYes = data.drugs === 'yes'
    const isQuestionnaireYes = data.questionnaire === 'yes'
    const conditions = [
      data.opioids,
      data.sedative,
      data.cocaine,
      data.amphetamine,
      data.pcp,
      data.inhalants,
    ]

    if (isDrugYes) {
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

      if (!data.QuicknoteSectionQuestionnaireDast10 && isQuestionnaireYes) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['QuicknoteSectionQuestionnaireDast10'],
          message: 'Please fill out the Dast questionnaire',
        })
      }
    }

    if (
      isAlcoholYes &&
      isQuestionnaireYes &&
      !data.QuicknoteSectionQuestionnaireAudit
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['QuicknoteSectionQuestionnaireAudit'],
        message: 'Please fill out the Audit questionnaire',
      })
    }

    if (isAlcoholYes || isDrugYes) {
      if (!data.referralTreatment?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['referralTreatment'],
          message: 'Please select at least one referral to treatment',
        })
      }
    }

    if (!data.briefInterventionDetail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['briefInterventionDetail'],
        message: 'Please fill out the brief intervention details',
      })
    }
  })

export { substanceUseHxWidgetSchema, type SubstanceUseHxWidgetSchemaType }
