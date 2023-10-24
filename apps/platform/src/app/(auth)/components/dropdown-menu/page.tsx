'use client'

import { CaretDownIcon } from '@radix-ui/react-icons'
import { Box, Flex, Grid, Heading } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { SectionHeader } from '../../shared/section-header'

const TITLE = 'Dropdown Menu'
const DESCRIPTION = 'Menu representing a set of actions, triggered by a button.'

const DropdownMenuComponentPage = () => (
  <>
    <SectionHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Default</Heading>
      </Box>
      <Flex align="center" gap="3">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button>
              Options
              <CaretDownIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                <DropdownMenu.Separator />
                <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Share</DropdownMenu.Item>
            <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Sizes</Heading>
      </Box>
      <Flex gap="3" align="center">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" size="2">
              Options
              <CaretDownIcon width="16" height="16" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="2">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" size="1">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variants</Heading>
      </Box>
      <Flex gap="3" align="center">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="solid">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="solid">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Colors</Heading>
      </Box>
      <Flex gap="3">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" color="indigo">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft" color="indigo">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" color="cyan">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft" color="cyan">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" color="orange">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft" color="orange">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" color="crimson">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft" color="crimson">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">High Contrast</Heading>
      </Box>
      <Grid columns="2" gap="3" display="inline-grid">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="solid">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="solid">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="solid" highContrast>
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="solid" highContrast>
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft">
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" highContrast>
              Options
              <CaretDownIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft" highContrast>
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Grid>
    </Box>
  </>
)

export default DropdownMenuComponentPage
