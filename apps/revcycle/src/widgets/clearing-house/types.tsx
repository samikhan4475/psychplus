interface Code {
  code: string
  displayName: string
  groupingCode?: string
  codeAttributes?: CodeAttribute[]
}

interface CodeAttribute {
  name: string
  content: string
}

interface RaceAndEthnicityCodeSet {
  codeSystemName: string
  displayName: string
  codes: Code[]
}

interface StatesOption {
  label: string
  value: string
}

export type { RaceAndEthnicityCodeSet, StatesOption }
