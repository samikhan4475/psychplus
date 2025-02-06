import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { formatDate } from '@/utils'
import { LabelAndValue } from '../shared'
import { LabelAndValueColumn } from './label-and-value-column'
import { convertToDate, getFormValue } from './utils'

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
            value={formatDate(
              convertToDate(getFormValue(data, 'zofranAdministratedTime')),
              'HH:mm',
            )}
          />
          <LabelAndValue label="Dose:" value={getFormValue(data, 'dose')} />
        </>
      )}
      <LabelAndValue
        label="Time of Spravato Administration:"
        value={formatDate(
          convertToDate(getFormValue(data, 'spravatoAdministrationTime')),
          'HH:mm',
        )}
      />
      <LabelAndValue
        label="Time of Treatment Discharge:"
        value={formatDate(
          convertToDate(getFormValue(data, 'dischargeTime')),
          'HH:mm',
        )}
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
