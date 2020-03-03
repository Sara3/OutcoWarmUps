// Win/Loss Rounds
// Given a number of rounds in a game, return every permutation of wins and losses that may occur.
// There will be no ties.
//  The output should be an array of strings. A win will be represented with the letter X and a loss will be represented with the letter O.
//  Example input 1: 3
// output: ['XXX', 'XXO', 'XOX', 'OXX', 'XOO', 'OXO', 'OOX', 'OOO']

// Example input 2: 2
// output: []


function winLoss(n){
  let result = new Set()
  function helper(str){
    if(str.length == n){
      return result.add(str)
    }else {
      helper(str+"X")
      helper(str + "O")
    }
  }
  helper("")
  return Array.from(result)
}
console.log(winLoss(4))




/*
 Python solution 
input: n


a = []
for i in range(1, 2 ** n):
    a.append(format(i, '0' + str(n) + 'b').replace('1', 'X').replace('0', 'O'))
print(a)

*/