interface Attribute {
  name: string
  content: string
}
interface MetaDataCodeSet {
  code: string
  display: string
  attributes?: Attribute[]
}

export type { MetaDataCodeSet, Attribute }
