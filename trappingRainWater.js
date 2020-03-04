/*
Given an array of integers representing the elevations of rocks, 
determine the total amount of water that can be trapped between rocks.

Input: 	 Array of integers
Output: 	Integer

Example

Input: [3, 0, 2, 0, 4]      
Output: 7
*/

function trappingRainWater(arr){
  let lMax = [0]
  let rMax = []
  let res = 0
  // fill the lMax arr
  for(let i =1; i < arr.length; i++){
    let val = Math.max(arr[i-1], lMax[i - 1])
    lMax.push(val)
  }
  //fill the rMax arr
  rMax[arr.length-1] = 0
  for(let j = arr.length -2 ; j >=0; j--){
    rMax[j] = Math.max(arr[j+1], rMax[j+1])
  }
  
  for(let i = 0; i < arr.length; i++){
    let minWall = Math.min(lMax[i], rMax[i])
    if(minWall - arr[i]>0){
      res += minWall - arr[i]
    }
  }  
  return res
}

trappingRainWater([3,0,2,0,4])