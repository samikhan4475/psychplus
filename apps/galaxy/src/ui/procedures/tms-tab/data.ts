import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { TmsWidgetSchemaType } from './tms-widget-schema'
import { ProtocolTitles, TypeOfThetaBurst } from './treatment-session/types'


type TmsValueType = string & string[] & never[]

const handleObjInArray = (key: string, value: string): string => {
  if (Array.isArray(value)) {
    if (key === 'motorThershold') {
      const res = value.map((item) => JSON.stringify(item))
      return res.toString()
    }
    return value.toString()
  } else {
    return value as string
  }
}


const transformOut =
  (patientId: string) =>
    (schema: TmsWidgetSchemaType): QuickNoteSectionItem[] => {
      const result: QuickNoteSectionItem[] = []
      const data = sanitizeFormData(schema)
      Object.entries(data).forEach(([key, value]) => {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.ProcedureTMS,
          sectionItem: key,
          sectionItemValue: handleObjInArray(key, value as string),
        })
      })

      return result
    }

const transformIn = (value: QuickNoteSectionItem[]) => {
  const result = {
    tmsSeizureBlock: 'no',
    tmsSeizureBlockDetail:
      'Standard seizure management protocol was followed, including patient monitoring and necessary medical interventions',
    tmsDizzinessBlock: 'no',
    tmsDizzinessBlockDetail:
      'Provided hydration, conducted a brief assessment of vital signs including blood pressure and heart rate. Advised the patient to sit or lie down in a safe environment until symptoms subside. Monitored closely for any further developments and documented observations for future reference.',
    tmsHeadacheBlock: 'no',
    tmsHeadacheBlockDetail:
      'Rested in a dark, quiet environment and administered over-the-counter analgesics if needed.',
    tmsFatigueBlock: 'no',
    tmsFatigueBlockDetail:
      'Rest was advised in a dark, quiet environment, and hydration was provided. Recommendations for post-discharge included continued rest, maintaining adequate hydration, and gradual return to normal activities.',
    tmsMuscleTwitchingBlock: 'no',
    tmsMuscleTwitchingBlockDetail:
      'Adjusted stimulation parameters to minimize muscle activation. Provided guidance on relaxation techniques such as deep breathing or progressive muscle relaxation exercises. Additionally, ensured hydration, conducted a brief assessment of vital signs, and advised the patient to sit or lie down until symptoms subside.',
    suicide: 'no',
    tmsScalpDiscomfortBlock: 'no',
    tmsScalpDiscomfortBlockDetail:
      'Adjusted coil positioning to alleviate discomfort. Provided patient education on scalp care post-session.',
    tmsOtherBlock: 'no',
    tmsOtherBlockDetail: '',
    dischargePlan: ['continueWithCurrentProtocol'],
    modifyTreatmentPlanDetail: 'maintenance',
    discontinueTreatmentDetail: 'Patient discontinued treatment due to completion of recommended treatment course',
    followUpBlock: ['PHQ-9'],
    referralDetail: 'The patient was referred to a behavioral health specialist for ongoing psychotherapy to address underlying issues contributing to their condition, develop effective coping strategies, and provide comprehensive mental health support',
    typeOfThetaBurst: TypeOfThetaBurst.ContinuesThetaBurst as string,
    frequency: 'Theta Frequency (5 Hz)',
    stimulationSite: "DLPFC",
    coilTypeUsed: "DC",
    treatmentParameter: "NoAdjustmentsMade",
    treatmentAdjustmentDetail: 'Minor adjustments to stimulation parameters were made based on patient response and tolerance.',
    frequencyOfSession: '1',
    thetaBurstFrequencyOfSession: '5',
    frequencyUnit: 'Week',
    frequencyUnitThetaBurst: 'Week',
    plannedSession: '00',
    plannedSessionThetaBurst: '00',
    durationFrom: '20',
    intermittentDurationFrom: '190',
    durationTo: '40',
    optimalStimulationLevel: '120',
    motorThershold: [],
    stimulationLevel: '0',
    precautionsAndWarnings: ["1", "2", "3", '4', '5', '6'],
    tmdSessionNo: '01',
    burstPattern: 'Intermittent',
    protocol: ProtocolTitles.StandardProtocol as string,
    motorThersholdValue: '0',
    treatmentAndObservation: ''
  }

  value.forEach((item) => {
    if (item.sectionItem === 'motorThershold') {
      result[item.sectionItem] = JSON.parse(`[${item.sectionItemValue}]`)
    }
    else if (item.sectionItem === 'dischargePlan' || item.sectionItem === 'followUpBlock' || item.sectionItem === 'precautionsAndWarnings' && typeof item.sectionItemValue === 'string') {
      result[item.sectionItem] = item.sectionItemValue.split(',')
    }
    else {
      result[item.sectionItem as keyof TmsWidgetSchemaType] = item.sectionItemValue as TmsValueType
    }
  })

  return result;
}

export { transformIn, transformOut }