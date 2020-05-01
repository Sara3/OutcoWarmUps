/*
There is a one-dimensional garden on the x-axis. The garden 
starts at the point 0 and ends at the point n. (i.e The length
 of the garden is n).

There are n + 1 taps located at points 
[0, 1, ..., n] in the garden.

Given an integer n and an integer array ranges
 of length n + 1 where ranges[i] (0-indexed) means 
 the i-th tap can water the area 
 [i - ranges[i], i + ranges[i]] if it was open.

Return the minimum number of taps that should
 be open to water the whole garden, If the garden
  cannot be watered return -1.


*/

function minTap(arr, n){
  let range = []
  for(let i = 0; i <=n; i++){
    range[i]= ([i - arr[i], i + arr[i] ])
  }
  range.sort((a,b)=>{
    return a[0] - b[0]
  })

  let start = range[0][0]
  let end = 0
 
  let tapCount = 0
  while(start<n){
    let i = 0 
    while (i < n && range[i][0] <= start) {
      end = Math.max(end, range[i][1])
      i++
    }
    if(start == end){
      return -1
    }
    start = end
    tapCount++
  }
  return tapCount
}

minTap([3, 4, 1, 1, 0, 0], 5)








