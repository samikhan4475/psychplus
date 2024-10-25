import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import {
  fetchSearchPills,
  getLabOrders,
  getSpecimen,
} from '@psychplus/lab-orders/api.server'
import { OrderParams } from '@psychplus/lab-orders/types'
import { LabOrderpayload } from './constants'
import { LabOrderWidgetClient } from './lab-order-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const LabOrderWidgetServer = async ({
  appointmentId,
  patientId,
}: OrderParams) => {
  noStore()

  const [codeSets, tests, labOrders, resultFlags, resultStatus] =
    await Promise.all([
      getCodeSets(),
      fetchSearchPills({}),
      getLabOrders(
        appointmentId,
        LabOrderpayload([parseInt(appointmentId)], [parseInt(patientId)]),
      ),
      getSpecimen('HL7v2', 'AbnormalFlags'),
      getSpecimen('HL7v2', 'ObservationResultStatusCodes'),
    ])
  const testsData = tests?.map((item) => {
    const labTestCode = item?.testCode
    const labTestCodeType = item?.testCode
    delete item?.testCode
    return { ...item, labTestCode, labTestCodeType }
  })
  return (
    <>
      <Preloader
        store={useStore}
        tests={testsData}
        resultFlags={resultFlags.codes || []}
        resultStatus={resultStatus.codes || []}
        codeSets={codeSets}
        labOrders={labOrders}
      />
      <LabOrderWidgetClient
        patientId={patientId}
        appointmentId={appointmentId}
      />
    </>
  )
}

export { LabOrderWidgetServer }
