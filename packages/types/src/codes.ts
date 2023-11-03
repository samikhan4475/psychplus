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
}

interface CodeAttribute {
  name: string
  value: string
}

export type { CodeSet, Code, CodeAttribute }
