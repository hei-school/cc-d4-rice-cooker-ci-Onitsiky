require_relative './utils/utils'
require_relative './handling/handle_rc'

$main_menu_message = "Welcome on My Rice Cookers. Choose one action from the list below:
                        1. Add a new rice cooker
                        2. Handle rice cookers
                        3. Cook
                        4. Leave
                    Your choice: "
$valid_choices = [1, 2, 3, 4]
 def show
    show_menu($main_menu_message, $valid_choices, 4, method(:choose_action))
 end

def add_action(&block)
    puts "Enter your rice cooker id (Must be a number) :"
    id = gets.chomp
    puts "Is this rice cooker operational ?
            1. yes
            2. no
        Your choice: "
    is_operational = gets.chomp
    if id.match?(/^\d+$/)
        if is_operational == '1'
            add(id.to_i, true)
        elsif is_operational == '2'
            add(id.to_i, false)
        else
            puts "Invalid choice"
            add_action(&action)
        end
    else
        puts "Invalid, the id must be a number"
        add_action()
    end
    block.call if block
end

def handle_rc_menu()
    menu_message = "Choose an action:
                        1. List rice cookers
                        2. Plug in/out rice cooker
                        3. Change operational state
                        4. Start cooking/ End cooking
                    Your choice: "

    show_menu(menu_message, [1,2], nil, method(:handle_rc))
    block.call if block
end

def plug_rc_menu(choice)
    puts "Enter the rice cooker id (Must be a number) :"
    id = gets.chomp
    if id.match?(/^\d+$/)
        to_update = get_rc(id.to_i)
        if (to_update)
            actual_state = to_update.is_plugged
            if(actual_state)
                change_state(id.to_i, "is_plugged", false)
                puts "Rice cooker id: #{id} is now plugged out"
            else
                change_state(id.to_i, "is_plugged", true)
                puts "Rice cooker id: #{id} is now plugged in"
            end
        end
    else
        puts "Invalid, the id must be a number"
        plug_rc_menu(choice)
    end
end


def handle_rc(choice)
    case choice
    when 1
        puts get_rc_list
        show
    when 2
        plug_rc_menu(choice)
        show
    end
end

 def choose_action(choice)
    case choice
    when 1
        add_action
    when 2
        handle_rc_menu
    when 3
        puts "cook"
    when 4
        puts "Goodbye !"
        return
    end
end

show