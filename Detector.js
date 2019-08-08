class Detector {
    constructor() {
        this.registers = { A: 0, B: 0, C: 0, D: 0 };
        this.changes = [];
    }

    captureChanges(machine, program) {
        machine.load(program.join("\n"));
        machine.execute();
        const table = machine.getTable();
        table.forEach(this.validateStep.bind(this));
    }

    validateStep(step) {
        Object.keys(this.registers).forEach(register => {
            if (this.hasChanged(register, step)) {
                this.updateChanges(step, register);
            }
        });
    }

    updateChanges(step, register) {
        this.changes.push({
            lineNo: step.CL,
            register: register,
            value: step[register]
        });
        this.registers[register] = step[register];
    }

    hasChanged(register, step) {
        return this.registers[register] != step[register];
    }

    getChanges() {
        return this.changes;
    }
}

module.exports = Detector;
