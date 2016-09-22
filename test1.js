// https://github.com/nodejs/node/pull/6157#issuecomment-208950650

var startTime  = process.hrtime()
var startUsage = process.cpuUsage()

setInterval(function () {
  // spin the CPU for 500 milliseconds
  var now = Date.now()
  while (Date.now() - now < 500)

  var elapTime = process.hrtime(startTime)
  var elapUsage = process.cpuUsage(startUsage)

  var elapTimeMS = secNSec2ms(elapTime)
  var elapUserMS = secNSec2ms(elapUsage.user)
  var elapSystMS = secNSec2ms(elapUsage.system)
  var cpuPercent = Math.round(100 * (elapUserMS + elapSystMS) / elapTimeMS)

  console.log('elapsed time ms:  ', elapTimeMS)
  console.log('elapsed user ms:  ', elapUserMS)
  console.log('elapsed system ms:', elapSystMS)
  console.log('cpu percent:      ', cpuPercent)

}, 1000);


function secNSec2ms (secNSec) {
  return secNSec[0] * 1000 + secNSec[1] / 1000000
}
