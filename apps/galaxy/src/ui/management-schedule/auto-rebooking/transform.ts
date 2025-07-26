import { UserSetting } from '@/types'
import { ServiceVisit, Visit } from './types'

const transformIn = (settings: UserSetting[]): ServiceVisit[] => {
  const parsedSettings = settings.map((setting) => {
    const [checkedValue, sortOrder] = setting.content.split(':')
    const [serviceOrder, visitOrder] = sortOrder
      ? sortOrder.split('.').map(Number)
      : [0, 0]

    return {
      ...setting,
      parsedChecked: checkedValue === 'true',
      serviceOrder,
      visitOrder,
    }
  })

  const serviceGroups = new Map<string, typeof parsedSettings>()

  parsedSettings.forEach((setting) => {
    const [serviceName, visitName] = setting.name.split(':')

    if (serviceName && visitName) {
      if (!serviceGroups.has(serviceName)) {
        serviceGroups.set(serviceName, [])
      }
      serviceGroups.get(serviceName)!.push(setting)
    }
  })

  const result: ServiceVisit[] = []

  serviceGroups.forEach((visits, serviceName) => {
    const sortedVisits = visits.toSorted((a, b) => a.visitOrder - b.visitOrder)

    const subRows: Visit[] = sortedVisits.map((visit) => {
      const [, visitName] = visit.name.split(':')
      return {
        ...visit,
        label: visitName.trim(),
        checked: visit.parsedChecked,
      }
    })

    // Determine if parent service should be checked
    const allChildrenChecked = subRows.every((subRow) => subRow.checked)

    const serviceOrder = sortedVisits[0]?.serviceOrder || 0

    const serviceRow: ServiceVisit = {
      id: `service-${serviceName}`,
      label: serviceName.trim(),
      checked: allChildrenChecked,
      subRows: subRows,
      serviceOrder,
    }

    result.push(serviceRow)
  })

  result.sort((a, b) => {
    const serviceOrderDiff = (a?.serviceOrder ?? 0) - (b?.serviceOrder ?? 0)
    if (serviceOrderDiff !== 0) return serviceOrderDiff

    const aVisitCount = a.subRows?.length || 0
    const bVisitCount = b.subRows?.length || 0
    return bVisitCount - aVisitCount
  })

  return result.map(({ serviceOrder, ...service }) => service)
}

const transformOut = (serviceVisits: ServiceVisit[]): UserSetting[] => {
  const updatedSettings: UserSetting[] = []

  serviceVisits.forEach((service) => {
    service.subRows?.forEach((visit) => {
      const name = `${service.label}:${visit.label}`
      const {
        serviceOrder,
        label,
        visitOrder,
        parsedChecked,
        checked,
        ...rest
      } = visit

      let content: string
      if (visit.content) {
        const [, sortOrder] = visit.content.split(':')
        content = `${visit.checked ? 'true' : 'false'}:${sortOrder}`
      } else {
        content = `${visit.checked ? 'true' : 'false'}:0.0`
      }

      updatedSettings.push({
        ...rest,
        id: visit.id,
        name: name,
        content: content,
      })
    })
  })

  return updatedSettings
}

export { transformIn, transformOut }
