import Logger from 'mini-logger'
import debug from 'debug'
import config from '../../config'

/**
 * log记录 用法: logger.error(new Error(''))
 * */
export let logger = Logger({
  dir: config.dir.logdir,
  format: 'YYYY-MM-DD-[{category}][.log]'
})

/**
 * debug plugin
 */
export let print = debug('server')