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
import { CODE_PARAM_ATTRIBUTES, REPORT_TYPE } from './types';

const schema = z.object({
  reportTemplateParameters: z.array(
    z.object({
      id: z.string(),
      runValue: z.string().optional().default(''),
    }),
  ),
});

type SchemaType = z.infer<typeof schema>;

interface TemplateParameter {
  id: string;
  reportParameterCode: string;
  displayName: string;
  runValue: string;
  displayOrder: number;
}

const DynamicTemplateFilters = () => {
  const { selectedTemplate, templateFilters, setGeneratedReport } = useStore();
  const codesetIndex = useGlobalStore((state) => state.codesets);

  const reportTemplateFilters: TemplateParameter[] = selectedTemplate?.parameters  || [];
  const codeParametersType = templateFilters?.codes || [];

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      reportTemplateParameters: reportTemplateFilters,
    },
  });

  const { reset, register } = form;

  useEffect(() => {
    reset({
      reportTemplateParameters: reportTemplateFilters,
    });
  }, [reportTemplateFilters, reset]);

  const getFieldTypes = (code: string) => {
    const codeParam = codeParametersType.find((param) => param.code === code);

    if (!codeParam) return { isString: false, isDate: false, isSelect: false };

    let isString = false;
    let isDate = false;
    let isSelect = false;

    codeParam.codeAttributes.forEach((attribute) => {
      if (attribute.name === CODE_PARAM_ATTRIBUTES.DATA_TYPE && attribute.content === CODE_PARAM_ATTRIBUTES.STRING) {
        isString = true;
      } else if (attribute.name === CODE_PARAM_ATTRIBUTES.DATA_TYPE && attribute.content === CODE_PARAM_ATTRIBUTES.DATEONLY) {
        isDate = true;
      } else if (attribute.name === CODE_PARAM_ATTRIBUTES.SELECTION) {
        isSelect = true;
      }
    });

    return { isString, isDate, isSelect };
  };

  const computeOptions = (codesetIndex: any, reportParameterCode: string) => {
    const matchingCodeset = codesetIndex[reportParameterCode];

    if (!matchingCodeset?.codes) {
      return [];
    }

    return matchingCodeset.codes.map((code: { value: string; display: string }) => ({
      value: code.value,
      label: code.display,
    }));
  };

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const formattedData = data.reportTemplateParameters.map((param) => ({
      id: param.id,
      runValue: param.runValue ?? '',
    }));
    if (!selectedTemplate?.id) return;

    const payload = { templateId: selectedTemplate.id, data: formattedData, reportType: REPORT_TYPE.CSV };

    const result = await getRunReportAction(payload);

    if (result.state === 'success') {
      setGeneratedReport(result.data);
    } else {
      console.error('Failed to generate report:', result.error);
    }
  };

  const sortedParameters: TemplateParameter[] = [...reportTemplateFilters].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="row" align="center" className="flex-wrap gap-2 bg-white px-2 py-2 mt-1">
        {sortedParameters.map((item, i) => {
          const { isString, isDate, isSelect } = getFieldTypes(item.reportParameterCode);
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
                  options={computeOptions(codesetIndex, item.reportParameterCode)}
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
        <ClearButton onClear={() => reset()} />
        <RunReportButton />
      </Flex>
    </FormContainer>
  );
};

export { DynamicTemplateFilters };

