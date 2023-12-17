# frozen_string_literal: true

# RiceCooker class defining a rice cooker
class RiceCooker
  def initialize(id, is_operational)
    @id = id
    @is_operational = is_operational
    @is_plugged = false
    @is_cooking = false
  end

  attr_accessor :is_operational, :is_plugged, :is_cooking
  attr_reader :id

  def to_s
    "Rice cooker : {
            id: #{id},
            is_operational: #{is_operational},
            is_cooking: #{is_cooking},
            is_plugged: #{is_plugged}
        }"
  end
end
