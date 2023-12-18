import { cookMenu, handleRiceCookersMenu } from './feature/actions/handling'
import { add } from './feature/actions/riceCookersAction'
import { showMenu } from './feature/utils/utils'
import * as readline from 'readline-sync'

const mainMessage: string = 'Welcome on My Rice Cookers. Choose an action from the list below: \n' +
                            '1. Add new rice cooker \n' +
                            '2. Handle rice cookers \n' +
                            '3. Cook \n' +
                            '4. Leave \n'
const validChoices: number[] = [1, 2, 3, 4]

function addRiceCooker (): void {
  const id: number = +readline.question('Enter the id of the new rice cooker: ')
  const isOperational: number = +readline.question('Is it operational :' +
                                '\n 1. Yes' +
                                '\n 2. No' +
                                '\n Your choice: ')
  add(id, isOperational === 1)
}

function chooseAction (choice: number): void {
  switch (choice) {
    case 1:
      addRiceCooker()
      show()
      break
    case 2:
      handleRiceCookersMenu()
      break
    case 3:
      cookMenu()
      break
    case 4:
      console.log('Goodbye !')
      break
  }
}

export function show (): void {
  showMenu(mainMessage, validChoices, 4, chooseAction)
}

show()
