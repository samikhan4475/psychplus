import React from 'react'
import { Flex } from '@radix-ui/themes'
import { AllergyDataResponse } from '@/features/medications/types'
import AllergiesTable from '../medication/blocks/allergies-table'
import { HeadingBlock } from './blocks/heading-block'

// Comment out for phase 2
// import { useForm } from 'react-hook-form'
// import { ToggleableForm } from '@/components-v2'
// import { ToggleableFormContext } from '@/components-v2/toggleable-form/context'
// import CommentBlock from './blocks/comment-block'
// import ObservationBlock from './blocks/observation-block'
// import ReactionBlock from './blocks/reaction-block'
// import SearchBlock from './blocks/search-block'
// import SeverityBlock from './blocks/severity-block'
// import StatusBlock from './blocks/status-block'

interface AllergiesViewProps {
  allergies: AllergyDataResponse[]
}

const AllergiesView: React.FC<AllergiesViewProps> = ({ allergies }) => {
  // const form = useForm()

  return (
    <Flex
      className="bg-white rounded-[8px] border border-[#d9e2fc] px-5 pb-9 pt-7"
      gap="1"
      direction="column"
    >
      {/* <ToggleableForm
        form={form}
        submitAction={async (data) => {
          return {
            state: 'success',
          } as any
        }}
        onSuccess={(data) => {
          console.log('')
        }}
      > */}
      <HeadingBlock />
      {/* <SearchBlock />
        <Flex align={'center'} gap={'4'} className="w-full">
          <SeverityBlock />
          <StatusBlock />
        </Flex>
        <Flex align={'center'} gap={'4'} className="mb-3 w-full">
          <ReactionBlock />
          <ObservationBlock />
        </Flex> */}
      <Flex className="mt-4" direction={'column'} gap={'2'} width={'100%'}>
        <AllergiesTable allergies={allergies} />
        {/* <CommentBlock /> */}
      </Flex>
      {/* </ToggleableForm> */}
    </Flex>
  )
}

export default AllergiesView
