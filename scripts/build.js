const { run } = require('runjs');

const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ');

const awaitRun = async () => {
  try {
    await run(`npm run lint`);
  } catch (error) {
    console.log('lint fail');
    return;
  }
  run(`vite build ${args}`);
};

awaitRun();
