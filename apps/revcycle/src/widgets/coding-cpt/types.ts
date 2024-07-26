interface MetaDataCodeSet {
  code: string
  display: string
}
interface Code {
  code: string
  displayName: string
  codeAttributes?: CodeAttribute[]
}
interface CodeAttribute {
  name: string
  content: string
}

interface POSCodeSets {
  codeSystemName: string
  displayName: string
  codes: Code[]
}
interface CPTCategoryCodeSets {
  code: string
  codes: MetaDataCodeSet[]
  display: string
}
interface SearchCPT {
  macLocality?: string
  hcpcsCodes?: string
  cptCode?: string
  placeOfService?: string
  description?: string
  category?: string
  requirement?: string
  gender?: string
  minimumAge?: string
  maximumAge?: string
  resourceStatusList?: string[]
  id?: string
}
export type {
  MetaDataCodeSet,
  POSCodeSets,
  Code,
  SearchCPT,
  CPTCategoryCodeSets,
}
