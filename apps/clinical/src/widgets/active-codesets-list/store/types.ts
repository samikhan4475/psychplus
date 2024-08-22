import {
  ActiveCodeAttribute,
  AssigningAuthority,
  EditableAttribute,
  EditableCode,
  NewAttribute,
  NewCode,
  type ActiveCodeSet,
} from '@psychplus/codeset'

type ValidationError = { [key: string]: string }
interface CodeSetState {
  codeSets: Partial<ActiveCodeSet>[]
  codeSet: null | Partial<ActiveCodeSet>
  setCodeSets: (value: Partial<ActiveCodeSet>[]) => void
  setCodeSet: (value: Partial<ActiveCodeSet>) => void
}

interface CodeState {
  attributes: Partial<ActiveCodeAttribute>[]
  setAttributes: (value: Partial<ActiveCodeAttribute>[]) => void
  newCode: NewCode
  setNewCode: (newCode: NewCode) => void
  editableCode: EditableCode
  newAttribute: NewAttribute
  setNewAttribute: (newAttribute: NewAttribute) => void
  editableAttribute: EditableAttribute
  setEditableAttribute: (editableAttribute: EditableAttribute) => void
  setEditableCode: (editableCode: EditableCode) => void
  updateField: (
    type: 'newCode' | 'editableCode' | 'newAttribute' | 'editableAttribute',
    key: string,
    value: string | number,
  ) => void
}

interface AuthorityState {
  assigningAuthority: Partial<AssigningAuthority> | null
  setAssiginingAuthority: (value: Partial<AssigningAuthority>) => void
  authorityId: string
  setAuthorityId: (authorityId: string) => void
  namespace: string
  setNameSpace: (namespace: string) => void
}

interface CodeErrorState {
  codeErrors: ValidationError
  setCodeErrors: (codeError: ValidationError) => void
  attributeErrors: ValidationError
  setAttributeErrors: (attributeErrors: ValidationError) => void
}

type CodeSetsStoreType = CodeSetState &
  AuthorityState &
  CodeState &
  CodeErrorState

export type {
  CodeSetState,
  CodeSetsStoreType,
  AuthorityState,
  CodeState,
  CodeErrorState,
  ValidationError,
}
