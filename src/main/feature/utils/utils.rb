# frozen_string_literal: true

def show_menu(message, valid_choices, leave_action, operation)
  print message
  input = gets.chomp
  if input.match?(/^\d+$/)
    choice = input.to_i
    if valid_choices.include?(choice)
      operation.call(choice)
      if choice != leave_action
        show_menu(message, valid_choices, leave_action,
                  operation)
      end
      nil if choice == leave_action
    else
      puts "Invalid, your input must be one of #{valid_choices}"
      show_menu(message, valid_choices, leave_action, operation)
    end
  else
    puts "Invalid, your input must be one of #{valid_choices}"
    show_menu(message, valid_choices, leave_action, operation)
  end
end
