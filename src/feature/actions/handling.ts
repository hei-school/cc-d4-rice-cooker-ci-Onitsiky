import * as readline from 'readline-sync'
import { showMenu } from '../utils/utils'
import { show } from '../../mainMenu'
import { changeState, getRiceCookerById, getRiceCookersList, startCooking } from './riceCookersAction'
import { RiceCooker } from '../../model/RiceCooker'

export function handleRiceCookersMenu (): void {
  const menu = 'Choose an action: \n' +
                '1. List rice cookers\n' +
                '2. Plug in/out rice cooker\n' +
                '3. Change operational state\n' +
                '4. Return back to main menu\n' +
                'Enter your choice: '

  showMenu(menu, [1, 2, 3, 4], 4, handleRC)
}

function PlugInOut (): void {
  const input = +readline.question('Enter the rice cooker id (Must be a number) : ')
  const target: RiceCooker | undefined = getRiceCookerById(input)
  if (target != null) {
    const currentState: boolean = target.isPlugged
    const oppositeState: boolean = !currentState
    changeState(input, 'isPlugged', oppositeState)
    console.log(`Rice cooker id: ${input} plugged ${oppositeState ? 'in.' : 'out.'}`)
  } else {
    console.error('Rice cooker with specified id not found.')
    show()
  }
}

function ChangeOpState (): void {
  const input = +readline.question('Enter the rice cooker id (Must be a number) : ')
  const target: RiceCooker | undefined = getRiceCookerById(input)
  if (target != null) {
    const currentState: boolean = target.isPlugged
    const oppositeState: boolean = !currentState
    changeState(input, 'isOperationnal', oppositeState)
    console.log(`Rice cooker id: ${input} successfully updated.`)
  } else {
    console.error('Rice cooker with specified id not found.')
    show()
  }
}

export function cookMenu (): void {
  const menu = 'Choose an action :\n' +
                '1. Cook rice\n' +
                '2. Boil water\n' +
                '3. Return value\n'
  showMenu(menu, [1, 2, 3], 3, handleCook)
}

function handleCook (choice: number): void {
  switch (choice) {
    case 1:
      cookRice()
      break
    case 2:
      boilWater()
      break
    case 3:
      show()
      break
  }
}

function checkRiceCooker (id: number): boolean {
  const target: RiceCooker | undefined = getRiceCookerById(id)

  if (target != null) {
    const errorMessage: string[] = []

    if (!target.isCooking && target.isOperational && target.isPlugged) {
      return true
    } else {
      if (target.isCooking) errorMessage.push(`Rice cooker id:${id} is still cooking.`)
      if (!target.isOperational) errorMessage.push(`Rice cooker id:${id} is not operational.`)
      if (!target.isPlugged) errorMessage.push(`Rice cooker id:${id} is not plugged in.`)

      console.log(errorMessage.join(' '))

      return false
    }
  } else {
    console.log(`Rice cooker id:${id} doesn't exist.`)
    return false
  }
}

function cookRice (): void {
  const rcId: number = +readline.question('Enter the rice cooker id to use: ')
  const waterCupsNb: number = +readline.question('Enter the number of cups of water: ')
  const riceCupsNb: number = +readline.question('Enter the number of cups of rice (should not be more thant the half of the number of cups of water): ')
  if (waterCupsNb <= 0) {
    console.log('Please, add more water.\n')
    cookRice()
  } else {
    if (riceCupsNb <= 0) {
      console.log('Please add more rice.\n')
      cookRice()
    } else {
      if (waterCupsNb < riceCupsNb * 2) {
        console.log('Add more water.')
        cookRice()
      } else {
        if (checkRiceCooker(rcId)) {
          startCooking(rcId)
          show()
        } else {
          show()
        }
      }
    }
  }
}

function boilWater (): void {
  const rcId: number = +readline.question('Enter the rice cooker id to use: ')
  const waterCupsNb: number = +readline.question('Enter the number of cups of water: ')
  if (waterCupsNb <= 0) {
    console.log('Please, add more water.\n')
    cookRice()
  } else {
    if (waterCupsNb <= 0) {
      console.log('Add more water.')
      cookRice()
    } else {
      if (checkRiceCooker(rcId)) {
        startCooking(rcId)
        show()
      } else {
        show()
      }
    }
  }
}

function handleRC (choice: number): void {
  switch (choice) {
    case 1:
      console.table(getRiceCookersList())
      show()
      break
    case 2:
      PlugInOut()
      show()
      break
    case 3:
      ChangeOpState()
      show()
      break
    case 4:
      show()
      break
  }
}
