import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { EctWidgetSchemaType } from './ect-tab-schema'


export const ectActualViewKeysSection1 = [

  {
    label: 'Anesthesiologist:',
    key: 'anesthesiologist',
  },
  {
    label: 'Time Out:',
    key: 'timeOut',
  },
  {
    label: 'Time of Procedure:',
    key: 'timeOfProcedure',
  },
  {
    label: 'Bite Block:',
    key: 'biteblock',
  },
  {
    label: 'Machine Name:',
    key: 'machineName',
  },
  {
    label: 'ECT Type:',
    key: 'ectTypeBlock',
  },
]

export const ectActualViewKeysSection2 = [
  {
    label: 'Pw:',
    key: 'ectSettingBlockPw',
  },
  {
    label: 'Frequency:',
    key: 'ectSettingBlockFrequency',
  },
  {
    label: 'Duration:',
    key: 'ectSettingBlockDuration',
  },
  {
    label: 'Current:',
    key: 'ectSettingBlockCurrent',
  },
]


export const ectActualViewKeysSection3 = [
  {
    label: 'Seizure Duration:',
    key: 'ectSeizureDuration',
  },
  {
    label: 'Post Op Medication:',
    key: 'ectPostOpMedicationBlock',
  },
  {
    label: '',
    key: 'ectPostOpMedicationBlockDetails',
  },
  {
    label: 'Complications:',
    key: 'ectComplicationsBlock',
  },
  {
    label: '',
    key: 'ectComplicationsBlockDetails',
  },
  {
    label: 'ECT Assessment:',
    key: 'ectAssessment',
  },
  {
    label: '',
    key: 'ectAssessmentDetails',
  },
]
  

const transformOut =
  (patientId: string) =>
    (schema: EctWidgetSchemaType): QuickNoteSectionItem[] => {
      const result: QuickNoteSectionItem[] = []
      const data = sanitizeFormData(schema)
      Object.entries(data).forEach(([key, value]) => {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuicknoteSectionProcedureEtcTab,
          sectionItem: key,
          sectionItemValue: value as string,
        })
      })

      return result
    }

const transformIn = (value: QuickNoteSectionItem[]): EctWidgetSchemaType => {
  const result = {
    seriesMaintenance: 'series',
    series: '',
    maintenance: '',
    biteblock: 'Yes',
    timeOut: '',
    timeOfProcedure: '',
    ectTypeBlock: '',
    ectSettingBlockPw: '',
    ectSettingBlockFrequency: '120',
    ectSettingBlockDuration: '8',
    ectSettingBlockCurrent: '800',
    ectSeizureDuration: '000',
    ectPostOpMedicationBlock: '',
    ectPostOpMedicationBlockDetails: '',
    ectComplicationsBlock: '',
    ectComplicationsBlockDetails: '',
    ectAssessment: '',
    ectContinuePBlock: '',
    anesthesiologist: '',
    machineName:'Mecta'
  }

  value.forEach((item) => {
    result[item.sectionItem as keyof EctWidgetSchemaType] = item.sectionItemValue
  })

  return result as EctWidgetSchemaType;
}

export { transformIn, transformOut }