import { z } from 'zod'
import {
  alcoholDrugsSchema,
  fitForDutySchema,
  patientDescriptionSchema,
} from '@/ui/fit-for-duty-psych-eval/widget/schema'

const patientAppointmentDetailsSchema = z.object({
  onTime: z.string().min(1, 'Required'),
  dressed: z.string().min(1, 'Required'),
  appearance: z.string().min(1, 'Required'),
  rapport: z.string().min(1, 'Required'),
  eyeContact: z.string().min(1, 'Required'),
  speech: z.string().min(1, 'Required'),
  polite: z.string().min(1, 'Required'),
  relaxed: z.string().min(1, 'Required'),
  spokeFreely: z.string().min(1, 'Required'),
  interpersonalSkills: z.string().min(1, 'Required'),
  affect: z.string().min(1, 'Required'),
  presentation: z.string().min(1, 'Required'),
  thoughtStream: z.string().min(1, 'Required'),
  articulateThoughts: z.string().min(1, 'Required'),
  alertness: z.string().min(1, 'Required'),
  memoryImpairment: z.string().min(1, 'Required'),
  immediateRecall: z.string().min(1, 'Required'),
  psychologicalDisturbance: z.string().min(1, 'Required'),
  suicidalIdeation: z.string().min(1, 'Required'),
})

const patientInformationSchema = z.object({
  relationshipStatus: z.string().min(1, 'Required'),
  currentCity: z.string().min(1, 'Required').max(20, 'Max 20 characters'),
  livingArrangement: z.string().min(1, 'Required'),
  livingArrangementOtherDetails: z
    .string()
    .max(50, 'Max 50 characters are allowed')
    .optional(),
  placeOfBirth: z.string().min(1, 'Required').max(50, 'Max 50 characters'),
  placeRaised: z.string().min(1, 'Required').max(50, 'Max 50 characters'),
  headInjuryHistory: z.string().min(1, 'Required'),
})

const employmentSchema = z.object({
  previousEmployer: z.string().min(1, 'Required').max(30),
  durationAtPreviousEmployer: z.string().min(1, 'Required').max(20),
  priorEmployment: z.string().min(1, 'Required').max(50),
  hasDisciplinaryActions: z.string().min(1, 'Required'),
  disciplinaryIncidentDescription: z
    .string()
    .max(150, 'Max 150 characters are allowed')
    .optional(),
  useOfForceOrComplaints: z.string().min(1, 'Required').max(1000),
})

const legalSchema = z.object({
  hasLegalHistory: z.string().min(1, 'Required'),
  legalHistoryDetails: z
    .string()
    .max(500, 'Max 500 characters are allowed')
    .optional(),

  hasRestrainingOrder: z.string().min(1, 'Required'),
  restrainingOrderDetails: z
    .string()
    .max(500, 'Max 500 characters are allowed')
    .optional(),

  hasCivilLitigation: z.string().min(1, 'Required'),
  civilLitigationDetails: z
    .string()
    .max(500, 'Max 500 characters are allowed')
    .optional(),

  motorVehicleRecord: z.string().min(1, 'Required'),
  motorVehicleRecordDetails: z
    .string()
    .max(200, 'Max 200 characters are allowed')
    .optional(),
})

const resultsOfAssessmentSchema = z.object({
  respondedCandidly: z.string().min(1, 'Required'),
  emotionalDistress: z.string().min(1, 'Required'),
  historyOfPsychologicalIssues: z.string().min(1, 'Required'),
  treatmentFromProfessional: z.string().min(1, 'Required'),
  takenMedication: z.string().min(1, 'Required'),
  globalPrediction: z.string().min(1, 'Required'),
  biodataRatings: z.string().min(1, 'Required'),
  teamOrientation: z.string().min(1, 'Required'),
  authorityDeference: z.string().min(1, 'Required'),
  followOrders: z.string().min(1, 'Required'),
  feedbackReaction: z.string().min(1, 'Required'),
  takeResponsibility: z.string().min(1, 'Required'),
  acceptCriticism: z.string().min(1, 'Required'),
  takeDirection: z.string().min(1, 'Required'),
  supervisorRatings: z.string().min(1, 'Required'),
  interactionWithOthers: z.string().min(1, 'Required'),
  treatsOthersFairly: z.string().min(1, 'Required'),
  taskCompletion: z.string().min(1, 'Required'),
  scenarioResponseQuality: z.string().min(1, 'Required'),
  analyticalAbility: z.string().min(1, 'Required'),
  writingSkills: z.string().min(1, 'Required'),
  judgmentOnJob: z.string().min(1, 'Required'),
  impulseControl: z.string().min(1, 'Required'),
  serviceOrientation: z.string().min(1, 'Required'),
  aggressiveTraits: z.string().min(1, 'Required'),
  disqualifyingRisk: z.string().min(1, 'Required'),
  overallAssessment: z.string().min(1, 'Required'),
  finalRecommendation: z.string().min(1, 'Required'),
})

