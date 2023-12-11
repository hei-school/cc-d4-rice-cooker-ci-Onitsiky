import * as readline from 'readline-sync'
import { showMenu } from '../utils/utils';
import { show } from '../../mainMenu';
import { changeState, getRiceCookerById, getRiceCookersList } from './riceCookersAction';
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