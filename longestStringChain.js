/*

Given a list of words, each word consists of English lowercase letters.

Let's say word1 is a predecessor of word2 if and only if we can add exactly one 
letter anywhere in word1 to make it equal to word2.  For example, "abc" is a predecessor of "abac".

A word chain is a sequence of words [word_1, word_2, ..., word_k] 
with k >= 1, where word_1 is a predecessor of word_2, word_2 is a predecessor of word_3, and so on.

Return the longest possible length of a word chain with words chosen from the given list of words.



[a,c,d]
[ab, cd]

Example 1:

Input: ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: one of the longest word chain is "a","ba","bda","bdca".

 
a -> ba -> bca->bdca
bca -> ba


Note:

    1 <= words.length <= 1000
    1 <= words[i].length <= 16
    words[i] only consists of English lowercase letters.

*/

/* approach 1: sort the array create a table 
key = the word
value = length of the chains it forms 

delete one character and check if the newly formed word exists in the table

*/

var longestStrChain = function(words) {
let dp = {}
  words.sort((a,b)=>a.length - b.length)
  
  for(let i = 0; i < words.length; i++){
    dp[words[i]]  = 1
  }
  
  for(let i = 0; i < words.length; i++){
    let word = words[i]
    for(let j = 0; j<word.length; j++){
      let last = word.substring(0, j) + word.substring(j + 1, word.length)
      // if last exists in my dp
      // max (dp[last]+1, dp[word])
      if(dp[last]){
        dp[word] = Math.max(dp[last]+1, dp[word])
      }
    }
  }
  
  let max = 0
  for(let k in dp){
   // console.log(dp[k])
    if (max < dp[k]){
      max = dp[k]
    }
  }
  
  return max
};