const preEmployementEvaluationSchema = z
  .object({
    //alcohol
    incidentRiskLikelihood: z.string().min(1, 'Required'),
    //Family History
    familyHistoryDetails: z
      .string()
      .min(1, 'Required')
      .max(1200, 'Max 1200 characters are allowed'),
    //Health
    socialAdjustment: z.string().min(1, 'Required'),
  })
  .merge(fitForDutySchema)
  .merge(patientDescriptionSchema)
  .merge(alcoholDrugsSchema)
  .merge(patientAppointmentDetailsSchema)
  .merge(patientInformationSchema)
  .merge(employmentSchema)
  .merge(legalSchema)
  .merge(resultsOfAssessmentSchema)
  .superRefine((data, ctx) => {
    if (
      data.referringOrganization === 'other' &&
      !data.referringOrganizationOtherDetails?.trim()
    ) {
      ctx.addIssue({
        path: ['referringOrganizationOtherDetails'],
        code: z.ZodIssueCode.custom,
        message: 'Other organization is required',
      })
    }

    if (
      data.intervieweeRole === 'other' &&
      !data.intervieweeRoleOtherDetails?.trim()
    ) {
      ctx.addIssue({
        path: ['intervieweeRoleOtherDetails'],
        code: z.ZodIssueCode.custom,
        message: 'Other role is required',
      })
    }
    //Alcohol

    if (
      data.alcoholTreatmentHistory === 'has' &&
      !data.alcoholTreatmentProgram?.trim()
    ) {
      ctx.addIssue({
        path: ['alcoholTreatmentProgram'],
        code: z.ZodIssueCode.custom,
        message: 'Program and timeframe is required',
      })
    }
    //patient info
    if (
      data?.livingArrangement === 'other' &&
      !data?.livingArrangementOtherDetails?.trim()
    ) {
      ctx.addIssue({
        path: ['livingArrangementOtherDetails'],
        message: 'Required',
        code: z.ZodIssueCode.custom,
      })
    }
    //
    if (
      data?.hasDisciplinaryActions === 'has' &&
      !data?.disciplinaryIncidentDescription?.trim()
    ) {
      ctx.addIssue({
        path: ['disciplinaryIncidentDescription'],
        message: 'Required',
        code: z.ZodIssueCode.custom,
      })
    }
    //Legal
    if (data.hasLegalHistory === 'does' && !data.legalHistoryDetails?.trim()) {
      ctx.addIssue({
        path: ['legalHistoryDetails'],
        code: z.ZodIssueCode.custom,
        message: 'Details are required',
      })
    }

    if (
      data.hasRestrainingOrder === 'have' &&
      !data.restrainingOrderDetails?.trim()
    ) {
      ctx.addIssue({
        path: ['restrainingOrderDetails'],
        code: z.ZodIssueCode.custom,
        message: 'Details are required',
      })
    }

    if (
      data.hasCivilLitigation === 'has' &&
      !data.civilLitigationDetails?.trim()
    ) {
      ctx.addIssue({
        path: ['civilLitigationDetails'],
        code: z.ZodIssueCode.custom,
        message: 'Details are required',
      })
    }

    if (
      data.motorVehicleRecord === 'remarkable' &&
      !data.motorVehicleRecordDetails?.trim()
    ) {
      ctx.addIssue({
        path: ['motorVehicleRecordDetails'],
        code: z.ZodIssueCode.custom,
        message: 'Details are required',
      })
    }
  })

type SchemaType = z.infer<typeof preEmployementEvaluationSchema>

export { preEmployementEvaluationSchema, type SchemaType }
