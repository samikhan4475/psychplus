'use client'

import { ChatBubbleIcon, Link1Icon, Share2Icon } from '@radix-ui/react-icons'
import { Box, Flex, Grid, Heading, Inset, Text } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { Popover } from '@psychplus/ui/popover'
import { TextArea } from '@psychplus/ui/text-area'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Popover'
const DESCRIPTION =
  'Floating element for displaying rich content, triggered by a button.'

const PopoverComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft">
            <ChatBubbleIcon width="16" height="16" />
            Comment
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-[350px]">
          <TextArea placeholder="Write a comment…" className="h-[80px]" />
          <Flex gap="3" mt="3" justify="between">
            <Flex align="center" gap="2" asChild>
              <Text as="label" size="2">
                <Checkbox />
                <Text>Send to group</Text>
              </Text>
            </Flex>
            <Popover.Close>
              <Button size="1">Comment</Button>
            </Popover.Close>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Inset content</Heading>
      </Box>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft">
            <Share2Icon width="16" height="16" />
            Share image
          </Button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 360 }}>
          <Grid columns="120px 1fr">
            <Inset side="left" pr="current">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?&auto=format&fit=crop&w=400&q=80"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                alt=""
              />
            </Inset>

            <Box>
              <Heading size="2" mb="1">
                Share this image
              </Heading>
              <Text as="p" size="2" mb="4" color="gray">
                The hidden harmony is better than the obvious.
              </Text>

              <Flex direction="column" align="stretch">
                <Popover.Close>
                  <Button size="1" variant="soft">
                    <Link1Icon width="16" height="16" />
                    Copy link
                  </Button>
                </Popover.Close>
              </Flex>
            </Box>
          </Grid>
        </Popover.Content>
      </Popover.Root>
    </Box>
  </>
)

export default PopoverComponentPage
