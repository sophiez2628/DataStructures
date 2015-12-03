require 'byebug'
#two different ways of storing the values so that they can be reused

#using memoization(top down) - checks hash before computing a solution
def fib_memo(n, cache = {})
  return 1 if n <= 2

  if cache[n]
    return cache[n]
  else
    val = fib(n - 1, cache) + fib(n - 2, cache)
    return cache[n] = val
  end
end

#using tabulation(bottom up)
def fib_tab(n)
  cache = [0,1,1]
  i = 2
  while i < n
    cache << cache[-1] + cache[-2]
    i += 1
  end
  cache.last
end

#coin change problem - takes in sorted array of coins

def make_change(coins, sum, hash)
  return false if coins.first > sum
  hash[sum] = [coins.first] if coins.first == sum
  make_change(coins, sum - 1, hash)
  coins.each do |coin|
    next if coin > sum
    remainder = sum - coin
    if hash[sum].length == 0 || hash[remainder].length + 1 < hash[sum].length
      hash[sum] = hash[remainder].dup + [coin]
    end
  end
  return hash[sum]
end
