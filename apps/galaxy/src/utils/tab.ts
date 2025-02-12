interface NavigationTab {
  href: string
  label: string
}

export const updateTabLabel = (
  data: NavigationTab[],
  id: number,
  newName: string,
): NavigationTab => {
  const tab = data.find((item) => item.label.includes(id.toString()))
  if (tab && tab.label) {
    const labelParts = tab.label.split('-')
    labelParts[0] = newName
    return { ...tab, label: labelParts.join('-') }
  }

  return {
    href: '',
    label: newName,
  }
}
