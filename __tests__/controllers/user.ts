import 'mocha'
import { expect } from 'chai'

import userController from '../../srcs/controllers/user'

describe('Test user controller', async function () {
  it('Success controller', async () => {
    let req = {
      body: {
        username: 'Alexandre',
        password: '123456789'
      }
    }

    let res = {
      json: (data: any) => {
        expect(data).to.deep.equal({
          message: 'validation success'
        })
      }
    }

    await userController(req, res)
  })

  it('Failed validation controller', async () => {
    let req = {
      body: {}
    }

    let res = {
      status: (number: number) => {
        expect(number).to.equal(400)
        return {
          json: (data: any) => {
            expect(data).to.deep.equal({
              message: 'validation error',
              errors: [
                {
                  message: '"username" is required',
                  path: [
                    'username'
                  ],
                  type: 'any.required',
                  context: {
                    key: 'username',
                    label: 'username'
                  }
                },
                {
                  message: '"password" is required',
                  path: [
                    'password'
                  ],
                  type: 'any.required',
                  context: {
                    key: 'password',
                    label: 'password'
                  }
                }
              ]
            })
          }
        }
      }
    }

    await userController(req, res)
  })
})
