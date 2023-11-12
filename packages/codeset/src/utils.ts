import { type Code } from './types'

const getCodeAttribute = (code: Code, name: string) =>
  code.attributes?.find((attr) => attr.name === name)?.value ?? 'N/A'

const getCodeMetadata = (code: Code, name: string) =>
  code.metadata ? code.metadata[name] ?? 'N/A' : 'N/A'

export { getCodeAttribute, getCodeMetadata }
