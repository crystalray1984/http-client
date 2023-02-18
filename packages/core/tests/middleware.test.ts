import { compose, Middleware, Context } from '../src/middlewares'

it('合并中间件', async () => {
    const up1 = jest.fn()
    const down1 = jest.fn()
    const up2 = jest.fn()
    const down2 = jest.fn()
    const next = jest.fn()

    const middleware1: Middleware<any, any> = async (context, next) => {
        up1(context)
        await next()
        down1(context)
    }

    const middleware2: Middleware<any, any> = async (context, next) => {
        up2(context)
        await next()
        down2(context)
    }

    const composed = compose(middleware1, middleware2)

    const context = {
        request: null,
        response: null,
    }

    await composed(context, next)

    expect(up1).toBeCalledWith(context)
    expect(down1).toBeCalledWith(context)
    expect(up2).toBeCalledWith(context)
    expect(down2).toBeCalledWith(context)
    expect(up1).toBeCalledTimes(1)
})
