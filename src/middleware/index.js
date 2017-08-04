import bodyparser from 'koa-bodyparser'
import compose from 'koa-compose'

// import convert from 'koa-convert'

export default () => {
    return compose([
        bodyparser()
    ])
}