import { useStore as useGlobalStore } from '@/store';
import { Flex } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { useStore } from '../store';
import { TemplateSelect } from '../template-select';
import { CODE_PARAM_ATTRIBUTES, STAFF_SELECTION } from '../types';
import { DurationSelection } from './duration-selection';

const ScheduleParameters = () => {
  const { selectedTemplate, staffData, insuranceData, patientData, cosignerData, templateFilters } = useStore();
  const codesets = useGlobalStore((state) => state.codesets);
  const codeParametersType = templateFilters?.codes || [];
  const form = useFormContext()
  const { register } = form;

  const getDropdownFields = (code: string) => {
    const codeParam = codeParametersType.find((param) => param.code === code);

    if (!codeParam) return { isSelect: false, isMultiple: false };

    let isSelect = false;
    let isMultiple = false;

    codeParam.codeAttributes.forEach((attribute) => {
      if (attribute.name === CODE_PARAM_ATTRIBUTES.SELECTION) {
        isSelect = true;
        isMultiple = attribute.content === "MULTIPLE";
      }
    });

    return { isSelect, isMultiple };
  };

  const computeOptions = (codesetIndex: any, reportParameterCode: string) => {
    let matchingCodeset;

    if (reportParameterCode === STAFF_SELECTION.STAFF_SELECTION_SPECIALIST_TYPE || reportParameterCode === 'SpecialistTypeList') {
      matchingCodeset = codesetIndex[STAFF_SELECTION.SPECIALIST_TYPE];
    } else {
      matchingCodeset = codesetIndex[reportParameterCode];
    }

    if (!matchingCodeset?.codes && reportParameterCode !== 'StaffSelectionList' && reportParameterCode !== 'StaffList' && reportParameterCode !== 'InsuranceList' && reportParameterCode !== 'PatientList' &&
      reportParameterCode !== 'CosignerList') {
      return [];
    }

    switch (reportParameterCode) {
      case 'StaffSelectionList':
      case 'StaffList':
        return staffData;
      case 'InsuranceList':
        return insuranceData;
      case 'PatientList':
        return patientData;
      case 'CosignerList':
        return cosignerData;
      default:
        return matchingCodeset.codes.map((code: { value: string; display: string }) => ({
          value: code.value,
          label: code.display,
        }));
    }
  };
  return (
    <Flex direction="row" align="start" className="flex-wrap gap-0.5 py-2">
      {selectedTemplate?.parameters?.map((param, i) => {
        const { isSelect, isMultiple } = getDropdownFields(param.parameterCode);
        return (
          <Flex key={param.id} direction="row" className="gap-x-1">
            {isSelect && (
              <TemplateSelect
                title={param.displayName}
                isMultiple={isMultiple}
                options={computeOptions(codesets, param.parameterCode)}
                {...register(`parameters.${i}.scheduleParameterValue`, { required: 'This field is required' })}
              />
            )}
          </Flex>
        );
      })}
      <DurationSelection  />
    </Flex>
  );
};

export default ScheduleParameters;
