import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  Flex,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { LoadingPlaceholder } from '@/components'
import { LabOrderSchemaType } from '../lab-order-schema'
import { SearchedItem } from './searched-item'
import { DiagnosisType } from './types'

const AddDiagnosisDropDown = ({
  getSearchedDiagnosis,
  diagnosisList,
  onClickDiagnosisItem,
  loading,
  isFormDisabled,
}: {
  diagnosisList: DiagnosisType[]
  getSearchedDiagnosis: (value: string) => void
  onClickDiagnosisItem: (value: DiagnosisType) => void
  loading: boolean
  isFormDisabled: boolean
}) => {
  const form = useFormContext<LabOrderSchemaType>()

  const selectedDiagnosisList = form.watch('diagnosis')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getSearchedDiagnosis(e.target.value)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={isFormDisabled}>
        <PlusIcon className="cursor-pointer" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-[386px]">
        <Flex
          align="center"
          className="bg-white relative h-[48px] w-[100%] rounded-2"
        >
          <MagnifyingGlassIcon
            className="text-pp-gray-3 absolute left-2 "
            width="18px"
            height="18px"
          />
          <TextField.Root
            size="1"
            placeholder="Search"
            className="w-full pl-6"
            onChange={handleChange}
          />
        </Flex>

        <Separator className="w-full" />
        <Flex direction="column" gap="2" mt="2">
          <Text className="text-pp-gray-3 text-1 font-[600]">
            Diagnosis Names
          </Text>

          {loading ? (
            <LoadingPlaceholder />
          ) : (
            diagnosisList.length > 0 &&
            diagnosisList.map((item: DiagnosisType) => (
              <SearchedItem
                key={item.id}
                title={`${item?.code ?? ''} - ${item?.description ?? ''}`}
                onClick={() => onClickDiagnosisItem(item)}
                disabled={
                  selectedDiagnosisList &&
                  selectedDiagnosisList.length > 0 &&
                  selectedDiagnosisList.find((e) => e.id === item.id) !==
                    undefined
                }
              />
            ))
          )}
        </Flex>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { AddDiagnosisDropDown }
