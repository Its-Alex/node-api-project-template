const pkgJSON = require('../package.json')

interface Logger {
  level: string
  labels: {
    service_name: string
    commit_hash: string
    [id: string]: string
  }
  prettyPrint: boolean
  console: boolean
  sentry: {
    enable: boolean
    DSN: string | undefined
  }
}

interface ConfigurationService {
  port: number,
  logger: Logger
}

export const configService: ConfigurationService = {
  // Logger params
  port: parseInt(process.env['NODE_API_PAYMENT_LISTEN_PORT'] || '3000', 10),
  logger: {
    level: process.env['NODE_API_PAYMENT_LOGGER_LEVEL'] || 'info',
    labels: {
      service_name: `node-api-${pkgJSON.version}`,
      commit_hash: process.env['NODE_API_PAYMENT_COMMIT_HASH'] || 'none'
    },
    prettyPrint: (process.env['NODE_API_PAYMENT_LOGGER_PRETTYPRINT'] === 'true') ? true : false,
    console: (process.env['NODE_API_PAYMENT_LOGGER_CONSOLE_DISABLE'] === 'true') ? false : true,
    sentry: {
      enable: (process.env['NODE_API_PAYMENT_LOGGER_SENTRY_ENABLE'] === 'true') ? true : false,
      DSN: process.env['NODE_API_PAYMENT_LOGGER_SENTRY_DSN']
    }
  }
}
