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
export let print = debug('hongbei-server');


export let getClientIp = (req) => {
  var ipAddress;
  var forwardIpStr = req.headers['x-forwarded-for'];
  if (forwardIpStr) {
      var forwardIp = forwardIpStr.split(',');
      ipAddress = forwardIp[0];
  }
  if (!ipAddress) {
      ipAddress = req.connection.remoteAdress;
  }
  if (!ipAddress) {
      ipAddress = req.socket.remoteAdress;
  }
  if (!ipAddress) {
      if (req.connection.socket) {
          ipAddress = req.connection.socket.remoteAdress;
      }
      else if (req.headers['remote_addr']) {
          ipAddress = req.headers['remote_addr'];
      }
      else if (req.headers['client_ip']) {
          ipAddress = req.headers['client_ip'];
      }
      else {
          ipAddress = req.ip;
      }

  }
  return ipAddress;
};