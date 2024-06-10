interface Parameter {
    id?: string
    displayName: string
    reportTemplateId?: string
    reportParameterCode: string
    resourceStatus: string
    displayOrder?: number
}

interface Template {
    id?: string
    shortName: string
    displayName: string
    reportCategoryCode: string
    isAdhocAllowed: boolean
    resourceStatus: string
    reportTemplateParameters: Parameter[]
}

export type { Template, Parameter }