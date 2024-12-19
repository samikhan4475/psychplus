import { CodesWidgetItem, CptCodeKeys, QuickNoteSectionItem } from '@/types'
import { getDateDifference, sanitizeFormData } from '@/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { TcmWidgetSchemaType } from './tcm-widget-schema'
import { DateValue } from 'react-aria-components'
import { manageCodes } from '@/utils/codes'
import { tcmCodes } from './utils'

export const tmsKeys = [
  {
    label: 'DC Date:',
    key: 'dcDate',
  },
  {
    label: 'DC Hospital Name:',
    key: 'dcHospitalName',
  },
  {
    label: 'DC Hospital Service Type:',
    key: 'dcHospitalServiceType',
  },
  {
    label: 'Contact Made By:',
    key: 'dcContactMadeBy',
  },
  {
    label: 'Date:',
    key: 'tcmDate',
  },
  {
    label: 'Results:',
    key: 'tcmResults',
  },
]

const transformIn = (value: QuickNoteSectionItem[]): TcmWidgetSchemaType => {
  const result: Record<string, string | DateValue | null> = {
    dcDate: null,
    dcHospitalName: "",
    dcHospitalServiceType: "",
    dcContactMadeBy: "",
    tcmDate: null,
    tcmResults: "",
  }
  value.forEach((item) => {
    result[item.sectionItem as keyof TcmWidgetSchemaType] = item.sectionItemValue
  })
  return result as TcmWidgetSchemaType;
}

const transformOut = (patientId: string, appointmentId: string) =>
  async (schema: Record<string, string | DateValue | null>) => {
    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)
    Object.entries(data).forEach(([key, value]) => {
      let newValue = value
      if ((key === 'dcDate' || key === 'tcmDate') && value) {
        newValue = value.toString()
      }
      result.push({
        pid: Number(patientId),
        sectionName:
          QuickNoteSectionName.QuicknoteSectionTcm,
        sectionItem: key,
        sectionItemValue: newValue as string,
      })
    })
    
    const selectedCodes: CodesWidgetItem[] = [];
    const dischargeDate = data.dcDate as DateValue;
    const serviceDate = data.tcmDate as DateValue;
    const datesDifference = getDateDifference(serviceDate, dischargeDate);

    const addCodes = (codes: CodesWidgetItem[]) => {
      selectedCodes.push(...codes);
    };

    if (datesDifference <= 7) {
      addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code: "99496" }]);
    } else if (datesDifference <= 14) {
      addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code: "99495" }]);
    }
    
    const codesResult = await manageCodes(
      patientId,
      appointmentId,
      tcmCodes,
      selectedCodes,
    )
    return [...result, ...codesResult]
  }

export { transformIn, transformOut }
