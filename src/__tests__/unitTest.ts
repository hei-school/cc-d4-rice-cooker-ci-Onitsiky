import { add, getRiceCookersList, changeState, getRiceCookerById, startCooking } from '../main/feature/actions/riceCookersAction'
import { RiceCooker } from "../main/model/RiceCooker";

test('Add new rice cooker to list', () => {
    add(1, true);
    add(2, false);

    expect(getRiceCookersList().length == 2)
})

test('Change rice cooker state', () => {
    add(1, false);
    changeState(1, "isOperational", true);
    changeState(1, "isPlugged", true);
    changeState(1, "isCooking", true);

    let expected: RiceCooker = new RiceCooker(1, true);
    expected.isCooking = true;
    expected.isPlugged = true;
    expect(getRiceCookerById(1)).toStrictEqual(expected);
})

test('Rice cooker started cooking', () => {
    add(3, true);
    startCooking(3);
    expect(getRiceCookerById(3)?.isCooking).toBe(true);
})