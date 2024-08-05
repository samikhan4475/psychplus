import { SchemaType } from '../assigning-authorities-widget.client'

const getDuplicateErrorFields = (
  errorMessage: string,
  data: SchemaType,
): { fields: Array<keyof SchemaType>; message: string } => {
  const fields: Array<keyof SchemaType> = []
  let message = 'An error occurred'

  const regex = /duplicate key value is \(([^)]+)\)/
  const match = regex.exec(errorMessage)

  if (match) {
    const duplicateValue = match[1]
    const duplicateFields: Array<string> = []

    if (data.displayName === duplicateValue) {
      fields.push('displayName')
      duplicateFields.push('Display Name')
    }
    if (data.namespace === duplicateValue) {
      fields.push('namespace')
      duplicateFields.push('Namespace')
    }
    if (data.oid === duplicateValue) {
      fields.push('oid')
      duplicateFields.push('OID')
    }

    if (duplicateFields.length > 0) {
      message = `Duplicate value '${duplicateValue}' found in the following fields: ${duplicateFields.join(
        ', ',
      )}.`
    }
  }

  return { fields, message }
}

export { getDuplicateErrorFields }
