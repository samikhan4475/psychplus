interface ClinicalQuantity {
  clinicalQuantityDesc: string
  subUnitQuantity: number
  subUnitOfMeasureDesc: string
  packageDesc: string
  erxQuantity: number
  erxScriptPotencyUnitCode: string
  erxScriptUnitOfMeasureDesc: string
}

interface RepresentativeErxPackagedDrug {
  packagedDrugId: string
  packagedDrugDesc: string
  addDate: string
  repackagerCode: string
  repackagerCodeDesc: string
  mostRecentAddDate: string
  clinicalQuantityDescription: string
  obsoleteDate: string
  unitDosePackagingIndicator: boolean
  innerPackageIndicator: boolean
  sampleNdcIndicator: boolean
  isMedicalDevice: boolean
  federalLegendCode: string
  federalLegendCodeDesc: string
  genericDrugNameCode: string
  genericDrugNameCodeDesc: string
  federalDeaClassCode: string
  federalDeaClassCodeDesc: string
}

interface DrugInfo {
  prescribableDrugId: string
  prescribableDrugDesc: string
  dispensableGenericDesc: string
  dispensableGenericId: string
  doseFormDesc: string
  doseFormId: string
  drugNameDesc: string
  drugNameId: string
  defaultEtcId: string
  defaultEtcDesc: string
  medStrength: string
  medStrengthUnit: string
  nameTypeCode: string
  nameTypeCodeDesc: string
  routeDesc: string
  routeId: string
  genericDrugId: string
  genericDrugDesc: string
  rxCuiDesc: string
  rxCui: number
  rxCuiTypeDesc: string
  rxCuiTypeCode: string
  rxCuiTypeOid: string
  clinicalQuantity: ClinicalQuantity
  representativeErxPackagedDrug: RepresentativeErxPackagedDrug
}

export { type DrugInfo }
