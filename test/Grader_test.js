const assert = require("assert");
const Grader = require("../src/Grader");

describe("Grader Test", () => {
    let grader;
    beforeEach(() => {
        grader = new Grader();
    });

    describe("test grade", () => {
        it("should return 0 if the answer is wrong", () => {
            const actual = grader.grade(1, 0, 0, 0);
            const expected = 0;
            assert.equal(actual, expected);
        });

        it("should return 60 if the answer is correct and lines are more than 4 times the actual lines", () => {
            const actual = grader.grade(1, 1, 1, 5);
            const expected = 60;
            assert.equal(actual, expected);
        });

        it("should return 70 if the answer is correct and lines are 4 times the actual lines", () => {
            const actual = grader.grade(1, 1, 1, 4);
            const expected = 70;
            assert.equal(actual, expected);
        });

        it("should return 85 if the answer is correct and lines are 3 times the actual lines", () => {
            const actual = grader.grade(1, 1, 1, 3);
            const expected = 85;
            assert.equal(actual, expected);
        });

        it("should return 100 if the answer is correct and lines are 2 times the actual lines", () => {
            const actual = grader.grade(1, 1, 1, 2);
            const expected = 100;
            assert.equal(actual, expected);
        });
    });
});
