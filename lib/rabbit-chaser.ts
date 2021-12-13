import { OUT_OF_BOUND_ERROR_TYPE } from "./constants";
import { indexIsOutOfBound } from './helpers';

export class RabbitChaser {
    guesses: number = 0;
    rabbitStates: boolean[];

    constructor(rabbitStates: boolean[] | number) {
        if (typeof rabbitStates === 'number') {
            this.rabbitStates = new Array(rabbitStates).fill(false);
            return;
        }

        this.rabbitStates = rabbitStates;
    }

    checkIfRabbitAtIndex(
        index: number
    ): boolean {
        this.guesses += 1;

        if (indexIsOutOfBound(this.rabbitStates.length, index)) {
            throw {
                type: OUT_OF_BOUND_ERROR_TYPE,
                message: `Guess #${this.guesses} was out of bounds: ${index}`,
            };
        }

        const oldRabbitStates = this.rabbitStates.slice();
        oldRabbitStates[index] = false;

        const newRabbitStates = this.getNextRabbitStates(oldRabbitStates);

        this.rabbitStates = newRabbitStates;

        console.log(this.rabbitStates);

        return this.rabbitsAreCaught();
    }

    rabbitsAreCaught(): boolean {
        return this.rabbitStates.every((rabbit) => rabbit === false);
    }

    canAddLeftRabbitState(index: number) {
        return !indexIsOutOfBound(this.rabbitStates.length, index - 1);
    }

    canAddRightRabbitState(index: number) {
        return !indexIsOutOfBound(this.rabbitStates.length, index + 1);
    }

    getNextRabbitStates(rabbitStates: boolean[]): boolean[] {
        const newRabbitStates = new Array(this.rabbitStates.length).fill(false);
    
        rabbitStates.forEach((rabbit, index) => {
            if (!rabbit) {
                return;
            }

            if (this.canAddLeftRabbitState(index)) {
                newRabbitStates[index - 1] = true;
            }

            if (this.canAddRightRabbitState(index)) {
                newRabbitStates[index + 1] = true;
            }
        });
    
        return newRabbitStates;
    }
}

export class RandomRabbitChaser extends RabbitChaser {
    constructor(rabbitStates: number, startingRabbitIndex: number) {
        super(rabbitStates);
        this.rabbitStates = new Array(rabbitStates).fill(false);
        this.rabbitStates[startingRabbitIndex] = true;
    }

    getRabbitIndex(): number {
        return this.rabbitStates.indexOf(true);
    }

    getNextRabbitStates(): boolean[] {
        const previousRabbitStateIndex = this.getRabbitIndex();

        if (previousRabbitStateIndex === -1) {
            return new Array(this.rabbitStates.length).fill(false);
        }

        if (!this.canAddLeftRabbitState(previousRabbitStateIndex)) {
            return this.setRabbitStateToIndex(previousRabbitStateIndex + 1);
        }

        if (!this.canAddRightRabbitState(previousRabbitStateIndex)) {
            return this.setRabbitStateToIndex(previousRabbitStateIndex - 1);
        }

        const seed = Math.floor(Math.random() * 2);

        if (seed === 1) {
            return this.setRabbitStateToIndex(previousRabbitStateIndex + 1);
        }

        return this.setRabbitStateToIndex(previousRabbitStateIndex - 1);
    }

    setRabbitStateToIndex(index: number): boolean[] {
        const rabbitStates: boolean[] = new Array(this.rabbitStates.length).fill(false);
        rabbitStates[index] = true;
        return rabbitStates;
    }
}