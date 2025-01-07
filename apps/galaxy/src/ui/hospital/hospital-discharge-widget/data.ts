import { QuickNoteSectionItem } from '@/types'
import { HospitalDischargeWidgetSchemaType } from './hospital-discharge-widget-schema'
import { sanitizeFormData } from '@/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
export const hospitalDischargeKeys = [
  {
    label: 'Antipsychotics:',
    key: 'antiPsychotics',
    detail:'antiPsychoticOptions'
  },
  {
    label: 'Strengths:',
    key: 'strengths',
    detail:'strengthsOtherDescription',
  },
  {
    label: 'Liabilities:',
    key: 'liabilites',
    detail:'liabilitesOtherDescription',
  },
  {
    label: 'Hospital Course:',
    key: 'hospitalCourse',
  },
  {
    label: 'Physical condition WNL:',
    key: 'physicalConditionWNL',
    detail:'physicalConditionDescription'
  },
  {
    label: 'Ambulation WNL:',
    key: 'ambulationWNL',
    detail:'ambulationWNLDescription'
  },
  {
    label: 'Able to perform ADLs:',
    key: 'ableToPerformAdls',
    detail:'ableToPerformAdlsDescription'
  },
  {
    label: 'Social functioning WNL:',
    key: 'socialFunctioningWNL',
    detail:'socialFunctioningWNLDescription',
  },
  {
    label: 'Activity:',
    key: 'activity',
    detail: 'activityOtherDescription',
  },
  {
    label: 'Diet:',
    key: 'diet',
    detail: 'dietOtherDescription',
  },
  {
    label: 'Discharge Type:',
    key: 'dischargeType',
    detail: 'dischargeTypeDescription',
  },
  {
    label: 'Disposition:',
    key: 'disposition',
  },
  {
    label: 'Follow Up if Other:',
    key: 'followUp',
  },
  {
    label: 'Discharge Time Spent:',
    key: 'dischargeTimeSpent',
  },
]
const transformIn = (
  value: QuickNoteSectionItem[],
): HospitalDischargeWidgetSchemaType => {
  const converToObject = [
    'antiPsychoticOptions',
    'strengths',
    'liabilites',
  ]
  const result = {
    antiPsychotics: "",
    antiPsychoticOptions: [],
    strengths: [],
    strengthsOtherDescription:'',
    liabilites: [],
    liabilitesOtherDescription:'',
    hospitalCourse: "Admission factors were reviewed during their hospitalization. Pt started to gradually improve, his mood gradually improved and symptoms improved. Pt’s affect got better and he became much more redirectable. Pt tolerated the medications well and denied SE to meds. Pt started to attend therapy, including individual and group therapy. Pt was seen at discharge and denied SI/HI. Was able to contract for safety. Pt is at risk for worsening symptoms without treatment and we discussed a safety plan, emergency procedures, Medications risks and SE were also discussed",
    physicalConditionWNL: "",
    physicalConditionDescription: "",
    ambulationWNL: "",
    ambulationWNLDescription: "",
    ableToPerformAdls: "",
    ableToPerformAdlsDescription: "",
    socialFunctioningWNL: "",
    socialFunctioningWNLDescription: "",
    activity: "",
    activityOtherDescription:"",
    diet: "",
    dietOtherDescription:"",
    dischargeType: "",
    dischargeTypeDescription:"",
    disposition: "",
    followUp: "",
    dischargeTimeSpent: "",
  }
  
  value.forEach((item) => {
    result[item.sectionItem as keyof HospitalDischargeWidgetSchemaType] =
      converToObject.includes(item.sectionItem)
        ? JSON.parse(item.sectionItemValue)
        : item.sectionItemValue
  })

  return result as HospitalDischargeWidgetSchemaType;

}

const transformOut =
  (patientId: string) =>
    (schema: HospitalDischargeWidgetSchemaType): QuickNoteSectionItem[] => {
      const result: QuickNoteSectionItem[] = []
      const data = sanitizeFormData(schema)
      Object.entries(data).forEach(([key, value]) => {
        let newValue = value
        if (typeof value === 'object') {
          newValue = JSON.stringify(value)
        }
        result.push({
          pid: Number(patientId),
          sectionName:
            QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
          sectionItem: key,
          sectionItemValue: newValue as string,
        })
      })
      return result
    }

export { transformIn, transformOut }
