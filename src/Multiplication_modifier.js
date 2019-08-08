class MultiplicationModifier {
    constructor() {
        this.index = 0;
    }

    modify(program, changes, inputs) {
        this.firstTwoChanges = changes.slice(0, 2);

        this.firstTwoChanges.forEach(change => {
            const lineIndex = change["lineNo"] / 10 - 1;
            const value = inputs[this.index++];
            const instruction = "mov " + change["register"] + "," + value;
            const updatedLine = change["lineNo"] + " " + instruction;
            program[lineIndex] = updatedLine;
        });
        return program;
    }
}

module.exports = MultiplicationModifier;
