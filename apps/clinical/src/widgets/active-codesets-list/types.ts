import {
  EditableAttribute,
  EditableCode,
  NewAttribute,
  NewCode,
} from '@psychplus/codeset'
import { ValidationError } from './store'

interface ColumnProps {
  handleFieldChange: (
    type: 'newCode' | 'editableCode',
    key: string,
    value: string,
  ) => void
  newCode: NewCode
  editableCode: EditableCode
  errors: Record<string, string>
  setNewCode: (newCode: NewCode) => void
  setCodeErrors: (errors: ValidationError) => void
}

interface AttributeColumnProps {
  handleFieldChange: (
    type: 'newAttribute' | 'editableAttribute',
    key: string,
    value: string,
  ) => void
  newAttribute: NewAttribute
  editableAttribute: EditableAttribute
  errors: Record<string, string>
  setNewAttribute: (newAttribute: NewAttribute) => void
  setAttributeErrors: (errors: ValidationError) => void
  codeId: string
}

interface ActiveCodestesRequestParams {
  isIncludeCodesets: boolean
  isIncludeCodes: boolean
  isIncludeCodeAttributes: boolean
  namespace?: string
  oid?: string
  recordStatuses: string[]
  authorityId?: string
}

export type { ColumnProps, ActiveCodestesRequestParams, AttributeColumnProps }
