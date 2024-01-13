import './base.css'
import { Theme } from '@radix-ui/themes'
import { PubsubProvider } from '@psychplus/utils/event'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="overflow-hidden !bg-transparent">
        <Theme
          accentColor="cyan"
          radius="medium"
          scaling="90%"
          className="h-full w-full"
        >
          <PubsubProvider>{children}</PubsubProvider>
        </Theme>
      </body>
    </html>
  )
}

export { RootLayout }
