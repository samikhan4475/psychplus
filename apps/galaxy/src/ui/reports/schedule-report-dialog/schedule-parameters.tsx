import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore as useGlobalStore } from '@/store'
import { useStore } from '../store'
import { TemplateCosignerSelect } from '../template-cosigner-select'
import { TemplateInsuranceSelect } from '../template-insurance-select'
import { TemplateLocationSelect } from '../template-location-select'
import { TemplatePatientSelect } from '../template-patients-select'
import { TemplateProviderSelect } from '../template-provider-select'
import { TemplateSelect } from '../template-select'
import { TemplateStaffSelect } from '../template-staff-select'
import { TemplateStateSelect } from '../template-state-select'
import {
  CODE_PARAM_ATTRIBUTES,
  STAFF_SELECTION,
  TemplateParameter,
} from '../types'
import { DurationSelection } from './duration-selection'

const ScheduleParameters = () => {
  const { selectedTemplate, templateFilters } = useStore()
  const codesets = useGlobalStore((state) => state.codesets)
  const codeParametersType = templateFilters?.codes || []
  const form = useFormContext()
  const { register } = form
  const reportTemplateFilters: TemplateParameter[] =
    selectedTemplate?.parameters || []
  const sortedParameters: TemplateParameter[] = [...reportTemplateFilters].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  )

  const getDropdownFields = (code: string) => {
    const codeParam = codeParametersType.find((param) => param.code === code)

    if (!codeParam) return { isSelect: false, isMultiple: false }

    let isSelect = false
    let isMultiple = false

    codeParam.codeAttributes.forEach((attribute) => {
      if (attribute.name === CODE_PARAM_ATTRIBUTES.SELECTION) {
        isSelect = true
        isMultiple = attribute.content === 'MULTIPLE'
      }
    })

    return { isSelect, isMultiple }
  }

  const computeOptions = (codesetIndex: any, reportParameterCode: string) => {
    let matchingCodeset

    if (
      reportParameterCode === STAFF_SELECTION.STAFF_SELECTION_SPECIALIST_TYPE ||
      reportParameterCode === 'SpecialistTypeList'
    ) {
      matchingCodeset = codesetIndex[STAFF_SELECTION.SPECIALIST_TYPE]
    } else {
      matchingCodeset = codesetIndex[reportParameterCode]
    }

    if (
      !matchingCodeset?.codes &&
      reportParameterCode !== 'StaffSelectionList' &&
      reportParameterCode !== 'StaffList' &&
      reportParameterCode !== 'InsuranceList' &&
      reportParameterCode !== 'PatientList' &&
      reportParameterCode !== 'CosignerList'
    ) {
      return []
    }

    switch (reportParameterCode) {
      case 'StaffSelectionList':
      case 'StaffList':
        return []
      case 'InsuranceList':
        return []
      case 'PatientList':
        return []
      case 'CosignerList':
        return []
      default:
        return matchingCodeset.codes.map(
          (code: { value: string; display: string }) => ({
            value: code.value,
            label: code.display,
          }),
        )
    }
  }
  return (
    <Flex direction="row" align="start" className="flex-wrap gap-0.5 py-2">
      {sortedParameters?.map((param, i) => {
        const { isSelect, isMultiple } = getDropdownFields(param.parameterCode)
        return (
          <Flex key={param.id} direction="row" className="gap-x-1">
            {isSelect && param.parameterCode === 'StaffList' && (
              <TemplateStaffSelect
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'PatientList' && (
              <TemplatePatientSelect
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'CosignerList' && (
              <TemplateCosignerSelect
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'InsuranceList' && (
              <TemplateInsuranceSelect
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'LocationList' && (
              <TemplateLocationSelect
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'StateList' && (
              <TemplateStateSelect
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'ProviderList' && (
              <TemplateProviderSelect
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect &&
              param.parameterCode !== 'StaffList' &&
              param.parameterCode !== 'PatientList' &&
              param.parameterCode !== 'CosignerList' &&
              param.parameterCode !== 'InsuranceList' &&
              param.parameterCode !== 'LocationList' &&
              param.parameterCode !== 'StateList' &&
              param.parameterCode !== 'ProviderList' && (
                <TemplateSelect
                  title={param.displayName}
                  isMultiple={isMultiple}
                  options={computeOptions(codesets, param.parameterCode)}
                  {...register(`parameters.${i}.scheduleParameterValue`, {
                    required: 'This field is required',
                  })}
                />
              )}
          </Flex>
        )
      })}
      <DurationSelection />
    </Flex>
  )
}

export default ScheduleParameters
