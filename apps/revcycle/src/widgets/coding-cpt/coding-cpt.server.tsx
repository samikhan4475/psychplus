import { unstable_noStore as noStore } from 'next/cache'
import { CodingCPTClient } from './coding-cpt.client'

const CodingCPTServer = async () => {
  noStore()

  return <CodingCPTClient />
}

export { CodingCPTServer }
