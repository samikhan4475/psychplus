import crypto from 'crypto'
import { SCRIPTSURE_ENCRYPTION_KEY } from '@psychplus-v2/env'

const IV_LENGTH = 16
const ALGORITHM = 'aes-256-cbc'

const encrypt = (plainText: string) => {
  const iv = crypto.randomBytes(IV_LENGTH)

  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(SCRIPTSURE_ENCRYPTION_KEY),
    iv,
  )

  const encrypted = Buffer.concat([
    cipher.update(plainText, 'utf8'),
    cipher.final(),
  ])

  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

const decrypt = (text: string) => {
  const [ivHex, encryptedHex] = text.split(':')

  if (!ivHex || !encryptedHex) {
    throw new Error('Invalid or corrupted cipher format')
  }

  const encryptedText = Buffer.from(encryptedHex, 'hex')

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(SCRIPTSURE_ENCRYPTION_KEY),
    Buffer.from(ivHex, 'hex'),
  )

  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ])

  return decrypted.toString()
}

export { encrypt, decrypt }
