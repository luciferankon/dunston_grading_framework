const assert = require("assert");
const Modifier = require("../src/Multiplication_modifier");

describe("Multiplication modifier Test", () => {
    let modifier;
    beforeEach(() => {
        modifier = new Modifier();
    });

    describe("test modify", () => {
        it("should return modified program", () => {
            const program = ["10 start", "20 mov a,1", "30 mov b,2", "40 stop"];
            const changes = [
                {
                    lineNo: "20",
                    register: "A",
                    value: 1
                },
                {
                    lineNo: "30",
                    register: "B",
                    value: 2
                }
            ];
            const inputs = [3,4];

            const actual = modifier.modify(program, changes, inputs);
            const expected = ["10 start", "20 mov A,3", "30 mov B,4", "40 stop"];

            assert.deepEqual(actual, expected);
        });
    });
});
