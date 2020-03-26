//Given an unsorted array of numbers which are randomly distributed across the a range, sort the numbers using bucket sort.

function bucketSort(arr, min, max){
  
  if(arr.length < 4){
    return arr.sort((a, b) => { return a - b })
  }
  
  let numOfBuckets = Math.ceil(Math.sqrt(arr.length))
  let bucketRange = (max-min)/numOfBuckets
  let buckets = []
  let bucketIndex;
  let result = []
  
  for(let i =0; i < numOfBuckets; i++){
    buckets.push([])
  }
  for(let i = 0; i < arr.length; i++){
    bucketIndex = Math.floor((arr[i]-min)/bucketRange)
    buckets[bucketIndex].push(arr[i])
  }

  for(let i = 0; i <buckets.length; i++){
    result.push(...bucketSort(buckets[i], i*bucketRange, i*bucketRange+bucketRange))
  }
  return result
}
console.log(bucketSort([0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434], 0.0, 1.0))

