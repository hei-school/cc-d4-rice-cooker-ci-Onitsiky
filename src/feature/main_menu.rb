require_relative './utils/utils'
require_relative './handling/handle_rc'

main_menu_message = "Welcome on My Rice Cookers. Choose one action from the list below:
                        1. Add a new rice cooker
                        2. Handle rice cookers
                        3. Cook
                        4. Leave
                    Your choice: "
 valid_choices = [1, 2, 3, 4]

def add_action()
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
            add_action()
        end
    else
        puts "Invalid, the id must be a number"
        add_action()
    end
end

 def choose_action(choice)
    case choice
    when 1
        add_action
    when 2
        puts "handle rc"
    when 3
        puts "cook"
    when 4
        puts "Goodbye !"
    end
end

 show_menu(main_menu_message, valid_choices, 4, method(:choose_action))    
        