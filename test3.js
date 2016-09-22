// dividing elapsed time by the number of cores

const os = require('os');
const NUMBER_OF_CPUS = os.cpus().length;

let startTime  = process.hrtime()
let startUsage = process.cpuUsage()

function doStuff() {
  // spin the CPU for 500 milliseconds

  let now = Date.now()

  while (Date.now() - now < 500);

  let newStartTime = process.hrtime();
  let newStartUsage = process.cpuUsage();

  let elapTime = process.hrtime(startTime)
  let elapUsage = process.cpuUsage(startUsage)

  startTime = newStartTime;
  startUsage = newStartUsage;

  let elapTimeMS = hrtimeToMS(elapTime)

  let elapUserMS = elapUsage.user / 1000; // microseconds to milliseconds
  let elapSystMS = elapUsage.system / 1000;
  let cpuPercent = (100 * (elapUserMS + elapSystMS) / elapTimeMS / NUMBER_OF_CPUS).toFixed(1) + '%'

  console.log('elapsed time ms:  ', elapTimeMS)
  console.log('elapsed user ms:  ', elapUserMS)
  console.log('elapsed system ms:', elapSystMS)
  console.log('cpu percent:      ', cpuPercent, '\n')
  setTimeout(doStuff, 1000);
}
doStuff();

function hrtimeToMS (hrtime) {
  return hrtime[0] * 1e3 + hrtime[1] / 1e6
}
