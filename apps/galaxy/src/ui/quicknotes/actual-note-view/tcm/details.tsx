'use client';

import { Text } from '@radix-ui/themes';
import { TcmWidgetSchemaType } from '@/ui/assessment-plan/tcm-widget/tcm-widget-schema';
import { BlockContainer, LabelAndValue } from '../shared';
import { useCodesetCodes } from '@/hooks';
import { CODESETS, HOSPITAL_SERVICE_GROUP } from '@/constants';

interface TcmProps {
  keys: { label: string; key: string }[];
  data: TcmWidgetSchemaType;
}

const Details = ({ keys, data }: TcmProps) => {
  const codes = useCodesetCodes(CODESETS.PlaceOfSerivce);
  const placesOfServices = codes.filter((item) =>
    HOSPITAL_SERVICE_GROUP.some((code) => item.groupingCode?.startsWith(code)),
  )
  const filteredGroup = placesOfServices.reduce(
    (acc, code) => ({ ...acc, [code.value]: code.display }),
    {} as Record<string, string>
  );

  return (
    <BlockContainer heading="TCM">
      {keys?.map((option) => {
        const value = option?.key
          ? data[option.key as keyof TcmWidgetSchemaType]
          : '';
        const displayValue =
          option?.key === 'dcHospitalServiceType' && filteredGroup
            ? filteredGroup[value as string] || value as string
            : value as string;

        return (
          <LabelAndValue
            key={option.label}
            label={option.label}
            value={displayValue}
          />
        );
      })}  
      <Text className="whitespace-nowrap text-1 font-medium">
        Reviewed patients medical records and discharge medications
      </Text>
    </BlockContainer>
  );
};

export { Details };
