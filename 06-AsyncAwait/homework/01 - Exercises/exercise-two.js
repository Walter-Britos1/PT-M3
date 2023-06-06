"use strict";

let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC,
  problemDx: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

async function problemA() {
  // callback version
  exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });

  // async await version
  // Tu código acá:
  const asyncFunction = async (file) => {
    exerciseUtils.blue(await exerciseUtils.promisifiedReadFile(file))
  }

  await Promise.all([asyncFunction('poem-two/stanza-01.txt'), asyncFunction('poem-two/stanza-02.txt')]);
  console.log('done');
}

async function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // async await version
  // Tu código acá:

 const asyncFunction =  async (file) => {
    exerciseUtils.blue(await exerciseUtils.promisifiedReadFile(file))
  }
  const allPromisisfile = filenames.map(fn => asyncFunction(fn));
  await Promise.all(allPromisisfile);
  console.log('done');
}


async function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // async await version
  // Tu código acá:

  const asyncFunction =  async (filename) => {
    exerciseUtils.blue( await exerciseUtils.promisifiedReadFile(filename))
  }
  for (let i = 0; i < filenames.length; i++) {
    await  asyncFunction(filenames[i])
  }

  console.log('done');
};

async function problemD() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  });

  // async await version
  // Tu código acá:
  const asyncFunction =  async (filename) => {
    exerciseUtils.blue( await exerciseUtils.promisifiedReadFile(filename))
  }
  try {
    
  for (let i = 0; i < filenames.length; i++) {
    await  asyncFunction(filenames[i])
  }
  } catch (error) {
    exerciseUtils.magenta(error)
  }
  console.log('done');
};
