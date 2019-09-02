// create 所有的逻辑

// https://api.github.com/users/goofyrepo/repos 仓库地址

const axios = require('axios');

// 1)  获取仓库列表
const fetchRepoList = async () => {
  const { data } = await axios.get('https://api.github.com/users/goofyrepo/repos');
  return data;
};

module.exports = async (projectName) => {
  // 1)  获取项目模版
  let repos = await fetchRepoList();
  repos = repos.map((item) => item.name);
  console.log(repos);

  // loading
};
