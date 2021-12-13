import { RabbitChaser } from ".";

const RABBIT_COUNT = 5;

let rabbitStates = new Array(RABBIT_COUNT).fill(true);

const rc = new RabbitChaser(rabbitStates);

const guesses = [1,2,3,4,4,3,2,1];

for (const guess of guesses) {
  rc.checkIfRabbitAtIndex(guess);

  if (rc.rabbitsAreCaught()) {
    break
  }
}

if (rc.rabbitsAreCaught()) {
  console.log(`caught rabbits with ${rc.guesses} guesses`);
} else {
  console.log(`rabbits got away after ${rc.guesses} guesses`);
}
