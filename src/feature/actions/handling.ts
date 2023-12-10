import * as readline from 'readline-sync'
import { showMenu } from '../utils/utils';
import { show } from '../../mainMenu';
import { getRiceCookersList } from './riceCookersAction';

export function handleRiceCookersMenu() : void {
    let menu = "Choose an action: \n"
                + "1. List rice cookers\n"
                + "2. Plug in/out rice cooker\n"
                + "3. Change operational state\n"
                + "4. Return back to main menu\n"
                + "Enter your choice: ";

    showMenu(menu, [1,2,3,4], 4, handle_rc);
}

function handle_rc(choice: number): void {
    switch (choice) {
        case 1:
            console.table(getRiceCookersList());
            show();
        case 2:
            console.log("plug")
        case 3:
            console.log("op state")
        case 4:
            show()
    }
}