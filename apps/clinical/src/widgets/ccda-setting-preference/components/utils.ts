import { UserSetting } from '@psychplus/ccda-setting-preference'

export const split_content = <T extends string>(content: T): string => {
  const parts = content.split('|')
  return parts[1] || ''
}

export const reindex_items = (items: UserSetting[]) => {
  return items.map((item, index) => {
    if (item.content.split('|')[0] !== '00') {
      const updatedItem: UserSetting = {
        ...item,
        levelCode: 'User',
        content: index + 1 + '0|' + item.content.split('|')[1],
      }
      return updatedItem
    } else {
      return {
        ...item,
        levelCode: 'User',
      }
    }
  })
}
