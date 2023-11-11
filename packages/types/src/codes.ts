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

export type { CodeSet, Code, CodeAttribute }
