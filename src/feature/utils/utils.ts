import * as readline from 'readline-sync';

type showMenuType = (menu: string, validChoices: number[], leave_action: number, chooseAction: (input: number) => void) => void;

export const showMenu: showMenuType = (menu: string, validChoices: number[], leave_action: number, chooseAction: (input:number) => void) => {
    let input: number = +readline.question(menu);
    if(validChoices.indexOf(input) === -1){
        console.log(`Invalid, your input must be one of the following ${console.table(validChoices)}`);
        showMenu(menu, validChoices, leave_action, chooseAction);
    } else if (input === leave_action){
        return;
    } else{
        chooseAction(input)
    }
}