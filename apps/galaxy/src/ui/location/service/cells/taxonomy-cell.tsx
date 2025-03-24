'use client'

import React from 'react'
import { LongTextCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Service } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const TaxonomyCell = ({ row: { original } }: PropsWithRow<Service>) => {
  const codes = useCodesetCodes(CODESETS.ProviderTaxonomy)
  return (
    <LongTextCell className="min-w-32 max-w-36">
      {getCodesetDisplayName(original.taxonomy, codes)}
    </LongTextCell>
  )
}

export { TaxonomyCell }
