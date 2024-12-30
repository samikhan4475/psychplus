import React from 'react'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { ToggleableForm } from '@/components-v2'
import { ToggleableFormContext } from '@/components-v2/toggleable-form/context'
import CommentBlock from './blocks/comment-block'
import DoseBlock from './blocks/dose-block'
import FrequencyBlock from './blocks/frequency-block'
import { HeadingBlock } from './blocks/heading-block'
import PrescribedDateBlock from './blocks/prescribed-date-block'
import RouteBlock from './blocks/route-block'
import SearchBlock from './blocks/search-block'
import StatusBlock from './blocks/status-block'
import MedicationTable from './blocks/medication-table'

const MedicationView = () => {
  const form = useForm()

  return (
    <Flex
      className="bg-white rounded-[8px] border border-[#d9e2fc] px-5 pb-9 pt-7"
      gap="1"
      direction="column"
    >
      <ToggleableForm
        form={form}
        submitAction={async (data) => {
          return {
            state: 'success',
          } as any
        }}
        onSuccess={(data) => {
          console.log('')
        }}
      >
        <HeadingBlock />
        <SearchBlock />
        <Flex align={'center'} gap={'4'} className="w-full">
          <DoseBlock />
          <StatusBlock />
        </Flex>
        <Flex align={'center'} gap={'4'} className="w-full">
          <FrequencyBlock />
          <RouteBlock />
        </Flex>
        <Flex className="mb-3 w-full">
          <PrescribedDateBlock />
        </Flex>
      </ToggleableForm>
      <ToggleableFormContext.Provider value={undefined}>
        <Flex className="mt-10" direction={'column'} gap={'2'}>
          <MedicationTable />
          <CommentBlock />
        </Flex>
      </ToggleableFormContext.Provider>
    </Flex>
  )
}

export default MedicationView
