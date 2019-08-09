const Detector = require("./src/Detector");
const detector = new Detector();

const Machine = require("@craftybones/assembly_simulator");
const machine = new Machine();

const Modifier = require("./src/Multiplication_modifier");

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

const grade = function(actual, expected, executionRatio){
    let marks = 0;
    if(actual != expected){
        return marks;
    }
    
    marks += 60;
    marks += 80/executionRatio;
    return marks;
}

detector.captureChanges(machine, program);
const changes = detector.getChanges();
const modifier = new Modifier();
const inputs = [3, 200];

program = modifier.modify(program, changes, inputs);

machine.load(program.join("\n"));
machine.execute();
const numberOfLinesExecuted = machine.getTable().length;
const answer = machine.getPrn()[0];

const linesAllowed = inputs.reduce((a, b) => a * b, 1);
const executionRatio = Math.ceil(numberOfLinesExecuted / linesAllowed);
const marks = grade(answer, 600, executionRatio);

console.log(marks);
