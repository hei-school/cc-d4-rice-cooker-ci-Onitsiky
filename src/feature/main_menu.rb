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
                    Your choice: "

    show_menu(menu_message, [1,2,3], nil, method(:handle_rc))
end

def update_rc_state(choice, attribute, opposite_value_str, opposite_message, current_message)
    puts "Enter the rice cooker id (Must be a number) :"
    id = gets.chomp
    if id.match?(/^\d+$/)
      to_update = get_rc(id.to_i)
      if to_update
        current_state = to_update.public_send(attribute)
        opposite_value = current_state ? false : true
        change_state(id.to_i, attribute, opposite_value)
        puts "Rice cooker id: #{id} #{current_state ? opposite_message : current_message}"
      end
    else
      puts "Invalid, the id must be a number"
      send(choice)
    end
  end
  
  def plug_rc_in_out(choice)
    update_rc_state(choice, "is_plugged", "is now plugged out", "is now plugged in", "updated")
  end
  
  def change_operational_state(choice)
    update_rc_state(choice, "is_operational", "is now non-operational", "is now operational", "updated")
  end
  

def start_cooking(id)
    to_update = get_rc(id.to_i)
    if (to_update)
        change_state(id.to_i, "is_cooking", true)
        puts "Rice cooker id: #{id} started cooking"
    end
end

def handle_rc(choice)
    case choice
    when 1
        puts get_rc_list
        show
    when 2
        plug_rc_in_out(choice)
        show
    when 3
        change_operational_state(choice)
        show
    end
end

def cook_menu()
    menu_message = "Choose an action:
                        1. Cook rice
                        2. Boil water
                        3. Steam
                    Your choice: "

    show_menu(menu_message, [1,2,3], nil, method(:handle_cooks))
end

def handle_cooks(choice)
    case choice
        when 1
            cook_rice
            show
        when 2
            puts "boil"
        when 3
            puts "steam"
    end
end

def cook_rice()
    puts "Enter the rice cooker id to use: "
    rc = gets.chomp
    puts "Enter the number of water cups: "
    cups = gets.chomp
    puts "Enter the number of rice cups(should be 1/2 of water cups number): "
    rice = gets.chomp
    if rc.match?(/^\d+$/)
        if cups.match?(/^\d+$/)
            if(cups.to_i <= 0)
                puts "Add more water"
                cook_rice
            else
                if rice.match?(/^\d+$/)
                    if(rice.to_i <= 0)
                        puts "Add more rice"
                    else
                        if cups.to_i < rice.to_i * 2
                            puts "Add more water"
                            cook_rice
                        else
                            if(check_rc(rc.to_i))
                                start_cooking(rc.to_i)
                            else
                                show
                            end
                        end
                    end
                else
                    puts "Invalid, the rice cups must be a number."
                end
            end
        else
            puts "Invalid, the water cups must be a number."
        end
    else
        puts "Invalid rice cooker id."
    end
end

def check_rc(id)
    target = get_rc(id)
    error_message = ""
    if target.is_cooking == false && target.is_operational == true  && target.is_plugged == true
        return true
    else
        if target.is_cooking == true
            error_message += "Rice cooker id:#{id} is still cooking. "
        end
        if target.is_operational == false
            error_message += "Rice cooker id:#{id} is not operational. "
        end
        if target.is_plugged == false
            error_message += "Rice cooker id:#{id} is not plugged in. "
        end
        print error_message
        return false
    end
end
        




 def choose_action(choice)
    case choice
    when 1
        add_action
    when 2
        handle_rc_menu
    when 3
        cook_menu 
    when 4
        puts "Goodbye !"
        return
    end
end

show