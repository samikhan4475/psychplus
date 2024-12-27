import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { getTestLabs } from '../api'
import { TestLabsType } from '../blocks/types'
import { LabOrderSchemaType } from '../lab-order-schema'

export default () => {
  const [testLabsList, setTestLabsList] = useState<TestLabsType[]>([])
  const [loading, setLoading] = useState(false)

  const form = useFormContext<LabOrderSchemaType>()
  const selectedTestLabList = form.watch('testLabs') ?? []

  const onClickDelete = (index: number) => {
    const newSelectedTestLabList = [...selectedTestLabList]
    newSelectedTestLabList.splice(index, 1)
    form.setValue('testLabs', [...newSelectedTestLabList])
  }

  const addLabTestCodeInData = (data: TestLabsType[]) => {
    return data?.map((item) => ({
      ...item,
      labTestCode: item.testCode,
      labTestCodeType: item.testCode,
    }))
  }

  const setTestLabs = (data: TestLabsType[]) => {
    const newTestLabsData = addLabTestCodeInData(data)
    setTestLabsList(newTestLabsData ?? [])
  }

  const getSearchedTestLabs = useDebouncedCallback(async (value: string) => {
    if (value === '') return
    setLoading(true)
    const payload = isNaN(Number(value))
      ? { testNames: [value] }
      : { testCodes: [value] }
    const result = await getTestLabs(payload)
    if (result.state === 'success') {
      setTestLabs(result?.data ?? [])
    }
    setLoading(false)
  }, 500)

  const onClickTestLabItem = (testlab: TestLabsType) => {
    const newSelectedTestLabs: any = [...selectedTestLabList]
    newSelectedTestLabs.push({ ...testlab, isNewTestLab: true })
    form.setValue('testLabs', newSelectedTestLabs)
  }

  const getUpdatedSelectedTestLabList = async () => {
    const labTestWithAnswers = selectedTestLabList.filter(
      (item) => item.labTestAnswers && item.labTestAnswers?.length > 0,
    )

    const indexes = labTestWithAnswers.map((item) =>
      selectedTestLabList.findIndex((e) => e.id === item.id),
    )

    if (labTestWithAnswers.length > 0) {
      let labTestAnswersIds: any = {}
      labTestWithAnswers.forEach((item) => {
        if (item.labTestCode) {
          labTestAnswersIds = {
            ...labTestAnswersIds,
            [item.labTestCode]: {
              id: item.id,
              labTestAnswers: item.labTestAnswers,
            },
          }
        }
      })

      const result = await getTestLabs({
        testCodes: Object.keys(labTestAnswersIds),
      })

      if (result.state === 'success') {
        const removedTestLabs = [...selectedTestLabList]
        indexes.forEach((item) => removedTestLabs.splice(item, 1))

        const newTestLabsData: any = result?.data?.map((item: any) => {
          const { id, ...rest } = item
          return {
            id: labTestAnswersIds[item.testCode].id ?? '',
            ...rest,
            labTestAnswers:
              labTestAnswersIds[item.testCode].labTestAnswers ?? {},
            labTestCode: item.testCode,
            labTestCodeType: item.testCode,
          }
        })
        form.setValue('testLabs', [...removedTestLabs, ...newTestLabsData])
      }
    }
  }

  const getLimitedTestLabs = async () => {
    setLoading(true)
    const result = await getTestLabs({}, 10)
    if (result.state === 'success') {
      setTestLabs(result?.data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (selectedTestLabList.length > 0) getUpdatedSelectedTestLabList()
    if (testLabsList.length === 0) getLimitedTestLabs()
  }, [])

  return {
    getSearchedTestLabs,
    testLabsList,
    selectedTestLabList,
    onClickTestLabItem,
    onClickDelete,
    loading,
  }
}
