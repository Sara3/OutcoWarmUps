
/*
Prompt:

You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
Examples:

Example 1:
coins = [1, 2, 5], amount = 11
return 3 (11 = 5 + 5 + 1)

Example 2:
coins = [2], amount = 3
return -1.

Input:

coins = Array of Integers

amount = Integer
Output:

result = Integer
Constraints

Time: O(nk)

Space: O(n)

Where n is amount to break and k is the length of the coins array
Resources:

Memoization
Hints:

You may assume that you have an infinite number of each kind of coin. Meaning you can reuse the coins you have an arbitrary number of times.

You can use either top down or bottom up dynamic programming

One way to solve this is to find the naive recursive solution first and then modify it to memoize your repeated work.

Think about the problem in reverse: what can we do if we subtract the value of every coin individually from the amount we are trying to add up to?
Solution:

*/
function minCoinChange(coins, amount) {
  let memo = {};

  function recurse(sum) {
    if(memo[sum] !== undefined) {
      return memo[sum];
    }

    if(sum < 0) {
      return -1;
    }

    if(sum === 0) {
      return 0;
    }

    let min = Infinity;

    for(let i = 0; i < coins.length; i++) {
      let testMin = recurse(sum - coins[i]);
      if(testMin >= 0) {
        min = Math.min(min, testMin);
      }
    }

    memo[sum] = min + 1;
    return memo[sum]
  }

  recurse(amount);
  return memo[amount] === Infinity ? -1 : memo[amount];
}