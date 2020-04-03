

function createGraph(n, connections){
  let result = {}
  for(let i = 0; i < n; i++){
    result[i]= {val: i, children: [], timeStamp: -Infinity, lowLink: Infinity}
  }
  
  connections.forEach((edge)=>{
    // [1,2]
    //1': { val: 1, children: [], timeStamp: -Infinity, lowLink: Infinity },
    result[edge[0]].children.push(edge[1])
    result[edge[1]].children.push(edge[0])
  })
  return result
}


function criticalConnected(n, connections){
  let graph = createGraph(n, connections)
  
  let result = []
  let time = 0
  let visited = new Set()
  
  function dfs(cur, parent){
    // perform action on current val
    visited.add(cur.val)
    
    cur.timeStamp = time
    cur.lowLink = time
    time++
    
    cur.children.forEach((child)=>{
      if(child == parent){
        return
      }
      if(visited.has(child)){
        //if the child is visited and has lowing lower, we will update the lowlink
        cur.lowLink = Math.min(cur.lowLink, graph[child].lowLink)
        return
      }else {
        //perform DFS to add the children to visited 
        cur.lowLink = Math.min(cur.lowLink, dfs(graph[child], cur.val))
      }
      if(cur.timeStamp < graph[child].lowLink){
        result.push(cur.val, child)
      }
    });
    return cur.lowLink
  }
  
  dfs(graph[connections[0][0]], connections[0][0])
  
  console.log(result)
  
}

criticalConnected(4, [[0, 1], [1, 2], [2, 0], [1, 3]])