/**
 * 请求上下文
 */
export interface Context<TRequest, TResponse> {
    /**
     * 请求对象
     */
    request: TRequest
    /**
     * 响应对象
     */
    response: TResponse
}

/**
 * 请求中间件
 */
export type Middleware<TRequest, TResponse> = (
    context: Context<TRequest, TResponse>,
    next: () => void | Promise<void>
) => void | Promise<void>

/**
 * 合并中间件
 * @param middleware1
 * @param middleware2
 */
export function compose<T1, U1, T2, U2>(
    middleware1: Middleware<T1, U1>,
    middleware2: Middleware<T2, U2>
): Middleware<T1 & T2, U1 & U2> {
    return (context, next) =>
        middleware1(context, () => middleware2(context, next))
}
