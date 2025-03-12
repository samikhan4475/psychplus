import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectableChip } from '@/components-v2'
import {
  SMOKE_PACKS_ID,
  SMOKE_PACKS_OPTIONS,
  TOBACCO_CHEW_SMOKE_ID,
  TOBACCO_CHEW_SMOKE_OPTIONS,
  TOBACCO_ID,
  TOBACCO_LABEL,
  YES_NO_OPTIONS,
} from '../constants'
import { SubstanceUseSchemaType } from '../substance-use-hx-schema'

const TobaccoBlock = () => {
  const form = useFormContext<SubstanceUseSchemaType>()
  const errors = form.formState.errors

  return (
    <Flex gap="3" align="start" wrap="wrap">
      <Text weight="medium" className="line-clamp-1 text-[16px]">
        {TOBACCO_LABEL}
      </Text>
      {YES_NO_OPTIONS.map((option) => (
        <SelectableChip
          key={option.value}
          label={option.label}
          selected={form.watch(TOBACCO_ID) === option.value}
          onClick={() => {
            form.clearErrors(TOBACCO_ID)
            form.setValue(TOBACCO_ID, option.value)
          }}
        />
      ))}
      {form.watch('tobacco') === 'yes' && (
        <>
          {TOBACCO_CHEW_SMOKE_OPTIONS.map((option) => (
            <SelectableChip
              key={option.value}
              label={option.label}
              selected={form.watch(TOBACCO_CHEW_SMOKE_ID) === option.value}
              onClick={() => {
                form.clearErrors(TOBACCO_CHEW_SMOKE_ID)
                form.setValue(TOBACCO_CHEW_SMOKE_ID, option.value)
              }}
            />
          ))}
          {errors.tobaccoChewSmoke && (
            <Text className="pl-1 text-[12px] text-tomato-11">
              {errors.tobaccoChewSmoke.message}
            </Text>
          )}
          {form.watch('tobaccoChewSmoke') === 'smoke' && (
            <>
              {SMOKE_PACKS_OPTIONS.map((option) => (
                <SelectableChip
                  key={option.value}
                  label={option.label}
                  selected={form.watch(SMOKE_PACKS_ID) === option.value}
                  onClick={() => {
                    form.clearErrors(SMOKE_PACKS_ID)
                    form.setValue(SMOKE_PACKS_ID, option.value)
                  }}
                />
              ))}

              {errors.smokePacks && (
                <Text className="pl-1 text-[12px] text-tomato-11">
                  {errors.smokePacks.message}
                </Text>
              )}
            </>
          )}
        </>
      )}
    </Flex>
  )
}

export { TobaccoBlock }
