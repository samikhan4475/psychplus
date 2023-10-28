import './base.css'
import { Theme, ThemePanel } from '@radix-ui/themes'

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Theme accentColor="teal" radius="medium" className="h-full w-full">
        {children}
        <ThemePanel defaultOpen={false} />
      </Theme>
    </body>
  </html>
)

export { RootLayout }
