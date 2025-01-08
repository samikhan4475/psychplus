'use client'

import { Flex, Text } from '@radix-ui/themes'
import {
  ectActualViewKeysSection1,
  ectActualViewKeysSection2,
  ectActualViewKeysSection3,
} from '@/ui/procedures/ect-tab/data'
import { EctWidgetSchemaType } from '@/ui/procedures/ect-tab/ect-tab-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import EctListView from './ect-list-view'
import { useCodesetCodes } from '@/hooks'
import { CODESETS } from '@/constants'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<EctWidgetSchemaType>) => {
  const codes = useCodesetCodes(CODESETS.ProviderType);
  const anesthesiologistCodes = codes.reduce(
    (acc, code) => ({ ...acc, [code.value]: code.display }),
    {} as Record<string, string>
  );

  return (
    <BlockContainer heading="ECT">
      <Flex direction="column" gap="3">
        <EctListView keys={ectActualViewKeysSection1} data={data} anesthesiologistCodes={anesthesiologistCodes} />
        <EctListView
          label="Settings:"
          keys={ectActualViewKeysSection2}
          data={{
            ...data,
            ectSettingBlockPw: data.ectSettingBlockPw
              ? `${data.ectSettingBlockPw.substring(
                  0,
                  2,
                )}.${data.ectSettingBlockPw.substring(2)}`
              : '',
          }}
        />
        <EctListView keys={ectActualViewKeysSection3} data={data} />
        <Flex direction="column">
          <Text className="whitespace-nowrap text-1 font-medium">Plan:</Text>
          <LabelAndValue label="Continue ECT:" value={data.ectContinuePBlock} />
        </Flex>
      </Flex>
    </BlockContainer>
  );
};

export { Details }
