const fs = require('fs');
const readline = require('readline');
var SimpleMarkdown = require("simple-markdown");

var mdParse = SimpleMarkdown.defaultBlockParse;
let writeStream = fs.createWriteStream('clean_javascript_questions.md');
let readFile = fs.readFile;

async function processLineByLine() {
  const fileStream = fs.createReadStream('javascript_questions.md');

  fileStream.on('data', (chunk) => {
  	console.log(`Received ${chunk.length} bytes of data.`);
  });

  //console.log('fileStream', fileStream);

  const rl = readline.createInterface({
    input: fileStream,
    //output: cleanStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  rl.on('line', (line) => {
	//console.log(`Received: ${line}`);
	let cleanLine = line;
	while (cleanLine.indexOf("`") > -1) {
		cleanLine = cleanLine.replace("`", "^");
	}
	cleanLine = cleanLine + '\n';

	//console.log(`Cleaned as: ${cleanLine}`);
	writeStream.write(cleanLine, 'utf8');
  });

  rl.on('close', () => {
	  writeStream.end();
    fileToVar();
  })

  //mdToJson();

  // for (const line of rl) { //await
  //   // Each line in input.txt will be successively available here as `line`.
  //   console.log(`Line from file: ${line}`);
  // }
}

async function fileToVar() {
  const fileStream = fs.createReadStream('clean_javascript_questions.md');
  let markdownVar = '';

  fileStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
  });

  //console.log('fileStream', fileStream);

  const rl = readline.createInterface({
    input: fileStream,
    //output: cleanStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  rl.on('line', (line) => {
    //console.log(`Received: ${line}`);
    markdownVar += `${line}\n`;

  });

  rl.on('close', () => {
    console.log('finished markdownVar')

    //console.log('markdownVar', markdownVar);
    //console.log('markdownVar', markdownVar);
    mdToJson(markdownVar)
    //writeStream.end();
  })

  //mdToJson();


}

function mdToJson(mdStr) {
  // dictionary of questions for this category
  let questionDict = {};
  let questionCategory;

  //const markdownContent = readFile('clean_javascript_questions.md', (err, data) => {
  //  if (err) throw err;
//  console.log('markdownContent', markdownContent);
  //  console.log('data', data)
  //console.log('gets here')
  var syntaxTree = mdParse(mdStr);
  //console.log('syntaxTree', syntaxTree);

  let syntaxTreeStr = JSON.stringify(syntaxTree, null, 4);
  //console.log(JSON.stringify(syntaxTree, null, 4));

  //console.log('syntaxTreeStr', syntaxTreeStr);

  // TODO get the question type
  let categoryContent = syntaxTree[0];
  let categoryStr = parseCategoryContent(categoryContent);
  console.log('categoryStr', categoryStr);

  let messyQuestions = JSON.stringify(syntaxTree[1], null, 4);
  //console.log('messyQuestions', messyQuestions)

  let questionsCount = syntaxTree[1].items.length;
  //console.log('questionsCount', questionsCount)

  //let fiveQuestions = syntaxTree[1].items.slice(0, 5);
  //console.log(JSON.stringify(fiveQuestions, null, 4));

  let allQuestions = syntaxTree[1].items;
  //console.log(JSON.stringify(allQuestions, null, 4));


  //let fiveQuestionsStrAr = 

  allQuestions.forEach((ar, outIdx) => {
  //fiveQuestions.forEach((ar, outIdx) => {
    // TODO generate id
    let id;
    let questionObj = {};
    let questionText = '';
    let childDict = {};
    // each array represents a high level question
    ar.forEach((obj, inIdx) => {
      if (obj.type === 'text') {
        questionText += obj.content;
      }
      if (obj.type === 'list') {
        console.log('outIdx: ', outIdx);
        console.log('sublist at inIdx: ', inIdx);

        let childObj = {};
        childObj.parentId = null;
        let childText = '';

        obj.items.forEach((subItem, subIdx) => {
          childText += subItem[0].content;
        })

        let childId = `${childText.slice(0, 11)}${childText.slice(childText.length - 11)}`;
        childObj.id = childId;
        childObj.text = childText;
        childObj.category = categoryStr;
        childDict[childId] = childObj;
        //childObj.parentId = ;
      }
    });

    //console.log('questionText', questionText);

    //console.log('childDict', childDict);

    id = `${questionText.slice(0, 10)}${questionText.slice(questionText.length - 11)}`;

    Object.keys(childDict).forEach(childKey => {
      childDict[childKey].parentId = id;
    })

    //console.log('childDict', childDict);    

    questionObj.id = id;
    questionObj.text = questionText;
    questionObj.childIdList = Object.keys(childDict);

    questionDict[id] = questionObj;
    //return questionStr;
  })

  console.log('questionDict', questionDict);

  //})
//  console.log('syntaxTree', syntaxTree)

//  console.log('syntaxTree[0]', syntaxTree[0])



//  writeStream2.write(syntaxTree, 'utf8');
}

processLineByLine();


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
  //console.log('categoryLongStr', categoryLongStr);
  let categoryShortStr = categoryLongStr.split('title: ')[1];
  
  return categoryShortStr;
}
