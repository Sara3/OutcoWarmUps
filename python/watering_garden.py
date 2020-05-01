"""
Minimum number of taps needed to water a garden.
Input:
    - n: size of garden, [0, n]
    - ranges: array of size n+1 designating radius of tap at each point in the garden
Output:
    - t: the minimum number of taps that can cover the entire garden: [0, n]

Constraints:
    a) 1 <= n <= 10^4
    b) size of ranges is n+1
    c) 0 <= ranges[i] <= 100

Note: a tap with range of zero can only water the point it is on.
"""


def min_taps(n: int, ranges: [int]) -> int:
    if n <= 1:
        return 1

    # Reduce the problem to the "minimum jumps" problem.
    # Transform the ranges array so that each index, i, stores the rightmost
    # position that a single sprinkler can reach where i is the left-most extent
    # of the sprinkler. E.g., sprinkler with radius 3 at point 5 will be converted
    # to a 8 at index 2, since this sprinkler can cover [2, 8]
    table = [0 for _ in range(n + 1)]
    for i in range(n + 1):
        r = ranges[i]
        low = max(0, i - r)
        high = min(n, i + r)
        table[low] = max(table[low], high)

    # Count number of "hops" it takes to reach the end of the garden
    # Each hop represents a choice of a sprinkler that can water the
    # starting point and extends furthest to the right.
    bound = idx = count = 0
    while bound < n:
        count += 1
        # Search for furthest possible range for the next sprinkler choice
        for j in range(idx, bound + 1):
            bound = max(bound, table[j])
            idx += 1
        # If we haven't been able to extend our boundary, we do not have a sprinkler
        # choice that can water our current position plus some more ahead.
        if idx > bound:
            return -1

    return count


def main():
    test_cases = [
        (5, [3, 4, 1, 1, 0, 0], 1),
        (3, [0, 0, 0, 0], -1),
        (7, [1, 2, 1, 0, 2, 1, 0, 1], 3),
        (8, [4, 0, 0, 0, 0, 0, 0, 0, 4], 2),
        (8, [4, 0, 0, 0, 4, 0, 0, 0, 4], 1),
    ]

    for n, ranges, answer in test_cases:
        print(f"Input: n={n}, ranges={ranges}")
        print("Answer: ", min_taps(n, ranges))
        print()


if __name__ == "__main__":
    main()
