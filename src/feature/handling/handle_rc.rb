require_relative '../../model/rice_cooker'


$rc_list = []

def add(id, is_operational)
    new_rc = RiceCooker.new(id, is_operational)
    $rc_list.push(new_rc)
    puts "New rice coocker with id: #{id} successfully added."
end

def is_operational_state(id, state)
    target_rc = $rc_list.find { |rc| rc.id == id}
    if (target_rc)
        target_rc.is_operational = state
    else
        puts "The rice coocker with id: #{id} doesn't exist."
    end
end

def change_state(id, target_attr, state)
    target_rc = $rc_list.find { |rc| rc.id == id}
    if (target_rc)
        if target_attr == "is_operational"
            target_rc.is_operational = state
        elsif target_attr == "is_cooking"
            target_rc.is_cooking = state
        elsif target_attr == "is_plugged"
            target_rc.is_plugged = state
        else
            puts "The targetted attribute is not valid"
        end
    else
        puts "The rice coocker with id: #{id} doesn't exist."
    end
end

def get_rc_list
    $rc_list
end