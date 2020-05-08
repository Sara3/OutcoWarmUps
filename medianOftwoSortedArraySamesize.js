/*
Median of two sorted array

same size

example: 
inp:
[1,2,3,4]
[5,6,7,10]

out: 
4.5

brute force: - merge 
Binary Search tree

two pointers 
6/2
3

1, 2,3 
     i 
[1,3,6]
   j
[2,7,20]



[1,2,3,6,7,20]


*/



function MedianOfTwoSortedArrays(arr1, arr2){
  let i1 = 0; 
  let i2 = 0; 
  
  let med1 = -1
  let med2 =-1
  
  let i = 0;
  let n = arr1.length
 
  while(i <= n){
    med1 = med2
    if(i1 == n){
      // if all my first array is smaller than second array
      med2 = arr2[0]
      
    } else if (i2 == n) {
      med2 = arr1[0]
    }
    
    else if (arr1[i1] < arr2[i2]){
      med2 = arr1[i1]
      i1++
    }
    else if (arr1[i1] >= arr2[i2]){
     med2 = arr2[i2]
      i2++
    }
    i++
  }
  console.log(med1, med2)
  return (med1+med2)/2
  
}

console.log(MedianOfTwoSortedArrays([8, 9, 10], [1, 2 , 3] ))












