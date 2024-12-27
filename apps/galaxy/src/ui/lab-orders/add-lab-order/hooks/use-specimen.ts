import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { getSpecimenApi } from '../api'
import { SpecimenData } from '../blocks/types'
import { LabOrderSchemaType } from '../lab-order-schema'

const useSpecimen = () => {
  const form = useFormContext<LabOrderSchemaType>()
  const labOrderId = form.watch('labOrderId') ?? ''
  const appointmentId = useSearchParams().get('id') ?? ''

  const transformSpecimenData = (data: SpecimenData[]) => {
    const newSpecimenData = data
      .filter(
        (item) =>
          item?.labTests &&
          item?.labTests.length > 0 &&
          item?.labTests[0].recordStatus === 'Active',
      )
      .map((item) => ({
        id: item?.id ?? '',
        orderId: item?.orderId ?? '',
        collectionReceivedDateTime: item?.collectionReceivedDateTime ?? '',
        collectedOn: item?.collectedOn ?? '',
        TestId:
          item?.labTests && item?.labTests.length > 0
            ? item?.labTests[0].id
            : '',
        specimenType: item?.specimenType ?? '',
        specimenAdditives: item?.specimenAdditives ?? '',
        collectionMethod: item?.collectionMethod ?? '',
        sourceSite: item?.sourceSite ?? '',
        sourceSiteModifier: item?.sourceSiteModifier ?? '',
        role: item?.role ?? '',
        StartDate: format(
          item?.collectedOn ? new Date(item?.collectedOn) : new Date(),
          'yyyy-MM-dd',
        ),
        StartTime: item?.collectedOn
          ? format(new Date(item?.collectedOn), 'HH:mm')
          : '',
        EndDate: format(
          item?.collectionReceivedDateTime
            ? new Date(item?.collectionReceivedDateTime)
            : new Date(),
          'yyyy-MM-dd',
        ),

        EndTime: item?.collectionReceivedDateTime
          ? format(new Date(item?.collectionReceivedDateTime), 'HH:mm')
          : '',
        volume: item?.volume ?? 0,
        measureUnit: item?.measureUnit ?? '',
        rejectReason: item?.rejectReason ?? '',
        containerCondition: item?.containerCondition ?? '',
      }))
    form.setValue('specimenList', newSpecimenData)
  }

  const getSpecimenAction = async () => {
    const result = await getSpecimenApi(appointmentId, labOrderId)
    if (result.state === 'success') {
      if (result.data.length > 0) {
        transformSpecimenData(result.data)
      }
    }
  }

  useEffect(() => {
    if (labOrderId && labOrderId !== '' && appointmentId !== '') {
      getSpecimenAction()
    }
  }, [labOrderId])
}

export { useSpecimen }
