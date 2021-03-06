
// 1) 解析用户的参数
const program = require('commander');
const path = require('path');

const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'goo-react-cli create <projct-name>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action)
    .alias(mapActions[action].alias)
    .description(mapActions[action].description)
    .action(() => {
      if (action === '*') {
        console.log(mapActions[action].description);
      } else {
        console.log(action);
        if (action === 'create') {
          // create <projectName>
          console.log('argvs', process.argv);
          require(path.resolve(__dirname, action))(...process.argv.slice(3));
        }
      }
    });
});

// help
program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(example);
    });
  });
});

program.version('1.0.0').parse(process.argv);
