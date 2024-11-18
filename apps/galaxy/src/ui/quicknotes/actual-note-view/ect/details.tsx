import { Flex, Separator, Text } from '@radix-ui/themes'
import {
  ectActualViewKeysSection1,
  ectActualViewKeysSection2,
  ectActualViewKeysSection3,
} from '@/ui/procedures/ect-tab/data'
import { EctWidgetSchemaType } from '@/ui/procedures/ect-tab/ect-tab-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import EctListView from './ect-list-view'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<EctWidgetSchemaType>) => {
  return (
    <BlockContainer heading="ECT">
      <LabelAndValue label="Title:" value="Psychiatric Evaluation" />
      <LabelAndValue label="Visit Type:" value="Outpatient Office Visit" />
      <LabelAndValue label="Provider Type:" value="Therapy" />
      <LabelAndValue label="Provider:" value="John Smith, MD" />
      <LabelAndValue label="Location:" value="Willow Brooks" />
      <LabelAndValue label="Service:" value="Willow Brooks" />
      <LabelAndValue label="Date:" value="11/22/24" />
      <LabelAndValue label="Duration:" value="20 mins" />
      <LabelAndValue label="Patient:" value="Ross Galler" />
      <LabelAndValue label="DOB:" value="11/21/2024" />
      <LabelAndValue label="Cosigner:" value="John Smith, MD" />
      <LabelAndValue label="Visit #:" value="0000198" />
      <Separator className="my-3 w-full" />
      <Flex direction="column" gap="3">
        <EctListView keys={ectActualViewKeysSection1} data={data} />
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
  )
}

export { Details }
