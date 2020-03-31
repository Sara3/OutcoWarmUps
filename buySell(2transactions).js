

/*




ay you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

Note: You may not engage in multiple transactions at the same time (i.e., you must sell 
 the stock before you buy again).

Example 1:

Input: [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
             Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

Example 2:

Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.

Example 3:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
*/






function buySell(arr, k){

  // Initialize a profit array that keeps track of the 
  // max profit at any given point. We know the profit
  // from when the input array is a single element large
  // to when the array is completely accounted for
  let prof = []
  
  console.log(arr)
  
  // Intialize the profit array to be all zeroes for now
  for(let i =0; i < arr.length; i++){
    prof.push(0)
  }
  console.log("-------")
  console.log(prof)
  
  for(let j = 0; j < k; j++){
    // We're going to perform the algorithm however many 
    // k times. k is how many buy/sell operations we 
    // can perform 
    
    // set up a min variable equal to the first element 
    // of the array. As we find more minimum elements 
    // later on, we'll instead select these as our min
    // as it'll allow us to garner a greater difference
    // between buy/sell prices
    let min = arr[0]
    // max variable initialized to zero
    let max = 0
    for(let i = 1; i < arr.length; i++){
      // start the for loop from the second element
      // we've already accounted for the first element 
      // with lines 69 and 71
      
      // When we subtract the prof[i] from arr[i], we end up
      // with the previous most minimum stock price we could've
      // bought at
      /* Small example: 
      
      input:                [0,3,1,5]
      prof (1st iteration): [0,0,0,0]
      min:                   0,0,0,0
      max:                   0,3,1,5
      
      prof (2nd iteration): [0,3, 3, 5]
      min:                   0,0,-2,-2
      max:                   0,3, 3, 7
      
      So, where does this 7 at the end come from? 
      Remember, it's a sum of two different buy/sell operations
      We can see that it comes from the buy at 0, sell at 3 along
      with the buy at 1, sell at 4. 
      In code, it's calculated through 5 - (-2). So where did that
      negative two come from? This was brought upon by us 
      calculating a new min during the second external for loop
      When we choose that min, we choose between (min, arr[i] - prof[i])
      The only way we would ever get this negative min is when there's 
      a drop from a higher stock price to a lower stock price following a 
      point at which a sell should occur. 
      This happens at index 2 of [0,3,1,5]
      */
      min = Math.min(min, arr[i] - prof[i]) //-2
      max = Math.max(max, arr[i]-min) //3, 5-(-2)
      prof[i] = max
    }
    console.log(prof)
}
  return prof.pop()
}

// [0,3,3, 5]
//[0, 3,3, 7]

console.log(buySell([3, 3, 5, 0, 0, 3, 1, 4], 2))

//6 