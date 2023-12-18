import { RiceCooker } from '../../model/RiceCooker'

const riceCookers: RiceCooker[] = []

export const add: (id: number, isOperational: boolean) => void = (id: number, isOperational: boolean) => {
  const actual = new RiceCooker(id, isOperational)
  riceCookers.push(actual)
  console.log(`New rice cooker with id: ${id} was successfully added.`)
}

export const getRiceCookersList: () => RiceCooker[] = () => {
  return riceCookers
}

export const getRiceCookerById: (id: number) => RiceCooker | undefined = (id: number) => {
  return riceCookers.find(item => item.id === id)
}

export const changeState: (id: number, targetAttribute: string, state: boolean) => void = (id: number, targetAttribute: string, state: boolean) => {
  const targettedRiceCooker: RiceCooker | undefined = getRiceCookerById(id)
  if (targettedRiceCooker != null) {
    const index = riceCookers.findIndex((rc) => rc.id === targettedRiceCooker?.id)
    if (targetAttribute === 'isOperational') {
      targettedRiceCooker.isOperational = state
      riceCookers[index] = targettedRiceCooker
    } else if (targetAttribute === 'isPlugged') {
      targettedRiceCooker.isPlugged = state
      riceCookers[index] = targettedRiceCooker
    } else if (targetAttribute === 'isCooking') {
      targettedRiceCooker.isCooking = state
      riceCookers[index] = targettedRiceCooker
    } else console.log('The target attribute is not valid')
  } else {
    console.log(`The rice cooker with id ${id} does not exist.`)
  }
}

export const startCooking: (id: number) => void = (id: number) => {
  const toUpdate: RiceCooker | undefined = getRiceCookerById(id)
  if (toUpdate != null) {
    const currentState: boolean = toUpdate.isCooking
    const oppositeState: boolean = !currentState
    changeState(id, 'isCooking', oppositeState)
    console.log(`Rice cooker id: ${id} started cooking.`)
  }
}
