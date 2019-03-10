import express from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()
const port = 8080
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
      description: 'A sample API'
    },
    host: 'localhost'
  },
  // Path to the API docs
  // Note that this path is relative to the current directory from which the
  // Node.js is ran, not the application itself.
  apis: ['srcs/**/*.ts']
})

app.use(bodyParser.json())

app.use('/swagger.json', (_req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/users', require('./routes/users'))

app.use((_req: any, res: any) => {
  res.status(404).json({
    message: 'not found'
  })
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})