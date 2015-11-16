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
