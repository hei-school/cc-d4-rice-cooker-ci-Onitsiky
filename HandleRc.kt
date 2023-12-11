val rcList = mutableListOf<RiceCooker>()

fun add(id: Int, isOperational: Boolean) {
    val newRC = RiceCooker(id, isOperational)
    rcList.add(newRC)
    println("New rice cooker with id: $id successfully added.")
}

fun changeState(id: Int, targetAttr: String, state: Boolean) {
    val targetRC = rcList.find { it.id == id }
    if (targetRC != null) {
        when (targetAttr) {
            "isOperational" -> targetRC.isOperational = state
            "isCooking" -> targetRC.isCooking = state
            "isPlugged" -> targetRC.isPlugged = state
            else -> println("The targeted attribute is not valid")
        }
    } else {
        println("The rice cooker with id: $id doesn't exist.")
    }
}

fun getRCList(): List<RiceCooker> {
    return rcList.toList()
}

fun getRC(id: Int): RiceCooker? {
    return rcList.find { it.id == id }
}