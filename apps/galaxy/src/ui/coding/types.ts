enum CodingTab {
  ICD = 'ICD',
  CPT = 'CPT',
  Modifier = 'Modifier',
  POS = 'POS',
}
interface PosList {
  code: string
  description: string
}
export { CodingTab, type PosList }
