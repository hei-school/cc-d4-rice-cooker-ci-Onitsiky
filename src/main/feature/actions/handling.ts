import * as readline from 'readline-sync'
import { showMenu } from '../utils/utils';
import { show } from '../../mainMenu';
import { changeState, getRiceCookerById, getRiceCookersList, startCooking } from './riceCookersAction';
import { RiceCooker } from '../../model/RiceCooker';

export function handleRiceCookersMenu() : void {
    let menu = "Choose an action: \n"
                + "1. List rice cookers\n"
                + "2. Plug in/out rice cooker\n"
                + "3. Change operational state\n"
                + "4. Return back to main menu\n"
                + "Enter your choice: ";

    showMenu(menu, [1,2,3,4], 4, handle_rc);
}

function plug_in_out(): void {
    let input = + readline.question("Enter the rice cooker id (Must be a number) : ");
    const target: RiceCooker | undefined = getRiceCookerById(input);
    if(target) {
        let currentState: boolean = target.isPlugged;
        let oppositeState: boolean = currentState === true ? false : true;
        changeState(input, 'isPlugged', oppositeState);
        console.log(`Rice cooker id: ${input} plugged ${oppositeState == true ? 'in.' : 'out.'}`);
        
    } else{
        console.error('Rice cooker with specified id not found.');
        show();
        
    }

}

function change_op_state(): void {
    let input = + readline.question("Enter the rice cooker id (Must be a number) : ");
    const target: RiceCooker | undefined = getRiceCookerById(input);
    if(target) {
        let currentState: boolean = target.isPlugged;
        let oppositeState: boolean = currentState === true ? false : true;        
        changeState(input, 'isOperationnal', oppositeState);
        console.log(`Rice cooker id: ${input} successfully updated.`);
        
    } else{
        console.error('Rice cooker with specified id not found.');
        show();
        
    }
}

export function cookMenu(): void {
    let menu = "Choose an action :\n"
                + "1. Cook rice\n"
                + "2. Boil water\n"
                + "3. Return value\n";
    showMenu(menu, [1,2,3], 3, handleCook);
}

function handleCook(choice: number): void {
    switch (choice) {
        case 1:
            cookRice();
        case 2:
            boilWater();
        case 3:
            show();
    }
}

function checkRiceCooker(id: number): boolean  | undefined{
    let target: RiceCooker | undefined = getRiceCookerById(id);
    if(target){
        let errorMessage: string = "";
        if(target.isCooking === false && target.isOperational === true && target.isPlugged === true) {
            return true;
        } else{
            if(target.isCooking === true) errorMessage += `Rice cooker id:${id} is still cooking.` 
            if(target.isOperational === false) errorMessage += `Rice cooker id:${id} is not operational.`
            if(target.isPlugged === false) errorMessage += `Rice cooker id:${id} is not plugged in. `
            console.log(errorMessage);
            return false;
        }
    } else {
        console.log(`Rice cooker id:${id} doesn't exist.`);
        
    }
}

function cookRice(): void {
    let rcId: number = +readline.question('Enter the rice cooker id to use: ');
    let waterCupsNb: number = +readline.question('Enter the number of cups of water: ');
    let riceCupsNb: number = +readline.question('Enter the number of cups of rice (should not be more thant the half of the number of cups of water): ');
    if(waterCupsNb <= 0) {
        console.log('Please, add more water.\n');
        cookRice();
    } else{
        if(riceCupsNb <= 0) {
            console.log('Please add more rice.\n');
            cookRice();
        } else{
            if(waterCupsNb < riceCupsNb * 2) {
                console.log('Add more water.');
                cookRice();     
            } else{
                if(checkRiceCooker(rcId)){
                    startCooking(rcId);
                    show()
                } else{
                    show();
                }
            }
        }
    }
}

function boilWater(): void {
    let rcId: number = +readline.question('Enter the rice cooker id to use: ');
    let waterCupsNb: number = +readline.question('Enter the number of cups of water: ');
    if(waterCupsNb <= 0) {
        console.log('Please, add more water.\n');
        cookRice();
    } else{
            if(waterCupsNb <= 0 ) {
                console.log('Add more water.');
                cookRice();     
            } else{
                if(checkRiceCooker(rcId)){
                    startCooking(rcId);
                    show();
                } else{
                    show();
                }
            }
    }
}

function handle_rc(choice: number): void {
    switch (choice) {
        case 1:
            console.table(getRiceCookersList());
            show();
        case 2:
            plug_in_out();
            show();
        case 3:
            change_op_state();
            show();
        case 4:
            show()
    }
}