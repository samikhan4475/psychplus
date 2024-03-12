interface CodeSet {
  code: string
  display: string
  source: string
  codes: Code[]
}

interface Code {
  code: string
  display: string
  attributes?: CodeAttribute[]
  metadata?: CodeMetadata
}

interface CodeAttribute {
  name: string
  value: string
}

interface CodeMetadata {
  [key: string]: string | undefined
}

interface AuthorityCode {
  code: string
  codeSetId: string
  displayName: string
  id: string
  metadata: CodeMetadata
  recordStatus: string
}

interface AuthorityCodeSet {
  assigningAuthorityId: string
  codeSystemName: string
  codes: AuthorityCode[]
  displayName: string
  metadata: CodeMetadata
  recordStatus: string
}

type CodeSetIndex = { [key: string]: Code[] | undefined }

export type {
  CodeSet,
  Code,
  CodeAttribute,
  CodeSetIndex,
  AuthorityCodeSet,
  AuthorityCode,
}
