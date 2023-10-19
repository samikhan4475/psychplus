import '@radix-ui/themes/styles.css'
import './base.css'
import { Theme, ThemePanel } from '@radix-ui/themes'

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Theme className="h-full w-full">
        {children}
        <ThemePanel defaultOpen={false} />
      </Theme>
    </body>
  </html>
)

export { RootLayout }
