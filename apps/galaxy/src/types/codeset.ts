interface Codeset {
  codeSystemName: string
  displayName: string
  codes: Code[]
}

interface Code {
  code: string
  displayName: string
  codeAttributes?: CodeAttribute[]
  groupingCode?: string
  attributes?:CodeAttribute[]
}

interface CodeAttribute {
  name: string
  content: string
}

interface SharedCodeset {
  name: string
  display: string
  codes: SharedCode[]
}

interface SharedCode {
  value: string
  display: string
  attributes?: SharedCodeAttribute[]
  groupingCode?: string
}

interface SharedCodeAttribute {
  name: string
  value: string
}

interface MetadataCodeset {
  code: string
  display: string
  codes: MetadataCode[]
}

interface MetadataCode {
  code: string
  display: string
  attributes?: MetadataCodeAttribute[]
  groupingCode?: string
}

interface MetadataCodeAttribute {
  name: string
  value: string
}

interface POSCodeSets {
  codeSystemName: string
  displayName: string
  codes: Code[]
}

type CodesetCache = Record<string, SharedCodeset>

interface AuthorityCodesetResponse {
  namespace: string             
  displayName: string           
  codesets: Codeset[]           
}

export type {
  Codeset,
  Code,
  SharedCodeset,
  SharedCode,
  MetadataCodeset,
  CodesetCache,
  POSCodeSets,
  SharedCodeAttribute,
  AuthorityCodesetResponse
}
