import { SCRIPTSURE_API_KEY, SCRIPTSURE_SECRET } from '@psychplus-v2/env'

const createPacket = async () => {
  const now = Date.now()
  const enc = new TextEncoder()
  const body = `${SCRIPTSURE_API_KEY}_${SCRIPTSURE_SECRET}_${now}`
  const algorithm = { name: 'HMAC', hash: 'SHA-1' }

  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(SCRIPTSURE_SECRET),
    algorithm,
    false,
    ['sign', 'verify'],
  )

  const signature = await crypto.subtle.sign(
    algorithm.name,
    key,
    enc.encode(body),
  )

  const hashArray = Array.from(new Uint8Array(signature))

  const digest = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return `${SCRIPTSURE_API_KEY}~${digest}~${now}`
}

export { createPacket }
