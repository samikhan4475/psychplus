import { DateValue } from 'react-aria-components'
import { z } from 'zod'

const patientDescriptionSchema = z.object({
  patientHeightCategory: z.string().min(1, 'Required'),
  patientFrameSize: z.string().min(1, 'Required'),
  patientBodyBuild: z.string().min(1, 'Required'),
  patientWeight: z.string().min(1, 'Required').max(3, 'Max 3 characters'),
  heightInches: z.string().min(1, 'Required').max(4, 'Max 4 characters'),
  heightFeet: z.string().min(1, 'Required').max(2, 'Max 2 characters'),
})

const fitForDutySchema = z.object({
  referringOrganization: z.string().min(1, 'Required'),
  referringOrganizationOtherDetails: z
    .string()
    .max(50, 'Max 50 characters are allowed')
    .optional(),

  intervieweeRole: z.string().min(1, 'Required'),
  intervieweeRoleOtherDetails: z
    .string()
    .max(50, 'Max 50 characters are allowed')
    .optional(),
})

const patientAppointmentSchema = z.object({
  wasOnTime: z.string().min(1, 'Required'),
  dressed: z.string().min(1, 'Required'),
  looked: z.string().min(1, 'Required'),
  rapportEstablished: z.string().min(1, 'Required'),
  eyeContact: z.string().min(1, 'Required'),
  speechArticulate: z.string().min(1, 'Required'),
  politeCooperative: z.string().min(1, 'Required'),
  relaxedConfident: z.string().min(1, 'Required'),
  spokeFreely: z.string().min(1, 'Required'),
  verbalSkills: z.string().min(1, 'Required'),
  affectAppropriate: z.string().min(1, 'Required'),
  presentationValid: z.string().min(1, 'Required'),
  thoughtStreamNormal: z.string().min(1, 'Required'),
  articulateThoughts: z.string().min(1, 'Required'),
  alertOriented: z.string().min(1, 'Required'),
  memoryImpairment: z.string().min(1, 'Required'),
  immediateRecall: z.string().min(1, 'Required'),
  concentrationAttention: z.string().min(1, 'Required'),
  psychDisturbance: z.string().min(1, 'Required'),
  suicidalIdeation: z.string().min(1, 'Required'),
})

const reasonForReferralSchema = z.object({
  dateOfIncident: z.custom<DateValue>().nullable(),
  sustainedInjury: z.string().min(1, 'Required'),
  injurySeverity: z.string().optional(),
  injuryLocation: z
    .string()
    .max(50, 'Max 50 characters are allowed')
    .optional(),
  onAdministrativeDuty: z.string().min(1, 'Required'),
})

const historySchema = z.object({
  relationshipStatus: z.string().min(1, 'Required'),
  currentCity: z
    .string()
    .min(1, 'Required')
    .max(20, 'Max 20 characters allowed'),
  hasChildren: z.string().min(1, 'Required'),
})

const educationSchema = z.object({
  highSchoolPerformance: z.string().min(1, 'Required'),
  postHighSchoolEducation: z
    .string()
    .min(1, 'Required')
    .max(1200, 'Max 1200 characters are allowed'),
})

const employmentSchema = z.object({
  employedSinceMonth: z.string().min(1, 'Required'),
  employedSinceYear: z.string().min(1, 'Required'),
  priorPosition: z.string().min(1, 'Required').max(20, 'Max 20 characters'),
  positionDuration: z.string().min(1, 'Required').max(20, 'Max 20 characters'),
  hadDisciplinary: z.string().min(1, 'Required'), // 'has' / 'hasNot'
  disciplinaryIncident: z.string().max(1200, 'Max 1200 characters').optional(),
  handgunDescription: z
    .string()
    .min(1, 'Required')
    .max(1000, 'Max 1000 characters'),
})

const militarySchema = z.object({
  hasMilitaryExperience: z.string().min(1, 'Required'), // 'has' / 'hasNot'
  militaryBranch: z.string().max(100, 'Max 100 characters').optional(),
})

const medicalSchema = z.object({
  hasAnxietyHistory: z.string().min(1, 'Required'),
  hasDepressionHistory: z.string().min(1, 'Required'),
  hasHeadInjuryHistory: z.string().min(1, 'Required'),
  hasLifeThreateningInjuryHistory: z.string().min(1, 'Required'),
})

