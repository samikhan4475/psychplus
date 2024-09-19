import { UseFormReturn } from 'react-hook-form'
import { SchemaType } from './add-claim-form'

const isEmpty = (value: any): boolean =>
  value === null || value === undefined || value === ''

interface ValidationResult {
  hasErrors: boolean
  message: string
}

/**
 * @param {UseFormReturn<SchemaType>} form
 * @returns {() => ValidationResult}
 */
const useClaimServiceLineValidation = (form: UseFormReturn<SchemaType>) => {
  const validate = () => {
    let hasErrors = false
    let message = ''
    const { claimServiceLines = [], claimDiagnosis = [] } = form.getValues()

    // Filter out deleted records
    const activeClaimServiceLines = claimServiceLines.filter(
      (line) => line.recordStatus !== 'Deleted',
    )
    const activeClaimDiagnosis = claimDiagnosis.filter(
      (diagnosis) => diagnosis.recordStatus !== 'Deleted',
    )

     // Create a set of valid diagnosis sequence numbers
     const validDiagnosisSequenceNumbers = new Set(
      activeClaimDiagnosis.map(diagnosis => diagnosis.sequenceNo)
    )

    // Validate claimDiagnosis
    if (activeClaimDiagnosis.length === 0) {
      form.setError('claimDiagnosis', {
        type: 'manual',
        message: 'At least one diagnosis is required',
      })
      hasErrors = true
      message = ''
    }

    // active claimServiceLines
    if (activeClaimServiceLines.length === 0) {
      form.setError('claimServiceLines', {
        type: 'manual',
        message: 'At least one charge is required',
      })
      message = 'At least one charge is required'
      hasErrors = true
      return { hasErrors, message }
    }

    // Validate claimServiceLines
    activeClaimServiceLines.forEach((line, index) => {
      const {
        cptCode,
        placeOfService,
        diagnosisPointer1,
        diagnosisPointer2,
        diagnosisPointer3,
        diagnosisPointer4,
      } = line
      const pointers = [
        diagnosisPointer1 ?? '',
        diagnosisPointer2 ?? '',
        diagnosisPointer3 ?? '',
        diagnosisPointer4 ?? '',
      ]

      // Validate CPT Code
      if (isEmpty(cptCode)) {
        form.setError(`claimServiceLines.${index}.cptCode`, {
          type: 'manual',
          message: 'Enter CPT Code',
        })
        hasErrors = true
        message = ''
      }

      // Validate Place of Service
      if (isEmpty(placeOfService)) {
        form.setError(`claimServiceLines.${index}.placeOfService`, {
          type: 'manual',
          message: 'Enter POS',
        })
        hasErrors = true
        message = ''
      }

      // Check for at least one diagnosis pointer
      const hasAtLeastOneDiagnosisPointer = pointers.some(
        (value) => value && value.trim() !== '',
      )

      if (!hasAtLeastOneDiagnosisPointer) {
        form.setError(`claimServiceLines.${index}.diagnosisPointer1`, {
          type: 'manual',
          message: 'At least one diagnosis pointer is required',
        })
        hasErrors = true
        message = ''
      } else if (
        Number(diagnosisPointer1) > 12 ||
        Number(diagnosisPointer2) > 12 ||
        Number(diagnosisPointer3) > 12 ||
        Number(diagnosisPointer4) > 12
      ) {
        form.setError(`claimServiceLines.${index}.diagnosisPointer1`, {
          type: 'manual',
          message: 'Enter Valid Pointer(s) 12',
        })
         message = ''
        hasErrors = true
      } else if (
        (isEmpty(diagnosisPointer1) === false &&
          (diagnosisPointer1 === diagnosisPointer2 ||
            diagnosisPointer1 === diagnosisPointer3 ||
            diagnosisPointer1 === diagnosisPointer4)) ||
        (isEmpty(diagnosisPointer2) === false &&
          (diagnosisPointer2 === diagnosisPointer3 ||
            diagnosisPointer2 === diagnosisPointer4)) ||
        (isEmpty(diagnosisPointer3) === false &&
          diagnosisPointer3 === diagnosisPointer4)
      ) {
        form.setError(`claimServiceLines.${index}.diagnosisPointer1`, {
          type: 'manual',
          message: 'Enter Unique Pointer(s)',
        })
        hasErrors = true
        message = ''
      } else if (
        (isEmpty(diagnosisPointer2) === false &&
          isEmpty(diagnosisPointer1) === true) ||
        (isEmpty(diagnosisPointer3) === false &&
          isEmpty(diagnosisPointer2) === true) ||
        (isEmpty(diagnosisPointer4) === false &&
          isEmpty(diagnosisPointer3) === true)
      ) {
        form.setError(`claimServiceLines.${index}.diagnosisPointer1`, {
          type: 'manual',
          message: 'Enter Pointer(s) in Sequence',
        })
        hasErrors = true
        message = ''
      }
       // Validate diagnosis pointers against diagnosis sequence numbers
       pointers.forEach((pointer) => {
        if (pointer && !validDiagnosisSequenceNumbers.has(Number(pointer))) {
          form.setError(`claimServiceLines.${index}.diagnosisPointer1`, {
            type: 'manual',
            message: 'Enter correct pointer',
          })
          hasErrors = true
          message = 'Enter correct pointer'
        }
      })
    })

    return {
      hasErrors,
      message,
    }
  }

  return validate
}

export default useClaimServiceLineValidation
