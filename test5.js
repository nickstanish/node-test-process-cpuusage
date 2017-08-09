// set activity monitory update frequency to 2 seconds

// divide process times by elapsed hrtime
var startTime  = process.hrtime()
var startUsage = process.cpuUsage()

run();
function run() {
  print(startTime, startUsage);

  startTime = process.hrtime();
  startUsage = process.cpuUsage();

  var now = Date.now()

  var randomLength = Math.random() * 750 + 750; // should be less than 2000 as max
  var timeout = 2000 - randomLength;
  while (Date.now() - now < randomLength);

  setTimeout(run, timeout);
};

function print(startTime, startUsage) {
  var elapTimeMS = hrtimeToMS(process.hrtime(startTime));
  var elapUsageMS = usageToTotalUsageMS(process.cpuUsage(startUsage));
  var cpuPercent = (100.0 * elapUsageMS / elapTimeMS).toFixed(1) + '%';

  console.log('elapsed time ms:  ', elapTimeMS)
  console.log('elapsed usage ms: ', elapUsageMS)
  console.log('cpu percent:      ', cpuPercent, '\n')
}

function usageToTotalUsageMS(elapUsage) {
  var elapUserMS = elapUsage.user / 1000.0; // microseconds to milliseconds
  var elapSystMS = elapUsage.system / 1000.0;
  return elapUserMS + elapSystMS;
}

function hrtimeToMS (hrtime) {
  return hrtime[0] * 1000.0 + hrtime[1] / 1000000.0;
}
