const shell = require('shelljs');

const schedule = require("node-schedule");

schedule.scheduleJob({ hour: 11, minute: 10 }, () => {
  console.log('启动任务：' + new Date());
  shell.exec(`open -a Terminal /usr/local/bin/login-docker/deployfebook.sh`);
});