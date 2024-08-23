import NextLink from 'next/link'
import { MailIcon } from 'lucide-react'

const InboxLink = () => {
  return (
    <NextLink href="/inbox">
      <MailIcon width={20} height={20} strokeWidth={1.25} />
    </NextLink>
  )
}

export { InboxLink }
