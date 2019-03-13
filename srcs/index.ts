import express from 'express'
import expressWinston from 'express-winston'
import bodyParser from 'body-parser'

import { router } from './routes/index'
import { configService } from './config'
import { logger } from './logger'

class App {
  readonly app: express.Application = express()

  constructor () {
    this.app.use(bodyParser.json())

    this.app.use(expressWinston.logger({
      winstonInstance: logger
    }))

    this.app.use(router)

    this.app.use(expressWinston.errorLogger({
      winstonInstance: logger
    }))
  }

  start () {
    this.app.listen(configService.port, () => {
      logger.info(`${configService.logger.labels.service_name} started on port ${configService.port}`)
    })
  }
}

new App().start()
