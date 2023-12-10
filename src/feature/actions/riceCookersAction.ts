import { RiceCooker } from "../../model/RiceCooker";

let riceCookers: RiceCooker[]= [];

export const add: (id: number, isOperational: boolean) => void = (id: number, isOperational: boolean) => {
 const actual = new RiceCooker(id, isOperational);
    riceCookers.push(actual);
    console.log(`New rice cooker with id: ${id} was successfully added.`);
}

export const getRiceCookersList: () => RiceCooker[] = () => {
    return riceCookers;
}

const getRiceCookerById: (id: number) => RiceCooker | undefined = (id: number) => {
    return riceCookers.find(item => item.id == id);
}

const changeState: (id: number, targetAttribute: string, state: boolean) => void = (id: number, targetAttribute: string, state: boolean) => {
    let targettedRiceCooker: RiceCooker | undefined = getRiceCookerById(id);
    if(targettedRiceCooker) {
        if(targetAttribute == 'isOperational') targettedRiceCooker.isOperational == state
        else if (targetAttribute == 'isPlugged') targettedRiceCooker.isPlugged == state
        else if (targetAttribute == 'isCooking') targettedRiceCooker.isCooking == state
        else console.log('The target attribute is not valid')
    } else {
        console.log(`The rice cooker with id ${id} does not exist.`)
    }
}