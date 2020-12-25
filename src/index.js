"use strict";
const nodemailer = require('nodemailer');
const axios = require('axios')
const schedule = require("node-schedule");

async function getHoneyedWords() {
  var url = "https://chp.shadiao.app/api.php";
  //获取这个接口的信息
  const { data } = await axios.get(url);
  return data
}

async function send({ smtp, from, pass, name, to, mailTitle, text }) {
  let transporter = nodemailer.createTransport({
    host: smtp,
    port: 587,
    secure: false,
    auth: {
      user: from,
      pass: pass,
    },
  });

  let info = await transporter.sendMail({
    from: `"${name}" <${from}>`,
    to: to,
    subject: mailTitle,
    text: text,
    // html: "<b>Hello world?</b>",
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log("Message sent: %s", info.messageId);
}

//每天下午5点21分发送
schedule.scheduleJob({ hour: 17, minute: 21 }, () => {
  console.log('启动任务：' + new Date());
  mainProcess()
});

async function mainProcess() {
  const text = await getHoneyedWords()
  const params = { 
    smtp: 'smtp.qq.com',
    from: '1845543324@qq.com',
    pass: 'emnsokstaiukeaeb',
    name: 'luyuan 👻👻👻',
    to: '18392709319@163.com',
    mailTitle: 'Hello',
    text
  }
  await send(params)
}