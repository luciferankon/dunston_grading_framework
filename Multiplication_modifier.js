class MultiplicationModifier {
    constructor(program, changes, inputs) {
        this.program = program;
        this.firstTwoChanges = changes.slice(0, 2);
        this.inputs = inputs;
        this.index = 0;
    }

    modify() {
        this.firstTwoChanges.forEach(change => {
            const lineIndex = change["lineNo"] / 10 - 1;
            const value = this.inputs[this.index++];
            const instruction = "mov " + change["register"] + "," + value;
            const updatedLine = change["lineNo"] + " " + instruction;
            this.program[lineIndex] = updatedLine;
        });
        return this.program;
    }
}

module.exports = MultiplicationModifier;
