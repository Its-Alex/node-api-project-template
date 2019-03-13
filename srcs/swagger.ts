import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: '',
      version: '1.0.0',
      description: 'Ecotiz payment api',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'API Payment',
        url: 'https://www.example.com',
        email: 'support@example.com'
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
      }
    },
    servers: [
      {
        url: 'https://api.example.com/',
        description: 'Production server'
      },
      {
        url: 'http://api.example.com:{port}/',
        description: 'Local server',
        variables: {
          port: {
            enum: [
              8080
            ],
            default: 8080
          }
        }
      }
    ]
  },
  // Path to the API docs
  // Note that this path is relative to the current directory from which the
  // Node.js is ran, not the application itself.
  apis: ['swagger/*.yaml', 'srcs/**/*.ts']
})

export const swaggerHandler: Function = () => {
  return (_req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  }
}
