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

/*********************** Python Solution - start ***********
class Solution:
    def trap(self, height: List[int]) -> int:
        if len(height) == 0:
            return 0
        left_max_and_right_max_for_each_index = []        
        
        def find_left_and_right_max_wall_heights(self):
            # find the wall with the maximum height at the left side for each index
            # first item doesn't have any left wall
            left_max_and_right_max_for_each_index.append([0])
            left_max = 0 
            for i in range(1, len(height)): 
                left_max = max(left_max, height[i-1])
                left_max_and_right_max_for_each_index.append([left_max])
            
            # find the wall with the maximum height at the right side for each index
            right_max = 0
            left_max_and_right_max_for_each_index[-1].append(0) #last element doesn't have a right wall
            for i in range(len(height)-2, -1, -1): 
                right_max = max(right_max, height[i+1])
                left_max_and_right_max_for_each_index[i].append(right_max)
                
        def calculate_total_water_amount(self):             
            total_water_amount = 0             
            # for each index in left_max_and_right_max_for_each_index array,
            #   calculate the water amount: (minimum of the left_max and right_max) - self's height            
            for i in range(0, len(left_max_and_right_max_for_each_index)):
                minimum_of_left_and_right_wall = min(left_max_and_right_max_for_each_index[i][0],
                                                     left_max_and_right_max_for_each_index[i][1] )
                                                                                    
                #you cannot store -ve water, hence replace by 0 in case subtraction becomes -ve
                water_storable_in_this_index = max(minimum_of_left_and_right_wall - height[i], 0) 
                
                #sum up all the water amounts to get the total water amount
                total_water_amount += water_storable_in_this_index                
            return total_water_amount
            
        find_left_and_right_max_wall_heights(height)        
        total_water_amount = calculate_total_water_amount(height)
        return total_water_amount

Solution().trap([3,0,2,0,4]) 
*********************** Python Solution - end ************/