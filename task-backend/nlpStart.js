const { dockStart } = require("@nlpjs/basic");

const nlpStart = async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  
  return nlp;
};

module.exports = nlpStart;