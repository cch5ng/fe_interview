module.exports = {
    "Coding Questions1": {
        "id": "Coding Questions1",
        "content": "Question: What is the value of ^foo^?\n^^^javascript\nvar foo = 10 + '20';\n^^^",
        "category": "Coding Questions",
        "sort_order": 1
    },
    "Coding Questions2": {
        "id": "Coding Questions2",
        "content": "Question: What will be the output of the code below?\n^^^javascript\nconsole.log(0.1 + 0.2 == 0.3);\n^^^",
        "category": "Coding Questions",
        "sort_order": 2
    },
    "Coding Questions3": {
        "id": "Coding Questions3",
        "content": "Question: How would you make this work?\n^^^javascript\nadd(2, 5); // 7\nadd(2)(5); // 7\n^^^",
        "category": "Coding Questions",
        "sort_order": 3
    },
    "Coding Questions4": {
        "id": "Coding Questions4",
        "content": "Question: What value is returned from the following statement?\n^^^javascript\n\"i'm a lasagna hog\".split(\"\").reverse().join(\"\");\n^^^",
        "category": "Coding Questions",
        "sort_order": 4
    },
    "Coding Questions5": {
        "id": "Coding Questions5",
        "content": "Question: What is the value of ^window.foo^?\n^^^javascript\n( window.foo || ( window.foo = \"bar\" ) );\n^^^",
        "category": "Coding Questions",
        "sort_order": 5
    },
    "Coding Questions6": {
        "id": "Coding Questions6",
        "content": "Question: What is the outcome of the two alerts below?\n^^^javascript\nvar foo = \"Hello\";\n(function() {\n  var bar = \" World\";\n  alert(foo + bar);\n})();\nalert(foo + bar);\n^^^",
        "category": "Coding Questions",
        "sort_order": 6
    },
    "Coding Questions7": {
        "id": "Coding Questions7",
        "content": "Question: What is the value of ^foo.length^?\n^^^javascript\nvar foo = [];\nfoo.push(1);\nfoo.push(2);\n^^^",
        "category": "Coding Questions",
        "sort_order": 7
    },
    "Coding Questions8": {
        "id": "Coding Questions8",
        "content": "Question: What is the value of ^foo.x^?\n^^^javascript\nvar foo = {n: 1};\nvar bar = foo;\nfoo.x = foo = {n: 2};\n^^^",
        "category": "Coding Questions",
        "sort_order": 8
    },
    "Coding Questions9": {
        "id": "Coding Questions9",
        "content": "Question: What does the following code print?\n^^^javascript\nconsole.log('one');\nsetTimeout(function() {\n  console.log('two');\n}, 0);\nPromise.resolve().then(function() {\n  console.log('three');\n})\nconsole.log('four');\n^^^",
        "category": "Coding Questions",
        "sort_order": 9
    },
    "Coding Questions10": {
        "id": "Coding Questions10",
        "content": "Question: What is the difference between these four promises?\n^^^javascript\ndoSomething().then(function () {\n  return doSomethingElse();\n});\ndoSomething().then(function () {\n  doSomethingElse();\n});\ndoSomething().then(doSomethingElse());\ndoSomething().then(doSomethingElse);\n^^^",
        "category": "Coding Questions",
        "sort_order": 10
    }
}