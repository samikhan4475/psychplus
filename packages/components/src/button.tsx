import { Button as RadixButton } from '@radix-ui/themes'

type ButtonProps = React.ComponentProps<typeof RadixButton>

const Button = (props: ButtonProps) => <RadixButton {...props} />

export { Button, type ButtonProps }
