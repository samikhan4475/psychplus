import { Attribute } from './types'

const getCodeValueByKey = (key: string, data: Attribute[] = []) => {
  const item = data.find((item) => item.name === key)
  return item ? item.value : ''
}

export { getCodeValueByKey }
