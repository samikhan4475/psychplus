import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { getTestLabs } from '../api'
import { TestLabsType } from '../blocks/types'
import { LabOrderSchemaType } from '../lab-order-schema'

export default () => {
  const form = useFormContext<LabOrderSchemaType>()
  const selectedTestLabList = form.watch('testLabs') ?? []

  const onClickDelete = (index: number) => {
    const newSelectedTestLabList = [...selectedTestLabList]
    newSelectedTestLabList.splice(index, 1)
    form.setValue('testLabs', [...newSelectedTestLabList])
  }

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

        const newTestLabsData = result?.data?.map((item: TestLabsType) => {
          const { id, ...rest } = item
          return {
            id: labTestAnswersIds[item?.testCode ?? ''].id ?? '',
            ...rest,
            labTestAnswers:
              labTestAnswersIds[item?.testCode ?? ''].labTestAnswers ?? {},
            labTestCode: item.testCode,
            labTestCodeType: item.testCode,
          }
        })
        form.setValue('testLabs', [...removedTestLabs, ...newTestLabsData])
      }
    }
  }

  useEffect(() => {
    if (selectedTestLabList.length > 0) getUpdatedSelectedTestLabList()
  }, [])

  return {
    selectedTestLabList,
    onClickTestLabItem,
    onClickDelete,
  }
}
