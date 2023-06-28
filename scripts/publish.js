const { run } = require('runjs');

/**
 * 发布npm市场示例，可以根据情况修改：
 * 1.完全修改awaitRun函数为自己的脚本
 * 2.发布自己的私有库(后面xxxx改为自己的ip)
 */
const awaitRun = async () => {
  try {
    // await run('npm adduser --registry http://xxxx:4873/')
    await run('npm login');
  } catch (error) {
    console.log('login fail');
  }
  // await run('npm publish --registry http://xxxx:4873/')
  run(`npm publish`);
};

awaitRun();
