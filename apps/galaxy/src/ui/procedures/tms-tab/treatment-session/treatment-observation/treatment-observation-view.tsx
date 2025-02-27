import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, TextAreaInput } from '@/components'
import { QuickNoteHistory } from '@/types'
import { questionaireSections } from '../../utils'
import { QuestionaireBlock } from './blocks/questionaire-block'

const TreatmentObservation = ({ data }: { data: QuickNoteHistory[] }) => {
  return (
    <Flex direction="column" gap="1">
      <Flex align={'center'} gap={'2'}>
        <BlockLabel required className="text-2 font-[600]">
          Treatment Observation & Patient Response
        </BlockLabel>
        <FormFieldError name="treatmentAndObservation" />
      </Flex>

      <TextAreaInput
        field="treatmentAndObservation"
        className="h- h-16 w-[50%]"
      />

      {questionaireSections.map(({ title, sectionName }) => {
        const sectionData = data?.find(
          (item) => item.sectionName === sectionName,
        )

        return (
          <QuestionaireBlock
            key={sectionName}
            title={title}
            questionaireSectionName={sectionName}
            questionaireData={sectionData}
          />
        )
      })}
    </Flex>
  )
}

export { TreatmentObservation }
