// Use os.cpus times as the total elapsed time
const os = require('os');
const NUMBER_OF_CPUS = os.cpus().length;

let cpus = os.cpus();
let startUsage = process.cpuUsage()

function doStuff() {
  // spin the CPU for 500 milliseconds

  let now = Date.now()

  while (Date.now() - now < 500);

  let newCpus = os.cpus();
  let newStartUsage = process.cpuUsage();

  let elapCpuTimeMs = totalCpusTime(newCpus) - totalCpusTime(cpus);
  let elapUsage = process.cpuUsage(startUsage)

  cpus = newCpus;
  startUsage = newStartUsage;

  let elapUserMS = elapUsage.user / 1000; // microseconds to milliseconds
  let elapSystMS = elapUsage.system / 1000;
  let cpuPercent = (100 * (elapUserMS + elapSystMS) / elapCpuTimeMs).toFixed(1) + '%'

  console.log('elapsed time ms:  ', elapCpuTimeMs)
  console.log('elapsed user ms:  ', elapUserMS)
  console.log('elapsed system ms:', elapSystMS)
  console.log('cpu percent:      ', cpuPercent, '\n')
  setTimeout(doStuff, 1000);
}
doStuff();

function _totalCpuTime(cpu) {
  // millis
  if (!cpu || !cpu.times) return 0;
  const { user, nice, sys, idle, irq } = cpu.times;

  return user + nice + sys + idle + irq;
}

function totalCpusTime(cpus) {
  return cpus.map(_totalCpuTime).reduce((a, b) => a + b, 0);
}
