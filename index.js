'use strict';

// IMPORTS ///////////////

const { expect } = require('chai');
const Mocha = require('mocha');
const mocha = new Mocha({ui: 'bdd'});

// CODE ///////////////

const DIRECTIONS = {
  N: 1,
  E: 2,
  S: 3,
  W: 4
}

const DIRECTIONS_REVERSE = {
  1: "N",
  2: "E",
  3: "S",
  4: "W"
}

class Rover {
  
  constructor() {
    this.facing = DIRECTIONS.N;
    this.y = 0;
    this.x = 0;
  }
  
  setPosition(x,y) {
    this.x = Number(x);
    this.y = Number(y);
  }
  
  setX(x) {
    this.x = Number(x);
  }
  setY(y) {
    this.y = Number(y)
  }
  
  processCommand(command) {
    
    switch(command) {
      case "R":
        this.turnRight();
        break;
      case "L":
        this.turnLeft();
        break;
       case "M":
        this.move();
        break;
      default:
        console.error("Please provide a valid command: L left, R right, M move. ", command, " is not valid.");
        break;
    }
  }
  
  turnLeft() {
    if(this.facing == DIRECTIONS.N) {
      this.setDirection(DIRECTIONS.W);
    } else {
      this.setDirection(this.facing - 1);
    }
  }
  
  turnRight() {
    if(this.facing == DIRECTIONS.W) {
      this.setDirection(DIRECTIONS.N);
    } else {
      this.setDirection(this.facing + 1);
    }
  }
  
  move() {
    const MOVE_UNIT = Number(1);
    switch(this.facing) {
      case DIRECTIONS.N:
        this.setY(this.y + MOVE_UNIT)
        break;
     case DIRECTIONS.E:
        this.setX(this.x + MOVE_UNIT, "A");
        break;
    case DIRECTIONS.S:
        this.setY(this.y - MOVE_UNIT)
        break;
     case DIRECTIONS.W:
        this.setX(this.x - MOVE_UNIT, "B");
        break;
    }
  }
  
  setDirection(direction) {
    this.facing = direction;
  }
  
  
  positionInput(input) {
    const inputsArray = input.split(" ");
    const X_ARRAY_POSITION = 0;
    const Y_ARRAY_POSITION = 1;
    const DIRECTION_ARRAY_POSITION = 2;
    this.setPosition(Number(inputsArray[X_ARRAY_POSITION]), Number(inputsArray[Y_ARRAY_POSITION]));
    const directionValue = inputsArray[DIRECTION_ARRAY_POSITION]
    this.setDirection(DIRECTIONS[directionValue]);
  }
  
  movementInput(input) {
    const movementsArray = input.split("");
    for (var i = 0; i<movementsArray.length; i++) {
      this.processCommand(movementsArray[i]);
    }
  }
  
  output(expected, shouldPrint = false) {
    const output = String(this.x) + String(this.y) + DIRECTIONS_REVERSE[this.facing];
    if(shouldPrint) {
    console.log("output: ", output);
    console.log("expected: ", expected);
    }
    return output;
  }
   
}

// APP ///////////////

const rover1 = new Rover();
rover1.positionInput("1 2 N");
rover1.movementInput("LMLMLMLMM");

const rover2 = new Rover();
rover2.positionInput("3 3 E");
rover2.movementInput("MMRMMRMRRM");


// TEST ///////////////

mocha.suite.emit('pre-require', this, 'solution', mocha);

describe('is the rover into the right position and direction', () => {
  
  it('is into correct initial', () => {
    const rover = new Rover();
    expect(rover.facing).to.equal(DIRECTIONS.N);
    expect(rover.x).to.equal(0);
    expect(rover.y).to.equal(0);
  });
  
  it('is setDirection working', () => {
      const rover = new Rover();
      rover.setDirection(2)
      expect(rover.facing).to.equal(DIRECTIONS.E);
      rover.setDirection(3)
      expect(rover.facing).to.equal(DIRECTIONS.S);
      rover.setDirection(4)
      expect(rover.facing).to.equal(DIRECTIONS.W);
      rover.setDirection(1)
      expect(rover.facing).to.equal(DIRECTIONS.N);
  });
  
  it('is it turned left correctly', () => {
    const rover = new Rover();
    rover.turnLeft();
    expect(rover.facing).to.equal(DIRECTIONS.W);
    rover.turnLeft();
    expect(rover.facing).to.equal(DIRECTIONS.S);
    rover.turnLeft();
    expect(rover.facing).to.equal(DIRECTIONS.E);
    rover.turnLeft();
    expect(rover.facing).to.equal(DIRECTIONS.N);
  });

  it('is it turned Right correctly', () => {
    const rover = new Rover();
    rover.turnRight();
    expect(rover.facing).to.equal(DIRECTIONS.E);
    rover.turnRight();
    expect(rover.facing).to.equal(DIRECTIONS.S);
    rover.turnRight();
    expect(rover.facing).to.equal(DIRECTIONS.W);
    rover.turnRight();
    expect(rover.facing).to.equal(DIRECTIONS.N);
  });
  
  it('is it moving correctly', () => {
    const rover = new Rover();
    var x = rover.x;
    var y = rover.y;
  
    // moving on the y
    // test N
    rover.move();
    y++;
    expect(rover.y).to.equal(y);

    // test S
    rover.facing = DIRECTIONS.S;
    rover.move();
    y--;
    expect(rover.y).to.equal(y);

    // moving on the x
    // test E
    rover.facing = DIRECTIONS.E;
    rover.move();
    x++;
    expect(rover.x).to.equal(x);
    // test W
    rover.facing = DIRECTIONS.W;
    rover.move();
    x--;
    expect(rover.x).to.equal(x);
  
    // move 3 times
    rover.facing = DIRECTIONS.E;
    rover.move();
    rover.move();
    rover.move();
    x = x + 3;
    expect(rover.x).to.equal(x);

  });
  
  
  it('Test case 1', () => {
    const expectedOutput = "13N";
    const rover = new Rover();
    rover.positionInput("1 2 N");
    rover.movementInput("LMLMLMLMM");
    expect(rover.output(expectedOutput)).to.equal(expectedOutput);
  });  
    

  it('Test case 2', () => {
    const expectedOutput = "51E";
    const rover = new Rover();
    rover.positionInput("3 3 E");
    rover.movementInput("MMRMMRMRRM");
    expect(rover.output(expectedOutput)).to.equal(expectedOutput);
  }); 

});


mocha.run(function() {});


