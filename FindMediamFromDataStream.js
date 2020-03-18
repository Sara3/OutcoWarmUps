// Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.
// For example,

// [2,3,4], the median is 3

// [2,3], the median is (2 + 3) / 2 = 2.5

// Design a data structure that supports the following two operations:

//     void addNum(int num) - Add a integer number from the data stream to the data structure.
//     double findMedian() - Return the median of all elements so far.

 

// Example:

// addNum(1)
// addNum(2)
// findMedian() -> 1.5
// addNum(3) 
// findMedian() -> 2


var MedianFinder = function () {
 this.arr = []
};

// /** 
//  * @param {number} num
//  * @return {void}
//  */
MedianFinder.prototype.addNum = function (num) {  
  this.arr.push(num)
};

/**

 */
MedianFinder.prototype.findMedian = function () {
  // sort 
  this.arr.sort((a, b) => a - b)
  // ever or odd 
  let size = this.arr.length
  return (size & 1 ? this.arr[size / 2] : (this.arr[size / 2 - 1] + this.arr[size / 2]) * 0.5);
};

var ob = new MedianFinder()
ob.addNum(10)
ob.addNum(111)
ob.addNum(11)
ob.addNum(12)

console.log(ob.findMedian())