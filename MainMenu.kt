fun addAction() {
    println("Enter your rice cooker id (Must be a number):")
    val id = readLine()?.toIntOrNull()
    if (id != null) {
        println("Is this rice cooker operational?\n1. yes\n2. no\nYour choice:")
        val isOperationalChoice = readLine()
        if (isOperationalChoice == "1" || isOperationalChoice == "2") {
            val isOperational = isOperationalChoice == "1"
            add(id, isOperational)
        } else {
            println("Invalid choice")
            addAction()
        }
    } else {
        println("Invalid, the id must be a number")
        addAction()
    }
}

fun handleRCMenu() {
    val menuMessage = """
        Choose an action:
        1. List rice cookers
        2. Plug in/out rice cooker
        3. Change operational state
        4. Return to main menu
        Your choice:
    """.trimIndent()

    showMenu(menuMessage, listOf(1, 2, 3, 4), 4) { choice ->
        when (choice) {
            1 -> println(getRCList())
            2 -> plugRCInOut(choice)
            3 -> changeOperationalState(choice)
            4 -> show()
        }
        handleRCMenu()
    }
}

fun updateRCState(choice: Int, attribute: String, oppositeValueStr: String, oppositeMessage: String, currentMessage: String) {
    println("Enter the rice cooker id (Must be a number):")
    val id = readLine()?.toIntOrNull()
    if (id != null) {
        val toUpdate = getRC(id)
        if (toUpdate != null) {
            val currentState = when (attribute) {
                "isOperational" -> toUpdate.isOperational
                "isCooking" -> toUpdate.isCooking
                "isPlugged" -> toUpdate.isPlugged
                else -> false
            }
            val oppositeValue = !currentState
            changeState(id, attribute, oppositeValue)
            println("Rice cooker id: $id ${if (currentState) oppositeMessage else currentMessage}")
        } else {
            println("The rice cooker with id: $id doesn't exist.")
        }
    } else {
        println("Invalid, the id must be a number")
        showMenu("", emptyList(), 0) { updateRCState(choice, attribute, oppositeValueStr,oppositeMessage, currentMessage) }
    }
}

fun plugRCInOut(choice: Int) {
    updateRCState(choice, "isPlugged", "is now plugged out", "is now plugged in", "updated")
}

fun changeOperationalState(choice: Int) {
    updateRCState(choice, "isOperational", "is now non-operational", "is now operational", "updated")
}

fun startCooking(id: Int) {
    val toUpdate = getRC(id)
    if (toUpdate != null) {
        changeState(id, "isCooking", true)
        println("Rice cooker id: $id started cooking")
    }
}

fun handleCooks(choice: Int) {
    when (choice) {
        1 -> cookRice()
        2 -> boilWater()
        3 -> show()
    }
}

fun boilWater() {
    println("Enter the rice cooker id to use:")
    val rc = readLine()
    println("Enter the number of water cups:")
    val cups = readLine()?.toIntOrNull()
    if (rc != null && cups != null) {
        if (cups <= 0) {
            println("Add more water")
            cookRice()
        } else {
            if (checkRC(rc.toInt())) {
                startCooking(rc.toInt())
            } else {
                showMenu("", emptyList(), 0) { boilWater() }
            }
        }
    } else {
        println("Invalid input")
        showMenu("", emptyList(), 0) { boilWater() }
    }
}

fun cookRice() {
    println("Enter the rice cooker id to use:")
    val rc = readLine()
    println("Enter the number of water cups:")
    val cups = readLine()?.toIntOrNull()
    println("Enter the number of rice cups (should be 1/2 of water cups number):")
    val rice = readLine()?.toIntOrNull()
    if (rc != null && cups != null && rice != null) {
        if (cups <= 0) {
            println("Add more water")
            cookRice()
        } else {
            if (rice <= 0) {
                println("Add more rice")
            } else {
                if (cups < rice * 2) {
                    println("Add more water")
                    cookRice()
                } else {
                    if (checkRC(rc.toInt())) {
                        startCooking(rc.toInt())
                    } else {
                        showMenu("", emptyList(), 0) { cookRice() }
                    }
                }
            }
        }
    } else {
        println("Invalid input")
        showMenu("", emptyList(), 0) { cookRice() }
    }
}

fun checkRC(id: Int): Boolean {
    val target = getRC(id)
    if (target != null) {
        var errorMessages = ""
        if (!target.isCooking && target.isOperational && target.isPlugged) {
            return true
        } else {
            if (target.isCooking) {
                errorMessages += "Rice cooker id:$id is still cooking. "
            }
            if (!target.isOperational) {
                errorMessages += "Rice cooker id:$id is not operational. "
            }
            if (!target.isPlugged) {
                errorMessages += "Rice cooker id:$id is not plugged in. "
            }
            print(errorMessages)
            return false
        }
    } else {
        println("Rice cooker id:$id does not exist.")
        return false
    }
}

fun main() {
    show()
}

fun show() {
    showMenu(
            """
Welcome to My Rice Cookers. Choose one action from the list below:
1. Add a new rice cooker
2. Handle rice cookers
3. Cook
4. Leave
Your choice:
""".trimIndent(), listOf(1, 2, 3, 4), 4) { chooseAction(it) }
}

fun chooseAction(choice: Int) {
    when (choice) {
        1 -> addAction()
        2 -> handleRCMenu()
        3 -> cookMenu()
        4 -> {
            println("Goodbye!")
            return
        }
    }
}

fun cookMenu() {
    showMenu(
            """
Choose an action:
1. Cook rice
2. Boil water
3. Return to main menu
Your choice:
""".trimIndent(), listOf(1, 2, 3), 0) { handleCooks(it) }
}