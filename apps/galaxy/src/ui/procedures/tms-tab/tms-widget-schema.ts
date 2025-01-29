import { z } from 'zod'

type TmsWidgetSchemaType = z.infer<typeof tmsWidgetSchema>
const requiredValues = ["1", "2", "3", "4", "5", "6"];
const tmsWidgetSchema = z.object({
  tmsSeizureBlock: z.string(),
  tmsSeizureBlockDetail: z.string(),

  tmsDizzinessBlock: z.string(),
  tmsDizzinessBlockDetail: z.string(),

  tmsHeadacheBlock: z.string(),
  tmsHeadacheBlockDetail: z.string(),

  tmsFatigueBlock: z.string(),
  tmsFatigueBlockDetail: z.string(),

  tmsMuscleTwitchingBlock: z.string(),
  tmsMuscleTwitchingBlockDetail: z.string(),

  suicide: z.string(),

  tmsScalpDiscomfortBlock: z.string(),
  tmsScalpDiscomfortBlockDetail: z.string(),

  tmsOtherBlock: z.string(),
  tmsOtherBlockDetail: z.string(),

  dischargePlan: z.array(z.string()).min(1, 'required'),
  modifyTreatmentPlanDetail: z.string(),
  discontinueTreatmentDetail: z.string(),
  referralDetail: z.string(),
  followUpBlock: z.array(z.string()),
  typeOfThetaBurst: z.string(),
  frequency: z.string(),
  frequencyOfSession: z.string().min(1, 'required'),
  thetaBurstFrequencyOfSession: z.string(),
  frequencyUnit: z.string(),
  plannedSession: z.string().min(1, 'required'),
  durationFrom: z.string().min(1, 'required'),
  intermittentDurationFrom: z.string().min(1, 'required'),
  durationTo: z.string().min(1, 'required'),
  optimalStimulationLevel: z.string(),
  motorThershold: z.array(
    z.object({
      dateTime: z.string(),
      user: z.string(),
      motorThersholdPercent: z.string(),
    }),
  ).min(1, 'required'),
  stimulationLevel: z.string(),
  precautionsAndWarnings: z.array(z.string()).refine(
    (arr) =>
      arr.length === requiredValues.length &&
      arr.every((value) => requiredValues.includes(value)) &&
      requiredValues.every((value) => arr.includes(value)),
    {
      message: `precautionsAndWarnings must contain exactly ${JSON.stringify(requiredValues)} in any order.`,
    }
  ),
  tmdSessionNo: z.string(),
  stimulationSite: z.string(),
  coilTypeUsed: z.string(),
  treatmentParameter: z.string(),
  treatmentAdjustmentDetail: z.string(),
  burstPattern: z.string(),
  treatmentAndObservation: z.string().min(1, 'required'),
  protocol: z.string(),
  motorThersholdValue: z.string(),
})

export { tmsWidgetSchema, type TmsWidgetSchemaType }
