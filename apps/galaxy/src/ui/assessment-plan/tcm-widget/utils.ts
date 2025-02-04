import { CodesWidgetItem, CptCodeKeys } from '@/types'
import { TcmWidgetSchemaType } from './tcm-widget-schema'

const tcmCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99496' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99495' },
]

const defaultValues: TcmWidgetSchemaType = {
  dcDate: null,
  dcHospitalName: '',
  dcHospitalServiceType: '',
  dcContactMadeBy: '',
  tcmDate: null,
  tcmResults: "",
  tcmResultCheckBox: true
}

export { tcmCodes, defaultValues }
