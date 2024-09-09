enum alertType {
  Billing,
  Treatment,
}
interface Comment {
  date: string
  comment: string
  staff: string
}
interface TreatmentAlertDialogDialogProps {
  isOpen?: boolean
  closeDialog: () => void
  data?: Comment[]
  type: alertType
}
interface TreatmentAlertTableProps {
  type: alertType
}
export {
  type TreatmentAlertDialogDialogProps,
  alertType,
  type Comment,
  type TreatmentAlertTableProps,
}
