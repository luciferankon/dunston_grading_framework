const Detector = require("./src/Detector");
const detector = new Detector();

const Machine = require("@craftybones/assembly_simulator");
const machine = new Machine();

const Modifier = require("./src/Multiplication_modifier");
const Grader = require('./src/Grader');

let program = [
    "10 START",
    "20 mov b,5",
    "30 mov a,10",
    "40 mov c,0",
    "50 mov d,0",
    "60 cmp a,c",
    "70 jle 110",
    "80 add d,b",
    "90 sub a,1",
    "100 jmp 60",
    "110 prn d",
    "120 STOP"
];

detector.captureChanges(machine, program);
const changes = detector.getChanges();
const modifier = new Modifier();

program = modifier.modify(program, changes, [3, 2]);

machine.load(program.join("\n"));
machine.execute();
const numberOfLinesExecuted = machine.getTable().length;
const answer = machine.getPrn()[0];

const grader = new Grader();
const marks = grader.grade(answer, 6, program.length, numberOfLinesExecuted);

console.log(marks);