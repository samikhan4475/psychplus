import * as Accordion from '@radix-ui/react-accordion'
import { Provider } from '../../types'
import { AccordionItem } from './accordian-item'

interface Props {
  providers: Provider[]
}
const ProvidersAccordionMenu = ({ providers }: Props) => {
  return (
    <Accordion.Root type="multiple">
      {providers.map((provider) => (
        <AccordionItem key={provider.id} provider={provider} value={`${provider.id}`} />
      ))}
    </Accordion.Root>
  )
}

export { ProvidersAccordionMenu }
