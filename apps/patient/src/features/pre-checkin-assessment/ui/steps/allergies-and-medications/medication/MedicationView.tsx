import React from 'react'
import { Flex } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureCard, FeatureEmpty } from '@/components-v2'
import { PatientMedication } from '@/features/medications/types/medications'
import MedicationTable from './blocks/medication-table'

// import { useForm } from 'react-hook-form'
// import { ToggleableForm } from '@/components-v2'
// import { ToggleableFormContext } from '@/components-v2/toggleable-form/context'
// import CommentBlock from './blocks/comment-block'
// import DoseBlock from './blocks/dose-block'
// import FrequencyBlock from './blocks/frequency-block'
// import PrescribedDateBlock from './blocks/prescribed-date-block'
// import RouteBlock from './blocks/route-block'
// import SearchBlock from './blocks/search-block'
// import StatusBlock from './blocks/status-block'

interface MedicationViewProps {
  medications: PatientMedication[]
}

const MedicationView = ({ medications }: MedicationViewProps) => {
  // const form = useForm()

  return (
    <FeatureCard
      title="Medications"
      contentClassName="gap-3 relative"
      showTitleInsideCard
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

      {/* <SearchBlock />
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
        </Flex>*/}
      <Flex direction={'column'} gap={'2'} width={'100%'}>
        {medications?.length === 0 ? (
          <FeatureEmpty
            description="No Medications added yet"
            Icon={EmptyFileIcon}
          />
        ) : (
          <MedicationTable medications={medications} />
        )}
        {/* <CommentBlock /> */}
      </Flex>
      {/* </ToggleableForm> */}
    </FeatureCard>
  )
}

export default MedicationView
