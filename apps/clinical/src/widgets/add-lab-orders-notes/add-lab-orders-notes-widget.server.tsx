import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import {
  fetchSearchPills,
  getLabOrders,
  getSpecimen,
} from '@psychplus/lab-orders/api.server'
import { EditLabOrderWidgetClient } from './add-lab-orders-notes-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const EditLabOrderWidgetServer = async ({
  appointmentId,
  orderId,
  patientId,
}: {
  appointmentId: string
  orderId: string
  patientId: string
}) => {
  noStore()
  const [codeSets, tests, labOrders, resultFlags, resultStatus, resultUnits] =
    await Promise.all([
      getCodeSets(),
      fetchSearchPills({}),
      getLabOrders(appointmentId, { idList: [orderId] }),
      getSpecimen('HL7v2', 'AbnormalFlags'),
      getSpecimen('HL7v2', 'ObservationResultStatusCodes'),
      getSpecimen('CDC', 'PHVS_UnitofMeasure_TB'),
    ])

  const testsData = tests.map((item) => {
    const labTestCode = item?.testCode
    const labTestCodeType = item?.testCode
    delete item?.testCode
    return { ...item, labTestCode, labTestCodeType }
  })
  return (
    <>
      <Preloader
        store={useStore}
        codeSets={codeSets}
        tests={testsData}
        labOrders={labOrders}
        resultFlags={resultFlags.codes || []}
        resultStatus={resultStatus.codes || []}
        resultUnits={resultUnits.codes || []}
      />
      <EditLabOrderWidgetClient
        appointmentId={appointmentId}
        orderId={orderId}
        patientId={patientId}
      />
    </>
  )
}

export { EditLabOrderWidgetServer }
