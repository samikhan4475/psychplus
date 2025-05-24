import { Flex, Grid } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore as useGlobalStore } from '@/store'
import { useStore } from '../store'
import { TemplateCosignerSelect } from '../template-cosigner-select'
import { TemplateFilterDatePicker } from '../template-filter-datepicker'
import { TemplateFilterInput } from '../template-filter-input'
import { TemplateInsuranceSelect } from '../template-insurance-select'
import { TemplateLocationSelect } from '../template-location-select'
import { TemplatePatientSelect } from '../template-patients-select'
import { TemplateProviderSelect } from '../template-provider-select'
import { TemplateSelect } from '../template-select'
import { TemplateStaffSelect } from '../template-staff-select'
import { TemplateStateSelect } from '../template-state-select'
import {
  CODE_PARAM_ATTRIBUTES,
  CodeType,
  REPORT_PARAMETER_CODE,
  STAFF_SELECTION,
  TemplateParameter,
} from '../types'
import { matchesAnyReport } from '../utils'
import { excludedParams } from './constants'
import { ScheduleTemplateSchemaType } from './schedule-report-form'

const ScheduleParameters = () => {
  const { selectedTemplate, templateFilters } = useStore()
  const codesets = useGlobalStore((state) => state.codesets)
  const codeParametersType = templateFilters?.codes || []
  const form = useFormContext<ScheduleTemplateSchemaType>()
  const { register } = form
  const reportTemplateFilters: TemplateParameter[] =
    selectedTemplate?.parameters || []

  const sortedParameters: TemplateParameter[] = [...reportTemplateFilters].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  )

  const getFieldTypes = (code: string) => {
    const codeParam = codeParametersType.find((param) => param.code === code)
    if (!codeParam)
      return {
        isString: false,
        // isDate: false,
        isSelect: false,
        isMultiple: false,
      }

    let isString = false
    let isDate = false
    let isSelect = false
    let isMultiple = false

    codeParam.codeAttributes.forEach((attribute) => {
      if (
        attribute.name === CODE_PARAM_ATTRIBUTES.DATA_TYPE &&
        attribute.content === CODE_PARAM_ATTRIBUTES.TEXTBOX
      ) {
        isString = true
      } else if (
        attribute.name === CODE_PARAM_ATTRIBUTES.DATA_TYPE &&
        attribute.content === CODE_PARAM_ATTRIBUTES.DATE
      ) {
        isDate = true
      } else if (attribute.name === CODE_PARAM_ATTRIBUTES.SELECTION) {
        isSelect = true
        isMultiple = attribute.content === 'MULTIPLE'
      }
    })

    return { isString, isDate, isSelect, isMultiple }
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

    if (reportParameterCode === 'DateFilterType') {
      matchingCodeset = {
        ...matchingCodeset,
        codes:
          matchingCodeset.codes?.filter((code: CodeType) =>
            matchesAnyReport(
              code.attributes[0]?.value ?? '',
              selectedTemplate?.shortName ?? '',
            ),
          ) ?? [],
      }
    }

    switch (reportParameterCode) {
      case REPORT_PARAMETER_CODE.STAFF_SELECTION_LIST:
      case REPORT_PARAMETER_CODE.STAFF_LIST:
        return []
      case REPORT_PARAMETER_CODE.INSURANCE_LIST:
        return []
      case REPORT_PARAMETER_CODE.PATIENT_LIST:
        return []
      case REPORT_PARAMETER_CODE.COSIGNER_LIST:
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
    <Grid gap="2" columns="5" py="2">
      {sortedParameters?.map((param, i) => {
        const { isString, isDate, isSelect, isMultiple } = getFieldTypes(
          param.parameterCode,
        )

        if (!param.isRequired || excludedParams.includes(param.parameterCode))
          return

        return (
          <Flex key={param.id} className="w-full gap-x-1">
            {isString && (
              <TemplateFilterInput
                isRequired={param.isRequired}
                title={param.displayName}
                {...register(`parameters.${i}.scheduleParameterValue`, {
                  required: 'This field is required',
                })}
              />
            )}
            {isDate && (
              <TemplateFilterDatePicker
                isRequired={param.isRequired}
                title={param.displayName}
                {...register(`parameters.${i}.scheduleParameterValue`, {
                  required: 'This field is required',
                })}
              />
            )}
            {isSelect && param.parameterCode === 'StaffList' && (
              <TemplateStaffSelect
                isRequired={param.isRequired}
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'PatientList' && (
              <TemplatePatientSelect
                isRequired={param.isRequired}
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'CosignerList' && (
              <TemplateCosignerSelect
                isRequired={param.isRequired}
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'InsuranceList' && (
              <TemplateInsuranceSelect
                isRequired={param.isRequired}
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'LocationList' && (
              <TemplateLocationSelect
                isRequired={param.isRequired}
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'StateList' && (
              <TemplateStateSelect
                isRequired={param.isRequired}
                title={param.displayName}
                name={`parameters.${i}.scheduleParameterValue`}
                isMultiple={isMultiple}
              />
            )}

            {isSelect && param.parameterCode === 'ProviderList' && (
              <TemplateProviderSelect
                isRequired={param.isRequired}
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
                  isRequired={param.isRequired}
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
    </Grid>
  )
}

export default ScheduleParameters
