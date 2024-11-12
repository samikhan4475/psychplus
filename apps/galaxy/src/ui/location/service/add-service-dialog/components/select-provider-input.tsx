import { CodesetSelectCell, FormFieldContainer } from '@/components'
import { CODESETS } from '@/constants';
import { Text } from '@radix-ui/themes'


const SelectProviderInput = () => {
  return (
    <>
      <Text className="col-span-6 text-[14px] text-black font-[400] leading-5">If Primary Provider Required Select Provider Type?</Text>
      <FormFieldContainer className="col-span-5 gap-1">
        <CodesetSelectCell
          className="h-7"
          codeset={CODESETS.ServicesStatus}
        />
      </FormFieldContainer>
    </>
    
  )
}

export {SelectProviderInput};