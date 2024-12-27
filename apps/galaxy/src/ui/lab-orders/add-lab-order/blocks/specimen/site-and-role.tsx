import { Flex } from '@radix-ui/themes'
import { RoleDropDown } from './role-dropdown'
import { SiteModDropDown } from './site-mod'
import { SourceSiteDropDown } from './source-site'

const SiteAndRole = ({ index }: { index: number }) => {
  return (
    <Flex direction="row" gap="3" className="flex-grow-0">
      <SourceSiteDropDown index={index} />
      <SiteModDropDown index={index} />
      <RoleDropDown index={index} />
    </Flex>
  )
}

export { SiteAndRole }
