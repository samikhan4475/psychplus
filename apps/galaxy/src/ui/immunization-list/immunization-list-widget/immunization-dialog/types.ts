export interface BaseFormProps {
  isEdit?: boolean
  closeDialog: () => void
}

export interface ImmunizationFormProps extends BaseFormProps {
  data?: import('../types').ImmunizationDataResponse
} 