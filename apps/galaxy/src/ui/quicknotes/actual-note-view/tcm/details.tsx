'use client';

import { Text } from '@radix-ui/themes';
import { TcmWidgetSchemaType } from '@/ui/assessment-plan/tcm-widget/tcm-widget-schema';
import { BlockContainer, LabelAndValue } from '../shared';
import { useCodesetCodes } from '@/hooks';
import { CODESETS, HOSPITAL_SERVICE_GROUP } from '@/constants';
import { getSlashedDateString } from '@/utils';

interface TcmProps {
  keys: { label: string; key: string }[];
  data: TcmWidgetSchemaType;
}

const Details = ({ keys, data }: TcmProps) => {
  const codes = useCodesetCodes(CODESETS.PlaceOfSerivce);
  const filteredGroup = codes
    .filter((item) =>  HOSPITAL_SERVICE_GROUP.some((code) => item.groupingCode?.startsWith(code)),).reduce((acc, code) => ({ ...acc, [code.value]: code.display }),{} as Record<string, string>,);
  let showTcmReview = true; 
  return (
    <BlockContainer heading="TCM">
      {keys.map((option) => {
        const value = option?.key
          ? data[option.key as keyof TcmWidgetSchemaType]
          : '';
  
        const displayValue = (() => {
          if (!option?.key) return value as string;
  
          switch (option.key) {
            case 'dcHospitalServiceType':
              return filteredGroup?.[value as string] || (value as string);
            case 'dcDate':
            case 'tcmDate':
              return value ? getSlashedDateString(value as string) : '';
            default:
              return value as string;
          }
        })();
  
        if (option.key === 'tcmResults' && !displayValue) {
          showTcmReview = false;
        }
  
        return (
          <LabelAndValue
            key={option.label}
            label={option.label}
            value={displayValue}
          />
        );
      })}
      {showTcmReview && (
        <Text className="whitespace-nowrap text-1 font-medium">
          Reviewed patients medical records and discharge medications
        </Text>
      )}
    </BlockContainer>
  );
};

export { Details };
