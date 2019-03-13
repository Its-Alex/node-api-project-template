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
  port: parseInt(process.env['ECOTIZ_API_PAYMENT_LISTEN_PORT'] || '3000', 10),
  logger: {
    level: process.env['ECOTIZ_API_PAYMENT_LOGGER_LEVEL'] || 'info',
    labels: {
      service_name: `api-payment-${pkgJSON.version}`,
      commit_hash: process.env['ECOTIZ_API_PAYMENT_COMMIT_HASH'] || 'none'
    },
    prettyPrint: (process.env['ECOTIZ_API_PAYMENT_LOGGER_PRETTYPRINT'] === 'true') ? true : false,
    console: (process.env['ECOTIZ_API_PAYMENT_LOGGER_CONSOLE'] === 'true') ? true : false,
    sentry: {
      enable: (process.env['ECOTIZ_API_PAYMENT_LOGGER_SENTRY_ENABLE'] === 'true') ? true : false,
      DSN: process.env['ECOTIZ_API_PAYMENT_LOGGER_SENTRY_DSN']
    }
  }
}
