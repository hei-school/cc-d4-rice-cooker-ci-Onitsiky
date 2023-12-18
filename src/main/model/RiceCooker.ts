export class RiceCooker {
  id: number
  isOperational: boolean
  isPlugged: boolean
  isCooking: boolean

  constructor (id: number, isOperational: boolean) {
    this.id = id
    this.isOperational = isOperational
    this.isCooking = false
    this.isPlugged = false
  }

  displayInfo (): void {
    console.log(`Rice cooker: {
            id: ${this.id},
            isOperational: ${this.isOperational.toString()},
            isPlugged: ${this.isPlugged.toString()},
            isCooking: ${this.isCooking.toString()}
        }`)
  }
}
