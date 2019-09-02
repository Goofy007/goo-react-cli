const { version } = require('../package.json');

// 存储模版文件下载目录
const downloadDir = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.gootemplate`;
console.log('down', downloadDir);
module.exports = {
  version,
  downloadDir,
};
