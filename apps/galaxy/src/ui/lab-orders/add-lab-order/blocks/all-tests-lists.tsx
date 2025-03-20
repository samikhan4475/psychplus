import { useEffect, useState } from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { getTestLabs } from '../api'
import { LabOrderSchemaType } from '../lab-order-schema'
import { SearchField } from './search-field'
import { SearchedItem } from './searched-item'
import { TestLabsType } from './types'

const AllTestLists = ({
  onClickTestLabItem,
  isIncludeDefaultOnly = false,
}: {
  onClickTestLabItem: (value: TestLabsType) => void
  isIncludeDefaultOnly?: boolean
}) => {
  const [testLabsList, setTestLabsList] = useState<TestLabsType[]>([])
  const [loading, setLoading] = useState(false)

  const form = useFormContext<LabOrderSchemaType>()

  const selectedTestLabList = form.watch('testLabs')
  const labLocationData = form.watch('labLocationData')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getSearchedTestLabs(e.target.value)
  }

  const addLabTestCodeInData = (data: TestLabsType[]) => {
    return data?.map((item) => ({
      ...item,
      labTestCode: item.testCode,
      labTestCodeType: item.testCode,
    }))
  }

  const getLabTestApi = async ({
    payload,
  }: {
    payload?: {
      testNames?: string[]
      testCodes?: string[]
    }
  }) => {
    const result = await getTestLabs({
      ...payload,
      ...(isIncludeDefaultOnly ? { isIncludeDefaultOnly } : {}),
      consolidatorIds: [labLocationData?.consolidatorId ?? ''],
    })
    if (result.state === 'success') {
      const labTestsWithCodes = addLabTestCodeInData(result?.data ?? [])
      setTestLabsList(labTestsWithCodes)
    }
  }

  const getLimitedTestLabs = async () => {
    setLoading(true)
    await getLabTestApi({})
    setLoading(false)
  }

  const getSearchedTestLabs = useDebouncedCallback(async (value: string) => {
    setLoading(true)
    const payload = isNaN(Number(value))
      ? { testNames: [value] }
      : { testCodes: [value] }
    await getLabTestApi({ payload })
    setLoading(false)
  }, 500)

  useEffect(() => {
    if (!loading) getLimitedTestLabs()
  }, [])

  return (
    <>
      <SearchField handleChange={handleChange} />
      <Separator className="w-full" />
      <Flex direction="column" gap="2" mt="2">
        <Text className="text-pp-gray-3 text-1 font-[600]">Lab Names</Text>
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          testLabsList.length > 0 &&
          testLabsList.map((item: TestLabsType) => (
            <SearchedItem
              key={item.id}
              title={`${item?.testCode ?? ''} - ${item?.testName ?? ''}`}
              onClick={() => onClickTestLabItem(item)}
              disabled={
                selectedTestLabList &&
                selectedTestLabList.length > 0 &&
                selectedTestLabList.find(
                  (e) => e?.labTestCode === item?.labTestCode,
                ) !== undefined
              }
            />
          ))
        )}
      </Flex>
    </>
  )
}

export { AllTestLists }
