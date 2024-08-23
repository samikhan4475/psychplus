import { QuickNoteSectionItem } from '@/types'
import { QUICKNOTE_SECTION_NAME } from './constants'
import { HpiWidgetSchemaType } from './hpi-widget-schema'

const ANXIETY_PREFIX = 'ANX'
const BIPOLAR_PREFIX = 'BPD'
const CHIEF_COMPLAINT_PREFIX = 'CC'

const valueToSchema: { [key: string]: string } = {
  // Anxiety block
  ANX_AbnormalFear: 'anxAbnormalFear',
  ANX_Fatigue: 'anxFatigue',
  ANX_FeelingAnxious: 'anxFeelingAnxious',
  ANX_Irritable: 'anxIrritable',
  ANX_MuscleTension: 'anxMuscleTension',
  ANX_PanicAttacks: 'anxPanicAttacks',
  ANX_Phobia: 'anxPhobia',
  ANX_Restless: 'anxRestless',
  ANX_SocialAnxiety: 'anxSocialAnxiety',
  ANX_Worrying: 'anxWorrying',

  // Bipolar disorder block
  BPD_BlackWhiteThinking: 'bpdBlackWhiteThinking',
  BPD_FearOfAbandonment: 'bpdFearOfAbandonment',
  BPD_Impulsiveness: 'bpdImpulsiveness',
  BPD_MoodSwings: 'bpdMoodSwings',
  BPD_SelfHarm: 'bpdSelfHarm',
  BPD_UnstableRelationships: 'bpdUnstableRelationships',
  BPD_UnstableSelfImage: 'bpdUnstableSelfImage',

  // Chief complaint block
  CC_ADHD: 'ccAdhd',
  CC_Anxiety: 'ccAnxiety',
  CC_Bipolar: 'ccBipolar',
  CC_Dementia: 'ccDementia',
  CC_Depression: 'ccDepression',
  CC_Ocd: 'ccOcd',
  CC_Ptsd: 'ccPtsd',
  CC_Schizophrenia: 'ccSchizophrenia',
  CC_Substance: 'ccSubstance',
  CC_SubstanceUser: 'ccSubstanceUser',
  CC_Other: 'ccOther',

  // Other block
  HPI_Other: 'other',
}

const schemaToValue: { [key: string]: string } = Object.entries(
  valueToSchema,
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {} as { [key: string]: string })

const transformIn = (value: QuickNoteSectionItem[]): HpiWidgetSchemaType => {
  const result: HpiWidgetSchemaType = {
    chiefComplaint: [],
    depression: [],
    anxiety: [],
    mania: [],
    ptsd: [],
    obsession: [],
    bpd: [],
    substance: [],
    adhdInattentive: [],
    adhdHyperactive: [],
    dementia: [],
    schizophrenia: [],
    medicationSe: [],
    other: '',
  }

  value.forEach((item) => {
    if (item.sectionItem === 'HPI_Other') {
      result.other = item.sectionItemValue
      return
    }

    const [prefix, _] = item.sectionItem.split('_')

    switch (prefix) {
      case ANXIETY_PREFIX:
        result.anxiety.push(valueToSchema[item.sectionItem])
        break
      case BIPOLAR_PREFIX:
        result.bpd.push(valueToSchema[item.sectionItem])
        break
      case CHIEF_COMPLAINT_PREFIX:
        result.chiefComplaint.push(valueToSchema[item.sectionItem])
        break
      default:
        break
    }
  })

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: HpiWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (key === 'other') {
        return
      }

      Array.isArray(value) &&
        value.forEach((item) => {
          result.push({
            pid: Number(patientId),
            sectionName: QUICKNOTE_SECTION_NAME,
            sectionItem: schemaToValue[item],
            sectionItemValue: '1',
          })
        })
    })

    if (schema.other) {
      result.push({
        pid: Number(patientId),
        sectionName: QUICKNOTE_SECTION_NAME,
        sectionItem: schemaToValue['other'],
        sectionItemValue: schema.other,
      })
    }

    return result
  }

export { transformIn, transformOut }
