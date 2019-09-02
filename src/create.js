// create 所有的逻辑

// https://api.github.com/users/goofyrepo/repos 仓库地址

const axios = require('axios');
const ora = require('ora');
const inquirer = require('inquirer');
const { promisify } = require('util');
let downLoadGitRepo = require('download-git-repo');

downLoadGitRepo = promisify(downLoadGitRepo);
const { downloadDir } = require('./constants');

// 1)  获取仓库列表
const fetchRepoList = async () => {
  const { data } = await axios.get('https://api.github.com/users/goofyrepo/repos');
  return data;
};

// 封装loading效果
const waitFnLoading = async (fn, message) => {
  const spinner = ora(message);
  spinner.start();
  const result = await fn();
  spinner.succeed();
  return result;
};
const download = async (repo) => {
  const api = `goofyrepo/${repo}`;
  const dest = `${downloadDir}/${repo}`;
  await downLoadGitRepo(api, dest);
  return dest;
};

module.exports = async (projectName) => {
  // 1)  获取项目模版

  let repos = await waitFnLoading(fetchRepoList, 'fetching Template');

  repos = repos.map((item) => item.name);
  console.log(repos);
  // loading
  // 选择模版 inquirer
  const { repo } = await inquirer.prompt({
    name: 'repo', // 获取选择后的结果
    type: 'list',
    message: 'choose a template to create project',
    choices: repos,
  });
  console.log(repo);
  // 把模版放在临时目录中

  // download
  const resl = await download(repo);
  console.log('dir', resl);

  // 简单文件直接拷贝


  // 复杂模版渲染 渲染后拷贝
};
