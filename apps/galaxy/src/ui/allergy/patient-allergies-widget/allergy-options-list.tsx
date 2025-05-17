import { Flex, Text } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import { useFieldArray, useWatch } from 'react-hook-form'
import { LoadingPlaceholder } from '@/components'
import { cn } from '@/utils'
import { AddAllergySchemaType } from './schema'
import { SearchAllergiesResponse } from './types'

interface AllergyOptionsListProps {
  loadingOptions: boolean
  options: SearchAllergiesResponse[]
}

const AllergyOptionsList = ({
  loadingOptions,
  options,
}: AllergyOptionsListProps) => {
  const { allergies } = useWatch<AddAllergySchemaType>()
  const { append } = useFieldArray({
    name: 'allergies',
  })

  const handleValueChange = (selectedOption: SearchAllergiesResponse) => {
    append({
      allergyName: selectedOption.picklistDesc,
      allergyId: selectedOption.picklistId,
    })
  }

  if (loadingOptions) {
    return <LoadingPlaceholder />
  }
  if (!options.length) {
    return (
      <Text weight="medium" className="text-[12px]">
        No data found
      </Text>
    )
  }

  return options.map((option) => {
    const isDisabled = allergies?.find(
      (el) => Number(el.allergyId) === option.picklistId,
    )
    return (
      <Flex
        key={option.picklistId}
        justify="between"
        align="center"
        p="1"
        onClick={() => (isDisabled ? null : handleValueChange(option))}
        className={cn(
          `hover:bg-pp-bg-accent rounded-2 ${
            isDisabled
              ? 'cursor-not-allowed opacity-30'
              : 'cursor-pointer opacity-100'
          }`,
        )}
      >
        <Text className="w-[85%] text-[11px]">{option.picklistDesc}</Text>
        <PlusCircleIcon
          stroke="#194595"
          strokeWidth="2"
          height="15"
          width="15"
        />
      </Flex>
    )
  })
}

export { AllergyOptionsList }
