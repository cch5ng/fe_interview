const fs = require('fs');
const readline = require('readline');
var SimpleMarkdown = require("simple-markdown");

var mdParse = SimpleMarkdown.defaultBlockParse;
let readFile = fs.readFile;
let writeFile = fs.writeFile;
const questionFileSrcList = [
  'coding-questions.md',
  'javascript-questions.md',
  'css-questions.md',
  'fun-questions.md',
  'general-questions.md',
  'html-questions.md',
  'network-questions.md',
  'performance-questions.md',
  'testing-questions.md'
];

/**
 * @param {string} fileName
 * @return none
 * Used to convert a set of questions in markdown to a JSON formatted files
 */
async function markdownToStr(fileName) {
  const srcPathPrefix = `./question_src/`;
  const fileStream = fs.createReadStream(`${srcPathPrefix}${fileName}`);
  let markdownVar = '';

  fileStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    let cleanLine = line;
    while (cleanLine.indexOf("`") > -1) {
      cleanLine = cleanLine.replace("`", "^");
    }
    cleanLine = cleanLine + '\n';
    markdownVar += `${cleanLine}`;
  });

  rl.on('close', () => {
    strToJson(markdownVar, fileName);
  })
}

/**
 * @param {string} mdStr
 * @param {string} fileName
 * Given a string containing a group of questions, parses questions and outputs a JSON formatted file.
 * Result is in object format, with question categories used as keys.
 */
function strToJson(mdStr, fileName) {
  // dictionary of questions for this category
  let questionDict;
  let questionCategory;
  var syntaxTree = mdParse(mdStr);

  let syntaxTreeStr = JSON.stringify(syntaxTree, null, 4);
  let categoryContent = syntaxTree[0];
  let categoryStr = parseCategoryContent(categoryContent);

  const outputPathPrefix = `./question_output/`;
  const outputFileName = updateFileExtension(fileName);

  if (categoryStr === 'Coding Questions') {
    questionDict = parseCodingQuestions(syntaxTree, categoryStr);
  } else {
    questionDict = parseGeneralQuestions(syntaxTree, categoryStr);
  }

  let fileStr = JSON.stringify(questionDict, null, 4);
  fileStr = `module.exports = ${fileStr}`

  writeFile(`${outputPathPrefix}${outputFileName}`, fileStr, (err) => {
    if (err) throw err;
    console.log(`${outputPathPrefix}${outputFileName} file created`);
  })
}

questionFileSrcList.forEach(qFile => {
  markdownToStr(qFile);
})

/**
 * @param {obj} syntaxTree - khan lib syntax tree for category content
 * @return {str} string version of current questions category
 *
 */
function parseCategoryContent(syntaxTree) {
  let longStr = '';
  syntaxTree.content.forEach(cObj => {
    if (cObj.type === 'text') {
      longStr += cObj.content;
    }
  });

  let paraAr = longStr.split('\n');
  let categoryLongStr = paraAr[1]
  let categoryShortStr = categoryLongStr.split('title: ')[1];
  
  return categoryShortStr;
}

/**
 * @param {array of strings} childArray
 * @return {string} longChildStr
 * For the current question (parent), gets all content for its child questions (0 - many)
 * and parses that into one long string, delimiter '\n' for multiple questions
 */
function parseChildQuestionsStr(childArray) {
  let longChildStr = '';

  childArray.forEach((subItem, subIdx) => {
    let childQuestionStr = '';
    subItem.forEach((subItemSubstring, subStrIdx) => {
      childQuestionStr += subItemSubstring.content;
    });
    childQuestionStr += `\n`;
    longChildStr += childQuestionStr;
  });

  return longChildStr;
}

/**
 * @param {string} fileName
 * @return {string} new file name (JS format)
 * Given a filename (markdown source) outputs a new filename (same name, JS extension)
 */
function updateFileExtension(fileName) {
  let fileNameAr = fileName.split('.');

  return `${fileNameAr[0]}.js`;
}

/**
 * @param {obj} syntaxTree - data format output by Khan academy library for markdown to JS conversion
 * @param {string} category - type of question being parsed
 * @return {obj} dictionary of questions by category
 * Parsing logic for all question types except coding questions.
 */
function parseGeneralQuestions(syntaxTree, category) {
  let allQuestions = syntaxTree[1].items;
  let questionDict = {};

  allQuestions.forEach((ar, outIdx) => {
    let id;
    let questionObj = {};
    let questionText = '';
    let allChildStrings = null;
    // each array represents a high level question
    ar.forEach((obj, inIdx) => {
      if (obj.type === 'text') {
        questionText += obj.content;
      }
      //case need to parse child questions
      if (obj.type === 'list') {
        allChildStrings = parseChildQuestionsStr(obj.items);
      }
    });

    id = `${category}${outIdx}`;
    questionObj.id = id;
    questionObj.content = questionText;
    questionObj.child_content = allChildStrings;
    questionObj.category = category;
    questionObj.sort_order = outIdx;
    questionDict[id] = questionObj;
  });

  return questionDict;
}

/**
 * @param {obj} syntaxTree - data format output by Khan academy library for markdown to JS conversion
 * @param {string} category - type of question being parsed
 * @return {obj} Dictionary of questions for coding category
 */
function parseCodingQuestions(syntaxTree, category) {

  let questionDict = {};

  syntaxTree.forEach((qObj, idx) => {
    let questionObj = {};
    let id;
    let questionText = '';

    // skip category
    if (idx !== 0) {
      qObj.content.forEach(inObj => {
        if (qObj.type === 'paragraph') {
          questionText += inObj.content;
        }
      })
      id = `${category}${idx}`;
      questionObj.id = id;
      questionObj.content = questionText;
      questionObj.category = category;
      questionObj.sort_order = idx;
      questionDict[id] = questionObj;
    }
  });

  return questionDict;
}
