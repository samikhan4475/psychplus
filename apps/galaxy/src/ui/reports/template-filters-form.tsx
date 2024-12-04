'use client';

import { FormContainer } from '@/components';
import { useStore as useGlobalStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex } from '@radix-ui/themes';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { getRunReportAction } from './actions';
import { ClearButton } from './clear-button';
import { RunReportButton } from './run-report-button';
import { useStore } from './store';
import { TemplateFilterDatePicker } from './template-filter-datepicker';
import { TemplateFilterInput } from './template-filter-input';
import { TemplateSelect } from './template-select';
import { ReportExportButtons } from './report-export-buttons';
import { CODE_PARAM_ATTRIBUTES, REPORT_TYPE, STAFF_SELECTION, TemplateParameter } from './types';
import toast from 'react-hot-toast';

const schema = z.object({
  reportTemplateParameters: z.array(
    z.object({
      id: z.string(),
      runValue: z.union([z.string(), z.array(z.string())]).optional().default(''),
    }),
  ),
});

type SchemaType = z.infer<typeof schema>;


const DynamicTemplateFilters = () => {
  const { selectedTemplate, templateFilters, setGeneratedReport, staffData,generatedReport, setFiltersData, insuranceData, patientData, cosignerData } = useStore();
  const codesetIndex = useGlobalStore((state) => state.codesets);
  const reportTemplateFilters: TemplateParameter[] = selectedTemplate?.parameters || [];
  const codeParametersType = templateFilters?.codes || [];
  const sortedParameters: TemplateParameter[] = [...reportTemplateFilters].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      reportTemplateParameters: sortedParameters,
    },
  });

  const { reset, register } = form;

  useEffect(() => {
    if (reportTemplateFilters.length > 0) {
      reset();
      reset({
        reportTemplateParameters: sortedParameters,
      });
    }
  }, [reportTemplateFilters, reset]);

  const getFieldTypes = (code: string) => {
    const codeParam = codeParametersType.find((param) => param.code === code);
  
    if (!codeParam) return { isString: false, isDate: false, isSelect: false, isMultiple: false };
  
    let isString = false;
    let isDate = false;
    let isSelect = false;
    let isMultiple = false;
  
    codeParam.codeAttributes.forEach((attribute) => {
      if (attribute.name === CODE_PARAM_ATTRIBUTES.DATA_TYPE && attribute.content === CODE_PARAM_ATTRIBUTES.TEXTBOX) {
        isString = true;
      } else if (attribute.name === CODE_PARAM_ATTRIBUTES.DATA_TYPE && attribute.content === CODE_PARAM_ATTRIBUTES.DATE) {
        isDate = true;
      } else if (attribute.name === CODE_PARAM_ATTRIBUTES.SELECTION) {
        isSelect = true;
        isMultiple = attribute.content === "MULTIPLE";
      }
    });
  
    return { isString, isDate, isSelect, isMultiple };
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

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const formattedData = data.reportTemplateParameters.map((param) => ({
      id: param.id,
      runValue: Array.isArray(param.runValue) ? param.runValue.join(', ') : param.runValue ?? '',
    }));
    
    if (!selectedTemplate?.id) return;
    setFiltersData(formattedData);
    const payload = { templateId: selectedTemplate.id, data: formattedData, reportType: REPORT_TYPE.CSV };

    const result = await getRunReportAction(payload);

    if (result.state === 'success') {
      setGeneratedReport(result.data);
    } else {
      toast.error(
        result.error ?? 'Failed to generate report:'
      );
    }
  };
  
  return (
    <>
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex direction="row" align="center" className="flex-wrap gap-2 bg-white px-2 py-2 mt-1 shadow-light-08">
          {sortedParameters.map((item, i) => {
            const { isString, isDate, isSelect, isMultiple } = getFieldTypes(item.parameterCode);
            return (
              <Flex key={item.id} direction="row" className="gap-x-1">
                {isString && (
                  <TemplateFilterInput
                    title={item.displayName}
                    {...register(`reportTemplateParameters.${i}.runValue`, {
                      required: 'This field is required',
                    })}
                  />
                )}

                {isDate && (
                  <TemplateFilterDatePicker
                    title={item.displayName}
                    {...register(`reportTemplateParameters.${i}.runValue`, {
                      required: 'This field is required',
                    })}
                  />
                )}

                {isSelect && (
                  <TemplateSelect
                    title={item.displayName}
                    isMultiple={isMultiple}
                    options={computeOptions(codesetIndex, item.parameterCode)}
                    {...register(`reportTemplateParameters.${i}.runValue`, {
                      required: 'This field is required',
                    })}
                  />
                )}

              {!isString && !isDate && !isSelect && (
                <TemplateFilterInput
                  title={item.displayName}
                  {...register(`reportTemplateParameters.${i}.runValue`, {
                    required: 'This field is required',
                  })}
                />
              )}
            </Flex>
          );
        })}
        {sortedParameters.length > 0 && <ClearButton onClear={() => reset()} />}
        <RunReportButton />
      </Flex>
    </FormContainer>
    {generatedReport && (
        <ReportExportButtons />
      )}
      </>
  );
};

export { DynamicTemplateFilters };
