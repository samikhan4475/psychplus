import { useStore } from './combined'

type Dropdown = { label: string; value: string }[]

const GetDropdown = (key: string) => {
  const { codeSetIndex } = useStore()
  const list = codeSetIndex[key]?.map((item) => {
    return { label: item.code, value: item.display }
  })
  return list
}

export { GetDropdown, type Dropdown }
