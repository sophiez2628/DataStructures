require 'byebug'
class MinHeap
  attr_reader :store

  def initialize(vals)
    @store = []
    vals.each { |val| add_value(val) }
  end

  def peek_min
    store.first
  end

  def pop_min
    swap!(0, store.length - 1)
    min = @store.pop
    heapify_down!
    min
  end

  def add_value(num)
    @store.push(num)
    heapify_up!
  end

  private
  def swap!(first_idx, last_idx)
    first = store[first_idx]
    @store[first_idx] = @store[last_idx]
    @store[last_idx] = first
  end

  def heapify_down!
    i = 0
    while i < max_idx
      smallest_child_idx = children_idx(i).min_by { |idx| store[idx] } if children_idx(i)
      unless smallest_child_idx
        break
      end

      if store[smallest_child_idx] < store[i]
        swap!(i, smallest_child_idx)
        i = smallest_child_idx
      else
        break
      end
      i += 1
    end
  end

  def heapify_up!
    i = max_idx
    index = parent_idx(max_idx)
    while true
      if index && store[index] > store[i]
        swap!(index, i)
        i = index
        index = parent_idx(i)
      else
        break
      end

    end
  end

  def parent_idx(child_idx)
    return nil if child_idx == 0
    (child_idx - 1) / 2
  end

  def children_idx(parent_idx)
    indices = [2 * parent_idx + 1, 2 * parent_idx + 2].select { |idx| idx < max_idx - 1 }
    indices.empty? ? nil : indices
  end

  def max_idx
    @store.length - 1
  end


end
