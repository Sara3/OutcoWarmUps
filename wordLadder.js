/*

Prompt

Given a begin and end word, along with a list of words, return the length of the shortest 
transformation sequence
Examples:

beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

result = 5

Reason:
The shortest transformation sequence from "hit" to "cog" is:

"hit" -> "hot" -> "dot" -> "dog" -> "cog"

Because this sequence contains 5 elements, we return 5

*/
function oneDiff(word1, word2){
  let diff = 0;
  for(let i = 0;i < word1.length; i++){
    if(word1[i]!==word2[i]){
      diff++
    }
  }
  return diff == 1
}


function createGraph(bw, list){
  let map = {}
  for(let i = -1; i<list.length; i++){
    let word; 
    if(i == -1){
      word = bw
    }else {
      word = list[i]
    }
    map[word] = []
    for(let j = 0; j < list.length; j++){
      if(oneDiff(word, list[j])){
        map[word].push(list[j])
      }
    }
  }
  return map
}


function wordLadder(bw, ew, list){
  let graph = createGraph(bw, list)
  
  let queue = []
  let seen = {}
  
  queue.push([bw, 1])
  seen[bw] = 1
  
  while(queue.length >0){
    let cur = queue.shift()
    let word = cur[0]
    let count = cur[1]
    let connections = graph[word]
    for(let i = 0; i < connections.length; i++){
      if(!seen[connections[i]]){
        
        seen[connections[i]] = count+1
        queue.push([connections[i], count+1])
        
      }
    }
  }
  return seen[ew]
}

wordLadder("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])

