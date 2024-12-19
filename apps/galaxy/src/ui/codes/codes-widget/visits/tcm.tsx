import { useEffect, useState } from 'react';
import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks';
import { VisitProps } from '../types';
import { useFormContext } from 'react-hook-form';
import { CodesWidgetSchemaType } from '../codes-widget-schema';
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail';
import { QuickNoteSectionName } from '@/ui/quicknotes/constants';
import { transformIn } from '@/ui/assessment-plan/tcm-widget/data';
import { SelectOptionType } from '@/types';

const Tcm = ({
  cptAddOnsCodes,
  cptPrimaryCodes,
  cptmodifierCodes,
  appointment,
  patientId,
}: VisitProps) => {
  const [updatedPrimaryCodes, setUpdatedPrimaryCodes] = useState([...cptPrimaryCodes]);
  const form = useFormContext<CodesWidgetSchemaType>()
  const formValues = form.getValues()
  const handleTCMCodes =  async() => {
    const disableCode = (code: SelectOptionType, disabled: boolean) => ({ ...code, disabled });
    const response = await getQuickNoteDetailAction(patientId, [
     QuickNoteSectionName.QuicknoteSectionTcm,
    appointment.appointmentId+"",
    ])
   
    const updatedCodes = cptPrimaryCodes.map((code) => {
      const isSpecificCode = code.value === '99496' || code.value === '99495';
      if (isSpecificCode) {
        return disableCode(code, true);
      }
      if (response.state === 'success') {
        const data = transformIn(response?.data);
        const hasHospitalDetails = data.dcHospitalName !== "" && data.dcHospitalServiceType !== "";
        const hasPrimaryCodes = formValues.cptPrimaryCodes.length > 0;
        if (hasHospitalDetails && hasPrimaryCodes) {
          return disableCode(code, true);
        }
      }
      return disableCode(code, false);
    });
    setUpdatedPrimaryCodes(updatedCodes);
  }

  useEffect(() => {
    handleTCMCodes()
  }, [appointment, patientId, cptPrimaryCodes]);

  return (
    <>
      <PrimaryCodeTable codes={updatedPrimaryCodes}  />
      <ModifierTable codes={cptmodifierCodes} isDisabled />
      <AddonsTable codes={cptAddOnsCodes} isDisabled />
    </>
  );
};

export { Tcm };