const impulseControlSchema = z.object({
  historyOfViolenceAsAdult: z.string().min(1, 'Required'),
  historyOfDomesticViolence: z.string().min(1, 'Required'),
  reportsImpulsivity: z.string().min(1, 'Required'),
  hasBankruptcyOrPoorCredit: z.string().min(1, 'Required'),
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

const conclusionSchema = z.object({
  isFitForDuty: z.string().min(1, 'Required'),
  hasPsychologicalDisorderAffectingFunction: z.string().min(1, 'Required'),
  isSuicidalRiskEvident: z.string().min(1, 'Required'),
  isWeaponMisuseThreat: z.string().min(1, 'Required'),
  hasReasonableAccommodation: z.string().min(1, 'Required'),
  recommendedAccommodations: z
    .string()
    .max(200, 'Max 200 characters allowed')
    .optional(),
  providerGaveRecommendationsToSubject: z.string().min(1, 'Required'),
})

const alcoholDrugsSchema = z.object({
  alcoholFrequency: z.string().min(1, 'Required'),
  drinksPerSitting: z.string().min(1, 'Required'),
  maxAlcoholConsumed: z
    .string()
    .min(1, 'Required')
    .max(50, 'Max 50 characters allowed'),
  concernAboutDrinking: z.string().min(1, 'Required'),
  historyOfDrinkingProblems: z.string().min(1, 'Required'),
  alcoholTreatmentHistory: z.string().min(1, 'Required'),
  alcoholTreatmentProgram: z
    .string()
    .max(150, 'Max 150 characters allowed')
    .optional(),
  useOfIllicitDrugs: z.string().min(1, 'Required'),
  marijuanaWhileEmployed: z.string().min(1, 'Required'),
  useOfEnhancingDrugs: z.string().min(1, 'Required'),
})

const fitForDutyEvaluationSchema = z
  .object({
    //Review of Records
    incidentDescription: z
      .string()
      .min(1, 'Required')
      .max(1200, 'Max 1200 characters allowed'),
    //Family History
    familyHistoryDetails: z
      .string()
      .min(1, 'Required')
      .max(1200, 'Max 1200 characters are allowed'),
    //Collateral Interviews
    higherUpSummary: z
      .string()
      .min(1, 'Required')
      .max(1500, 'Max 1500 characters are allowed'),
    //Results of Interview
    incidentNarrative: z
      .string()
      .min(1, 'Required')
      .max(2000, 'Max 2000 characters are allowed'),
    //Summary and Recommendation
    summaryRecommendation: z
      .string()
      .min(1, 'Required')
      .max(2000, 'Max 2000 characters are allowed'),
    //Impulse Control
    ...impulseControlSchema.shape,
    //Conclusion
    ...conclusionSchema.shape,
    //Alcohol
    ...alcoholDrugsSchema.shape,
  })
  .merge(patientDescriptionSchema)
  .merge(fitForDutySchema)
  .merge(patientAppointmentSchema)
  .merge(reasonForReferralSchema)
  .merge(historySchema)
  .merge(employmentSchema)
  .merge(militarySchema)
  .merge(medicalSchema)
  .merge(legalSchema)
  .merge(educationSchema)
  .superRefine((data, ctx) => {
    // Fit-for-duty logic
    if (!data.dateOfIncident) {
      ctx.addIssue({
        path: ['dateOfIncident'],
        code: z.ZodIssueCode.custom,
        message: 'Required',
      })
    }

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

    // Reason for referral logic
    if (data.sustainedInjury === 'did') {
      if (!data.injurySeverity) {
        ctx.addIssue({
          path: ['injurySeverity'],
          code: z.ZodIssueCode.custom,
          message: 'Required',
        })
      }
      if (!data.injuryLocation?.trim()) {
        ctx.addIssue({
          path: ['injuryLocation'],
          code: z.ZodIssueCode.custom,
          message: 'Required',
        })
      }
    }

    // only require disciplinaryIncident if they *have* had disciplinary action
    if (data.hadDisciplinary === 'has' && !data.disciplinaryIncident?.trim()) {
      ctx.addIssue({
        path: ['disciplinaryIncident'],
        code: z.ZodIssueCode.custom,
        message: 'Describe the incident is required',
      })
    }
    //military
    if (data.hasMilitaryExperience === 'does' && !data.militaryBranch?.trim()) {
      ctx.addIssue({
        path: ['militaryBranch'],
        code: z.ZodIssueCode.custom,
        message: 'Military branch is required',
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
    //conclusion
    if (
      data.hasReasonableAccommodation === 'are' &&
      !data.recommendedAccommodations?.trim()
    ) {
      ctx.addIssue({
        path: ['recommendedAccommodations'],
        code: z.ZodIssueCode.custom,
        message: 'Accommodation details are required',
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
  })

type SchemaType = z.infer<typeof fitForDutyEvaluationSchema>

export {
  patientDescriptionSchema,
  fitForDutySchema,
  fitForDutyEvaluationSchema,
  alcoholDrugsSchema,
  type SchemaType,
}
