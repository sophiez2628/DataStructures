class Stopwatch
  def initialize
    @start_time = nil
    @on = false
    @elapsed_time = 0
  end

  def start
    unless @on
      @on = true
      @start_time = Time.now
    end
  end

  def stop
    @on = false
    @elapsed_time = Time.now - @start_time
  end

  def elapsed
    if @on
      return (Time.now - @start_time) + @elapsed_time
    else
      return @elapsed_time
    end
  end

end
