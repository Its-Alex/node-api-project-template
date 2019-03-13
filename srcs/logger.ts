import Winston from 'winston'
import * as Transport from 'winston-transport'
import { Format } from 'logform'
import WinstonSentry from 'winston-node-sentry'

const { combine, prettyPrint, timestamp, json } = Winston.format
import { configService } from './config'

export let transports: Array<Transport> = []
if (configService.logger.console) {
  transports.push(new Winston.transports.Console({}))
}
if (configService.logger.sentry.enable) {
  console.log('Sentry support enable')

  if (configService.logger.sentry.DSN === '') {
    console.log(new Error('No sentry DSN provied'))
    process.exit(1)
  }

  transports.push(new WinstonSentry.SentryTransport({
    level: 'error',
    sentryOpts: {
      dsn: configService.logger.sentry.DSN,
      release: configService.logger.labels.commit_hash,
      serverName: configService.logger.labels.service_name
    }
  }))
} else {
  console.log('Sentry support disable')
}
if (transports.length === 0) {
  console.log(new Error('No winston transport defined!'))
  process.exit(1)
}

export let format: Format
if (configService.logger.prettyPrint) {
  format = combine(
    timestamp(),
    prettyPrint()
  )
} else {
  format = combine(
    timestamp(),
    json()
  )
}

export let logger: Winston.Logger = Winston.createLogger({
  level: configService.logger.level,
  defaultMeta: configService.logger.labels,
  format,
  transports
})

