interface ConfigurationItem {
  display: string
  tag: string
  value: string | number
  helpLines?: string[]
  helpLineExtraData?: string[]
}

interface ConfigurationResponse {
  configuration: ConfigurationItem[]
}

export type { ConfigurationItem, ConfigurationResponse }
