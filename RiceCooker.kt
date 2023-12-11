class RiceCooker {
    var id: Int
    var isOperational: Boolean
    var isPlugged: Boolean = false
    var isCooking: Boolean = false

    constructor(id: Int, isOperational: Boolean) {
        this.id = id
        this.isOperational = isOperational
    }

    override fun toString(): String {
        return "Rice cooker : {" +
                "\n    id: $id," +
                "\n    is_operational: $isOperational," +
                "\n    is_cooking: $isCooking," +
                "\n    is_plugged: $isPlugged" +
                "\n}"
    }
}
