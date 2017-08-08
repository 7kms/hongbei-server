import koaBody from 'koa-body'
import compose from 'koa-compose'

// import convert from 'koa-convert'

export default () => {
    return compose([
        koaBody({ multipart: true })
    ])
}