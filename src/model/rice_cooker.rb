
class RiceCooker

    attr_writer :is_operational
    attr_writer :is_cooking
    attr_writer :is_plugged

    def initialize(id, is_operational)
        @id = id
        @is_operational = is_operational
        @is_plugged = false
        @is_cooking = false
    end

    def id
        @id
    end

    def is_operational
        @is_operational
    end

    def is_plugged
        @is_plugged
    end

    def is_cooking
        @is_cooking
    end

    def to_s
        "Rice cooker : {
            id: #{id},
            is_operational: #{is_operational},
            is_cooking: #{is_cooking},
            is_plugged: #{is_plugged}
        }"
    end
end