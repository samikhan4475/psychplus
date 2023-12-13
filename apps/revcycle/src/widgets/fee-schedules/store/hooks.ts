import {
  getCodeAttribute,
  getCodeMetadata,
  type Code,
} from '@psychplus/codeset'
import { type CptCode } from '../types'
import { useStore } from './combined'

const CODE_SET_CPT_CODE = 'CptCode'

const useCptCodes = (): CptCode[] =>
  useStore(
    (state) =>
      state.codeSetIndex[CODE_SET_CPT_CODE]?.map((code) => ({
        ...convertCodeToCptCode(code),
      })) ?? [],
  )

const convertCodeToCptCode = (code: Code): CptCode => ({
  id: getCodeAttribute(code, 'ResourceId'),
  code: code.code,
  description: code.display,
  type: getCodeAttribute(code, 'Type'),
  isActive: getCodeAttribute(code, 'IsActive') === 'True',
  createdBy: getCodeMetadata(code, 'createdByFullName'),
})

export { useCptCodes }
