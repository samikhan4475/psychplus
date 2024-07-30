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

export type { MetadataCodeset }
