const assert = require("assert");
const Detector = require("../src/Detector");
const Machine = require("@craftybones/assembly_simulator");
const machine = new Machine();

describe("Detector Test", () => {
    let detector;
    beforeEach(() => {
        detector = new Detector();
    });
    describe("test capture changes", () => {
        it("for one change", () => {
            const program = ["10 start", "20 mov a,1", "30 stop"];

            detector.captureChanges(machine, program);
            const actual = detector.getChanges();
            const expected = [
                {
                    lineNo: "20",
                    register: "A",
                    value: 1,
                    instruction: '20 mov a,1',
                }
            ];
            assert.deepEqual(actual, expected);
        });

        it("for more than one change", () => {
            const program = ["10 start", "20 mov a,1", "30 mov b,2", "40 stop"];

            detector.captureChanges(machine, program);
            const actual = detector.getChanges();
            const expected = [
                {
                    lineNo: "20",
                    register: "A",
                    value: 1,
                    instruction: '20 mov a,1',
                },
                {
                    lineNo: "30",
                    register: "B",
                    value: 2,
                    instruction: '30 mov b,2',
                }
            ];
            assert.deepEqual(actual, expected);
        });
    });
    describe("test update changes", () => {
        it("should update the register value", () => {
            const step = {
                A: 1,
                B: 0,
                C: 0,
                D: 0,
                EQ: 0,
                NE: 0,
                GT: 0,
                LT: 0,
                CL: "20",
                NL: "30",
                PRN: undefined,
                SL: 3,
                INST: "20 mov a,1",
                STK: []
            };
            const register = "A";

            detector.updateChange(step, register);
            const actual = detector.getChanges();
            const expected = [
                {
                    lineNo: "20",
                    register: "A",
                    value: 1,
                    instruction: '20 mov a,1'
                }
            ];
            assert.deepEqual(actual, expected);
        });
    });

    describe("test validate step", () => {
        it("should update changes if register value has changed", () => {
            const step = {
                A: 1,
                B: 0,
                C: 0,
                D: 0,
                EQ: 0,
                NE: 0,
                GT: 0,
                LT: 0,
                CL: "20",
                NL: "30",
                PRN: undefined,
                SL: 3,
                INST: "20 mov a,1",
                STK: []
            };

            detector.validateStep(step);
            const actual = detector.getChanges();
            const expected = [
                {
                    lineNo: "20",
                    register: "A",
                    value: 1,
                    instruction: '20 mov a,1'
                }
            ];
            assert.deepEqual(actual, expected);
        });

        it("should not update changes if register has not changed", () => {
            const step = {
                A: 0,
                B: 0,
                C: 0,
                D: 0,
                EQ: 0,
                NE: 0,
                GT: 0,
                LT: 0,
                CL: "30",
                NL: " ",
                PRN: undefined,
                SL: 3,
                INST: "30 stop",
                STK: []
            };

            detector.validateStep(step);
            const actual = detector.getChanges();
            const expected = [];
            assert.deepEqual(actual, expected);
        });
    });

    describe("test has changed", () => {
        it("should return true if the register value has changed", () => {
            const step = {
                A: 1,
                B: 0,
                C: 0,
                D: 0,
                EQ: 0,
                NE: 0,
                GT: 0,
                LT: 0,
                CL: "20",
                NL: "30",
                PRN: undefined,
                SL: 3,
                INST: "20 mov a,1",
                STK: []
            };
            const register = "A";

            const actual = detector.hasChanged(register, step);
            const expected = true;
            assert.deepEqual(actual, expected);
        });

        it("should return false if register value has not changed", () => {
            const step = {
                A: 0,
                B: 0,
                C: 0,
                D: 0,
                EQ: 0,
                NE: 0,
                GT: 0,
                LT: 0,
                CL: "30",
                NL: " ",
                PRN: undefined,
                SL: 3,
                INST: "30 stop",
                STK: []
            };
            const register = "A";

            const actual = detector.hasChanged(register, step);
            const expected = false;
            assert.deepEqual(actual, expected);
        });
    });
});
