import { CodesWidgetItem, CptCodeKeys } from '@/types'

const spravatoCodes: CodesWidgetItem[] = [
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: 'G2082*1' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: 'G2083*1' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99205*1' },
  { key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99215*1' },
  { key: CptCodeKeys.MODIFIER_KEY, code: '25' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99417*3' },
  { key: CptCodeKeys.ADD_ONS_KEY, code: '99417*4' },
]

enum PrecurementMethod {
  BUY_AND_BILL = 'Buy & Bill',
  ONLY_BILL = 'Only Bill',
}

export { spravatoCodes, PrecurementMethod }
