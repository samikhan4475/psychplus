import { Metadata } from './metadata'

interface TaxonomyAttributes {
  name: string
  value: string
}

interface Taxonomy {
  code: string
  display: string
  metadata: Metadata
  attributes: TaxonomyAttributes[]
}

export type { Taxonomy, TaxonomyAttributes }
