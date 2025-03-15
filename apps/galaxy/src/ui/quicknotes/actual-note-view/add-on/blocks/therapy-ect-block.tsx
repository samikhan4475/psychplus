'use client'

import { useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { AddOnWidgetSchemaType } from '@/ui/add-on/add-on-widget/add-on-widget-schema'
import {
  ectActualViewKeysSection1,
  ectActualViewKeysSection2,
  ectActualViewKeysSection3,
} from '@/ui/procedures/ect-tab/data'
import EctListView from '../../ect/ect-list-view'
import { BlockContainer, LabelAndValue } from '../../shared'

interface Props<T> {
  data: T
}

const TherapyECTBlock = ({ data }: Props<AddOnWidgetSchemaType>) => {
  const codes = useCodesetCodes(CODESETS.ProviderType)
  const anesthesiologistCodes = codes.reduce(
    (acc, code) => ({ ...acc, [code.value]: code.display }),
    {} as Record<string, string>,
  )

  const seriesMaintenanceBlock = useMemo(
    () =>
      data?.seriesMaintenance === 'series'
        ? {
            label: 'Series:',
            key: 'series',
          }
        : {
            label: 'Maintenance:',
            key: 'maintenance',
          },
    [data?.seriesMaintenance],
  )
  const settings = useMemo(
    () => ({
      ...data,
      ectSettingBlockPw: data?.ectSettingBlockPw
        ? `${data?.ectSettingBlockPw?.substring(
            0,
            2,
          )}.${data?.ectSettingBlockPw?.substring(2)}`
        : '',
    }),
    [data],
  )

  if (!data.ect) return null
  return (
    <BlockContainer heading="ECT">
      <Flex direction="column" gap="3">
        <EctListView
          keys={[seriesMaintenanceBlock, ...ectActualViewKeysSection1]}
          data={data}
          anesthesiologistCodes={anesthesiologistCodes}
        />
        <EctListView
          label="Settings:"
          keys={ectActualViewKeysSection2}
          data={settings}
        />
        <EctListView keys={ectActualViewKeysSection3} data={data} />
        <Flex direction="column">
          <Text className="whitespace-nowrap text-1 font-medium">Plan:</Text>
          <LabelAndValue
            label="Continue ECT:"
            value={data?.ectContinuePBlock}
          />
        </Flex>
      </Flex>
    </BlockContainer>
  )
}

export { TherapyECTBlock }
