// divide process times by elapsed hrtime

var startTime  = process.hrtime()
var startUsage = process.cpuUsage()

setInterval(function () {


  // spin the CPU for 500 milliseconds

  var now = Date.now()

  while (Date.now() - now < 500);

  let newStartTime = process.hrtime();
  let newStartUsage = process.cpuUsage();

  var elapTime = process.hrtime(startTime)
  var elapUsage = process.cpuUsage(startUsage)

  startTime = newStartTime;
  startUsage = newStartUsage;

  var elapTimeMS = hrtimeToMS(elapTime)

  var elapUserMS = elapUsage.user / 1000; // microseconds to milliseconds
  var elapSystMS = elapUsage.system / 1000;
  var cpuPercent = (100 * (elapUserMS + elapSystMS) / elapTimeMS).toFixed(1) + '%'

  console.log('elapsed time ms:  ', elapTimeMS)
  console.log('elapsed user ms:  ', elapUserMS)
  console.log('elapsed system ms:', elapSystMS)
  console.log('cpu percent:      ', cpuPercent, '\n')

}, 1000);

function hrtimeToMS (hrtime) {
  return hrtime[0] * 1e3 + hrtime[1] / 1e6
}
