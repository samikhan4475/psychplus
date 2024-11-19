import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { LabelAndValue } from '../shared'
import { LabelAndValueColumn } from './label-and-value-column'
import { getFormValue } from './utils'

const Monitoring = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const zofranAdministrated =
    data['zofranAdministrated' as keyof SpravatoWidgetSchemaType]?.toString()

  return (
    <Flex direction="column" gap="1">
      <Text className="whitespace-nowrap text-3 font-[600]">Monitoring</Text>
      <LabelAndValue
        label="On Site REM Certified Technician:"
        value={getFormValue(data, 'certifiedTechnicianName', 'Select option')}
      />
      <LabelAndValue
        label="Zofran Administered:"
        value={zofranAdministrated === 'no' ? 'No' : 'Yes'}
      />
      {zofranAdministrated === 'yes' && (
        <>
          <LabelAndValue
            label="Time:"
            value={getFormValue(data, 'zofranAdministratedTime')}
          />
          <LabelAndValue label="Dose:" value={getFormValue(data, 'dose')} />
        </>
      )}
      <LabelAndValue
        label="Time of Spravato Administration:"
        value={getFormValue(data, 'spravatoAdministrationTime')}
      />
      <LabelAndValue
        label="Time of Treatment Discharge:"
        value={getFormValue(data, 'dischargeTime')}
      />
      <LabelAndValue
        label="Total Time Monitored:"
        value={getFormValue(data, 'totalTimeMonitored')}
      />
      <LabelAndValue
        label="Was the patient clinically ready for discharge prior to the required 2 hours?"
        value={
          data[
            'isPatientDischarge' as keyof SpravatoWidgetSchemaType
          ]?.toString() === 'no'
            ? 'No'
            : 'Yes'
        }
      />
      <LabelAndValue
        label="When was the patient ready for discharge?"
        value={`[${getFormValue(
          data,
          'timeForPatientReadyForDischarge',
        )} mins] from start of administration.`}
      />
      <LabelAndValueColumn
        value={getFormValue(data, 'treatmentAndObservation')}
        label="Treatment Observation & Patient Response:"
      />
    </Flex>
  )
}

export { Monitoring }
