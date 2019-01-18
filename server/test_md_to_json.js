const fs = require('fs');
const readline = require('readline');
var SimpleMarkdown = require("simple-markdown");

var mdParse = SimpleMarkdown.defaultBlockParse;
//let writeStream = fs.createWriteStream('clean_javascript_questions.md');
let readFile = fs.readFile;
let writeFile = fs.writeFile;
const questionFileSrcList = [
  'coding-questions.md'//,
  // 'javascript-questions.md',
  // 'css-questions.md',
  // 'fun-questions.md',
  // 'general-questions.md',
  // 'html-questions.md',
  // 'network-questions.md',
  // 'performance-questions.md',
  // 'testing-questions.md'
];

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

function strToJson(mdStr, fileName) {
  // dictionary of questions for this category
  let questionDict; // = {};
  let questionCategory;
  var syntaxTree = mdParse(mdStr);

  let syntaxTreeStr = JSON.stringify(syntaxTree, null, 4);
  console.log('syntaxTreeStr', syntaxTreeStr);

  let categoryContent = syntaxTree[0];
  let categoryStr = parseCategoryContent(categoryContent);

  const outputPathPrefix = `./question_output/`;
  const outputFileName = updateFileExtension(fileName);

  //TODO starting here to around line 82, branch coding questions vs remaining questions
  //let messyQuestions = JSON.stringify(syntaxTree[1], null, 4);

  if (categoryStr === 'Coding Questions') {
    questionDict = parseCodingQuestions(syntaxTree, categoryStr);
  } else {
    questionDict = parseGeneralQuestions(syntaxTree, categoryStr);
  }

  console.log('questionDict', questionDict);

  writeFile(`${outputPathPrefix}${outputFileName}`, JSON.stringify(questionDict, null, 4), (err) => {
    if (err) throw err;

    console.log(`${outputPathPrefix}${outputFileName} file created`);
  })
}

questionFileSrcList.forEach(qFile => {
  markdownToStr(qFile);
})

//markdownToJS();

/**
 * @param {obj} khan lib syntax tree for category content
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

// for one parent question, gets all content for its child questions (0 - many)
// parses that into one long string, delimiter '\n' for multiple questions
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

// replaces "`" with "^"; and adds \n char
// function reformatQuestionStr(str) {

// }

// helper which updates original file extension from md to js
function updateFileExtension(fileName) {
  let fileNameAr = fileName.split('.');

  return `${fileNameAr[0]}.js`;
}

// all questions except coding
// input syntax tree
// output question dict
function parseGeneralQuestions(syntaxTree, category) {
  let allQuestions = syntaxTree[1].items;
  let questionDict = {};

  //console.log('fileName', fileName);
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

    id = `${questionText.slice(0, 10)}${questionText.slice(questionText.length - 11)}`;
    questionObj.id = id;
    questionObj.text = questionText;
    questionObj.allChildStrings = allChildStrings;
    questionObj.category = categoryStr;

    questionDict[id] = questionObj;
  });

  return questionDict;
}

// only coding questions
// input syntax tree
// output question dict
function parseCodingQuestions(syntaxTree, category) {

  let questionDict = {};

  syntaxTree.forEach((qObj, idx) => {
    let questionObj = {};
    let id;
    // skip category
    if (idx !== 0) {
      let questionText = '';
      qObj.content.forEach(inObj => {
        if (qObj.type === 'paragraph') {
          questionText += inObj.content;
        }
      })
    }

    id = `${questionText.slice(0, 10)}${questionText.slice(questionText.length - 11)}`;
    questionObj.id = id;
    questionObj.text = questionText;
    questionObj.category = category;

    questionDict[id] = questionObj;
  });

  return questionDict;
}

