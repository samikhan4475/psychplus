import React from 'react'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { ToggleableForm } from '@/components-v2'
import { ToggleableFormContext } from '@/components-v2/toggleable-form/context'
import MedicationTable from '../medication/blocks/medication-table'
import CommentBlock from './blocks/comment-block'
import { HeadingBlock } from './blocks/heading-block'
import ObservationBlock from './blocks/observation-block'
import ReactionBlock from './blocks/reaction-block'
import SearchBlock from './blocks/search-block'
import SeverityBlock from './blocks/severity-block'
import StatusBlock from './blocks/status-block'

const AllergiesView = () => {
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
          <SeverityBlock />
          <StatusBlock />
        </Flex>
        <Flex align={'center'} gap={'4'} className="mb-3 w-full">
          <ReactionBlock />
          <ObservationBlock />
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

export default AllergiesView
