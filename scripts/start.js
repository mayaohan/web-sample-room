const { run } = require('runjs');

const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ');

const awaitRun = async () => {
  run(`vite ${args}`);
};

awaitRun();
