import { CODE_NOT_SET } from './constants'
import { type Code } from './types'

const getCodeValueExcludeEmpty = (value?: string) =>
  value === CODE_NOT_SET ? undefined : value

const getCodeAttribute = (code: Code, name: string) =>
  code.attributes?.find((attr) => attr.name === name)?.value ?? 'N/A'

const getCodeAttributeBoolean = (code: Code, name: string) =>
  code.attributes?.find((attr) => attr.name === name)?.value === 'True'

const getCodeMetadata = (code: Code, name: string) =>
  code.metadata ? code.metadata[name] ?? 'N/A' : 'N/A'

export {
  getCodeValueExcludeEmpty,
  getCodeAttribute,
  getCodeAttributeBoolean,
  getCodeMetadata,
}
