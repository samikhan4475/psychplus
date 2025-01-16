'use client'

import React from 'react'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { AddOnWidgetSchemaType } from '@/ui/add-on/add-on-widget/add-on-widget-schema'
import { codesetAttributesOptions } from '@/utils'
import { LabelAndValue } from '../../shared'

const InjectionDetails = ({ data }: { data: AddOnWidgetSchemaType }) => {
  const injectionAddonCodeset = useCodesetCodes(CODESETS.InjectionAddon)
  const injectionSiteCodeset = useCodesetCodes(CODESETS.InjectionSite)
  if (!data.injection) return null

  const injectionSiteOptions = injectionSiteCodeset.map(
    ({ display, value }) => ({
      label: display,
      value: value,
    }),
  )

  const selectedDrugDetail = injectionAddonCodeset.find(
    (item) => item.value === data.drugName,
  )

  const dosesList = codesetAttributesOptions({
    attribute: 'Doses',
    splitter: '|',
    codeset: selectedDrugDetail,
  })

  const manufacturersList = codesetAttributesOptions({
    attribute: 'Manufacturer',
    splitter: '|',
    codeset: selectedDrugDetail,
  })

  const drusName = selectedDrugDetail?.display
  const dose = dosesList?.find((item) => item.value === data.dose)?.label
  const siteLocations = injectionSiteOptions?.find(
    (item) => item.value === data.siteLocations,
  )?.label
  const manufacturer = manufacturersList?.find(
    (item) => item.value === data.manufacturer,
  )?.label

  return (
    <LabelAndValue
      label="Injection"
      value={[
        drusName,
        dose,
        siteLocations,
        manufacturer,
        data.lotNumber,
        data.expirationDate,
      ]
        .filter(Boolean)
        .join(' | ')}
    />
  )
}

export { InjectionDetails }
