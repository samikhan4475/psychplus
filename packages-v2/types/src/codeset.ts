interface Codeset {
  codeSystemName: string
  displayName: string
  codes: Code[]
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

export type { Codeset, Code }
