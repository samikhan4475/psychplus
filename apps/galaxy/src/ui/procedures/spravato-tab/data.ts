import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { SpravatoWidgetSchemaType } from './spravato-widget-schema'

const transformOut =
  (patientId: string) =>
  (schema: SpravatoWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)
    Object.entries(data).forEach(([key, value]) => {
      let newValue = value
      if (typeof value === 'object') {
        newValue = JSON.stringify(value)
      }
      if (key !== 'newVitalSign') {
        result.push({
          pid: Number(patientId),
          sectionName:
            QuickNoteSectionName.QuicknoteSectionProcedureSpravatoTab,
          sectionItem: key,
          sectionItemValue: newValue as string,
        })
      }
    })

    return result
  }

const transformIn = (
  value: QuickNoteSectionItem[],
): SpravatoWidgetSchemaType => {
  const converToObject = [
    'plan',
    'continueWithCurrentProtocolBlock',
    'continueWithMaintainanceBlock',
    'followUpScreening',
    'vitalSigns',
  ]

  const result: any = {
    treatmentNumber: '01',
    medicationAssessment: 'true',
    benzodiazepines: 'no',
    nonBenzodiazepineSedativeHypnotic: 'no',
    psychostimulants: 'no',
    monoamineOxidaseInhibitors: 'no',
    aneurysmalVascularDisease: 'true',
    pregnancyStatus: 'true',
    adverseReactionsEducation: 'true',
    postTreatmentSafety: 'true',
    sedation: 'no',
    sedationSymptomsResolved: 'yes',
    anxiety: 'no',
    dissociation: 'no',
    dissociationSymptomsResolved: 'yes',
    dizzinessAndVertigo: 'no',
    increasedInBloodPressure: 'no',
    lethargy: 'no',
    nauseaAndVomiting: 'no',
    respiratoryChanges: 'no',
    adverseEventQuestion: 'no',
    occurrenceDuration: 'During This Treatment Session',
    eventResolution: 'yes',
    plan: ['Continue with Current Protocol'],
    continueWithCurrentProtocolBlock: {
      treatmentFrequency: '2',
      treatmentPerUnit: 'week',
    },
    continueWithMaintainanceBlock: {
      treatmentFrequency: '1',
      treatmentPerUnit: 'week',
    },
    discontinueTreatment:
      'Treatment was discontinued because the patient experienced adverse reactions, including hypertension and disorientation, which outweighed the potential benefits of continuing Spravato treatments.',
    referral:
      'The patient was referred to a behavioral health specialist for ongoing psychotherapy to address underlying issues contributing to their condition, develop effective coping strategies, and provide comprehensive mental health support.',
    followUpScreening: ['PHQ-9'],
    postTreatmentTransportation: 'Driver Service',
    othertransportation: 'The patient was transported from the clinic by ...',
    zofranAdministrated: 'no',
    dose: '4mg',
    isPatientDischarge: 'yes',
    timeForPatientReadyForDischarge: '60',
    treatmentAndObservation:
      'Patient showed positive response to Spravato treatment, well tolerated, manageable side effects. Patient remained calm throughout treatment. No suicidal ideations reported. Continued monitoring and subsequent sessions crucial for full evaluation of therapeutic response.',
    vitalSigns: [],
    newVitalSign: {
      diastolic: '',
      heartRate: '',
      pulseOximetry: '',
      respiratoryRate: '',
      systolic: '',
    },
  }

  value.forEach((item) => {
    result[item.sectionItem as keyof SpravatoWidgetSchemaType] =
      converToObject.includes(item.sectionItem)
        ? JSON.parse(item.sectionItemValue)
        : item.sectionItemValue
  })

  return result as SpravatoWidgetSchemaType
}

export { transformIn, transformOut }
