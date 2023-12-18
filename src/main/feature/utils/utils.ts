import * as readline from 'readline-sync'

type showMenuType = (menu: string, validChoices: number[], leave_action: number, chooseAction: (input: number) => void) => void

export const showMenu: showMenuType = (menu: string, validChoices: number[], leaveAction: number, chooseAction: (input: number) => void) => {
  const input: number = +readline.question(menu)
  if (!validChoices.includes(input)) {
    console.log(`Invalid, your input must be one of the following ${JSON.stringify(validChoices)}`)
    showMenu(menu, validChoices, leaveAction, chooseAction)
  } else {
    chooseAction(input)
  }
}
