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

type CodesetCache = Record<string, SharedCodeset>

export type { SharedCodeset, CodesetCache }
