import { z } from 'zod'

type SpravatoWidgetSchemaType = z.infer<typeof spravatoWidgetSchema>

const spravatoWidgetSchema = z
  .object({
    procurementMethod: z.string().optional(),
    treatmentNumber: z.string().optional(),
    doseAdminstered: z.string().optional(),
    lotNumber: z.string().optional(),
    medicationAssessment: z.string().optional(),
    benzodiazepines: z.string().optional(),
    nonBenzodiazepineSedativeHypnotic: z.string().optional(),
    psychostimulants: z.string().optional(),
    monoamineOxidaseInhibitors: z.string().optional(),
    aneurysmalVascularDisease: z.string().optional(),
    pregnancyStatus: z.string().optional(),
    adverseReactionsEducation: z.string().optional(),
    postTreatmentSafety: z.string().optional(),
    sedation: z.string().optional(),
    sedationOnsetOfSymptoms: z.string().optional(),
    sedationSymptomsResolved: z.string().optional(),
    sedationTimeSinceAdministration: z.string().optional(),
    dissociation: z.string().optional(),
    dissociationOnsetOfSymptoms: z.string().optional(),
    dissociationSymptomsResolved: z.string().optional(),
    dissociationTimeSinceAdministration: z.string().optional(),
    dizzinessAndVertigo: z.string().optional(),
    nauseaAndVomiting: z.string().optional(),
    anxiety: z.string().optional(),
    lethargy: z.string().optional(),
    increasedInBloodPressure: z.string().optional(),
    respiratoryChanges: z.string().optional(),
    adverseEventQuestion: z.string().optional(),
    adverseEventText: z.string().optional(),
    occurrenceDuration: z.string().optional(),
    dateOfEvent: z.string().optional(),
    eventResultedIn: z.string().optional(),
    otherText: z.string().optional(),
    eventResolution: z.string().optional(),
    plan: z.array(z.string()),
    continueWithCurrentProtocolBlock: z
      .object({
        treatmentFrequency: z.string().optional(),
        treatmentPerUnit: z.string(),
      })
      .optional(),
    continueWithMaintainanceBlock: z
      .object({
        treatmentFrequency: z.string().optional(),
        treatmentPerUnit: z.string(),
      })
      .optional(),
    discontinueTreatment: z.string().optional(),
    referral: z.string().optional(),
    followUpScreening: z.array(z.string()).optional(),
    postTreatmentTransportation: z.string().optional(),
    othertransportation: z.string().optional(),
    certifiedTechnician: z.string().optional(),
    certifiedTechnicianName: z.string().optional(),
    zofranAdministrated: z.string(),
    zofranAdministratedTime: z.string().optional(),
    dose: z.enum(['2mg', '4mg', '8mg', '16mg', '32mg']).optional(),
    spravatoAdministrationTime: z.string().optional(),
    dischargeTime: z.string().optional(),
    totalTimeMonitored: z.string().optional(),
    isPatientDischarge: z.string(),
    timeForPatientReadyForDischarge: z.string(),
    treatmentAndObservation: z.string().min(1, 'Required'),
    vitalSigns: z.array(
      z.object({
        vitalSignDateTime: z.string(),
        systolic: z.string(),
        diastolic: z.string(),
        heartRate: z.string(),
        respiratoryRate: z.string(),
        pulseOximetry: z.string(),
      }),
    ),
    newVitalSign: z
      .object({
        systolic: z.string(),
        diastolic: z.string(),
        heartRate: z.string(),
        respiratoryRate: z.string(),
        pulseOximetry: z.string(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    const validations = [
      {
        condition: data?.aneurysmalVascularDisease === 'false',
        path: ['aneurysmalVascularDisease'],
      },
      {
        condition: data?.pregnancyStatus === 'false',
        path: ['pregnancyStatus'],
      },
      {
        condition: data?.adverseReactionsEducation === 'false',
        path: ['adverseReactionsEducation'],
      },
      {
        condition: data?.postTreatmentSafety === 'false',
        path: ['postTreatmentSafety'],
      },
      {
        condition: !data?.certifiedTechnician,
        path: ['certifiedTechnician'],
      },
      {
        condition: !data?.doseAdminstered,
        path: ['doseAdminstered'],
      },
      {
        condition: !data?.procurementMethod,
        path: ['procurementMethod'],
      },
      {
        condition: data.vitalSigns.length === 0,
        path: ['vitalSigns'],
      },
      {
        condition: data.plan.length === 0,
        path: ['plan'],
      },
      {
        condition:
          data.plan.length > 0 &&
          data.plan.includes('Continue with Current Protocol') &&
          !data?.continueWithCurrentProtocolBlock?.treatmentFrequency,
        path: ['continueWithCurrentProtocolBlock.treatmentFrequency'],
      },
      {
        condition:
          data.plan.length > 0 &&
          data.plan.includes('Continue with Maintenance') &&
          !data?.continueWithMaintainanceBlock?.treatmentFrequency,
        path: ['continueWithMaintainanceBlock.treatmentFrequency'],
      },
      {
        condition:
          data?.zofranAdministrated === 'yes' && !data?.zofranAdministratedTime,
        path: ['zofranAdministratedTime'],
      },
      {
        condition: !data?.totalTimeMonitored,
        path: ['totalTimeMonitored'],
      },
      {
        condition:
          data.sedationSymptomsResolved === 'no' &&
          !data?.sedationTimeSinceAdministration,
        path: ['sedationTimeSinceAdministration'],
      },
      {
        condition: data.sedation === 'yes' && !data?.sedationOnsetOfSymptoms,
        path: ['sedationOnsetOfSymptoms'],
      },
      {
        condition:
          data.dissociationSymptomsResolved === 'no' &&
          !data?.dissociationTimeSinceAdministration,
        path: ['dissociationTimeSinceAdministration'],
      },
      {
        condition:
          data.dissociation === 'yes' && !data?.dissociationOnsetOfSymptoms,
        path: ['dissociationOnsetOfSymptoms'],
      },

      {
        condition:
          data.adverseEventQuestion === 'yes' && !data.adverseEventText,
        path: ['adverseEventText'],
      },
      {
        condition: data.adverseEventQuestion === 'yes' && !data.dateOfEvent,
        path: ['dateOfEvent'],
      },
      {
        condition: data.adverseEventQuestion === 'yes' && !data.eventResultedIn,
        path: ['eventResultedIn'],
      },

      {
        condition: !data?.lotNumber,
        path: ['lotNumber'],
      },
      {
        condition: !data?.spravatoAdministrationTime,
        path: ['spravatoAdministrationTime'],
      },
      {
        condition: !data?.dischargeTime,
        path: ['dischargeTime'],
      },
      {
        condition:
          data.eventResultedIn &&
          data.eventResultedIn === 'Other' &&
          !data.otherText,
        path: ['otherText'],
      },
    ]

    if (
      data.plan.length > 0 &&
      data.plan.includes('Continue with Current Protocol') &&
      data?.continueWithCurrentProtocolBlock?.treatmentFrequency
    ) {
      if (
        !/^[1-5]$/.test(
          data?.continueWithCurrentProtocolBlock?.treatmentFrequency,
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['continueWithCurrentProtocolBlock.treatmentFrequency'],
          message: 'Invalid, value should be 1-5',
        })
      }
    }

    if (
      data.plan.length > 0 &&
      data.plan.includes('Continue with Maintenance') &&
      data?.continueWithMaintainanceBlock?.treatmentFrequency
    ) {
      if (
        !/^[1-5]$/.test(data?.continueWithMaintainanceBlock?.treatmentFrequency)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['continueWithMaintainanceBlock.treatmentFrequency'],
          message: 'Invalid, value should be 1-5',
        })
      }
    }

    validations.forEach((item) => {
      if (item.condition) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: item.path,
          message: 'Required',
        })
      }
    })
  })

export { spravatoWidgetSchema, type SpravatoWidgetSchemaType }
