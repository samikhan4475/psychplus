import { CodesWidgetItem, CptCodeKeys } from '@/types'
import { TcmWidgetSchemaType } from './tcm-widget-schema'
import { DateValue } from 'react-aria-components';
import z from 'zod';

const tcmCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99496' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99495' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99204' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99205' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99215' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99214' },
]

const defaultValues : TcmWidgetSchemaType = {
  dcDate: null,
  dcHospitalName: "",
  dcHospitalServiceType: "",
  dcContactMadeBy: "",
  tcmDate: null,
  tcmResults: "",
}

export { 
  tcmCodes,
  defaultValues
}
