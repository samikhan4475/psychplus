import { EditLabOrderWidgetServer } from '@/widgets/add-lab-orders-notes';
import { SearchParams } from '@psychplus/utils/url';
import { Text } from '@radix-ui/themes';

const EditLabOrderListWidgetPage = ({ searchParams }: { searchParams: SearchParams }) => {
  
  if (!searchParams.appointmentId ) {
    return <Text>Appointment ID is required</Text>;
  }
  if (!searchParams.orderId ) {
    return <Text>OrderId is required</Text>;
  }
  if (!searchParams.patientId ) {
    return <Text>PatientId is required</Text>;
  }


  return (
    <EditLabOrderWidgetServer 
      orderId={searchParams.orderId} 
      patientId={searchParams.patientId}
      appointmentId={searchParams.appointmentId} 
    />
  );
};

export default EditLabOrderListWidgetPage;
