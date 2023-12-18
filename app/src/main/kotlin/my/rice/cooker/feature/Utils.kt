import java.util.Scanner

fun showMenu(message: String, validChoices: List<Int>, leaveAction: Int, operation: (Int) -> Unit) {
    print(message)
    val scanner = Scanner(System.`in`)
    val input = scanner.nextLine().trim()

    if (input.matches(Regex("""^\d+$"""))) {
        val choice = input.toInt()
        if (validChoices.contains(choice)) {
            operation.invoke(choice)
            if (choice != leaveAction) {
                showMenu(message, validChoices, leaveAction, operation)
            } else {
                return
            }
        } else {
            println("Invalid, your input must be one of $validChoices")
            showMenu(message, validChoices, leaveAction, operation)
        }
    } else {
        println("Invalid, your input must be one of $validChoices")
        showMenu(message, validChoices, leaveAction, operation)
    }
}