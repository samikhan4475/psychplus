import { LabOrderWidgetServer } from '@/widgets/lab-order/lab-order-widget.server'
import { SearchParams } from '@psychplus/utils/url'
import { Text } from '@radix-ui/themes'

const LabOrderWidgetPage = ({searchParams}: {
  searchParams: SearchParams
}) => {
  
    if (!searchParams.appointmentId) {
      return <Text>Appointment ID  is required</Text>
    }
    if (!searchParams.patientId) {
      return <Text>Patient ID is required</Text>
    }
  
  return <LabOrderWidgetServer patientId={searchParams.patientId} appointmentId={searchParams.appointmentId}/>
}

export default LabOrderWidgetPage
