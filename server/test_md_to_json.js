const fs = require('fs');
const readline = require('readline');
var SimpleMarkdown = require("simple-markdown");

var mdParse = SimpleMarkdown.defaultBlockParse;
let writeStream = fs.createWriteStream('clean_javascript_questions.md');
let readFile = fs.readFile;

async function markdownToJS() {
  const fileStream = fs.createReadStream('javascript_questions.md');
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
    mdToJson(markdownVar);
  })
}

function mdToJson(mdStr) {
  // dictionary of questions for this category
  let questionDict = {};
  let questionCategory;
  var syntaxTree = mdParse(mdStr);
  let syntaxTreeStr = JSON.stringify(syntaxTree, null, 4);

  let categoryContent = syntaxTree[0];
  let categoryStr = parseCategoryContent(categoryContent);

  //let messyQuestions = JSON.stringify(syntaxTree[1], null, 4);
  let allQuestions = syntaxTree[1].items;

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
  })

  console.log('questionDict', questionDict);

  //TODO convert questionDict to a separate file
}

markdownToJS();

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

