class Grader{
    constructor(){
        this.marks = 0;
    }

    grade(actual, expected, numberOfLines, numberOfLinesExecuted){
        if(actual == expected){
            this.marks += 60;
        }
        
        const executionRatio = Math.ceil(numberOfLinesExecuted/numberOfLines);
        switch(executionRatio){
            case 1:
            case 2:
                this.marks+=40;
                break;
            case 3:
                this.marks+=25;
                break;
            case 3:
                this.marks+=10;
                break;
        }
        return this.marks;
    }
}

module.exports = Grader;