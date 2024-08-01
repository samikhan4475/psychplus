interface SubmissionResponseType {
  entry_date: string
  status_date: string
  status: string
  patient_account: string
  response: string
  response_from: string
  payer_control: string
  category_code: string
  status_code: string
}

interface Charge {
  units: string
  amount: string
  total_amount: string
}

export type { SubmissionResponseType, Charge }
