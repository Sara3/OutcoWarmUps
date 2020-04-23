from random import randint, seed
from typing import Iterable, Iterator
from heapq import nlargest
from collections import deque, stack


def _compact(it: Iterable[int]) -> Iterator[int]:
    """ Sums up runs of same-sign ints """

    def sign(x):
        return -1 if x < 0 else 1

    it = iter(it)
    run = next(it, None)
    if run is None:
        return

    for x in it:
        if x == 0:
            continue
        if sign(run) == sign(x):
            run += x
        else:
            yield run
            run = x
    yield run


def _max_sums(it: Iterable[int], k: int = 1) -> int:
    """
    Special purpose max subarray function.
    Assuming input is alternating sign, we want to remove the negative numbers which
    most augments the maximal sum.
    """
    gains = deque(it)
    if len(gains) == 0:
        return [0]

    # remove negatives from ends, if any
    while len(gains) > 0 and gains[0] <= 0:
        gains.popleft()
    while len(gains) > 0 and gains[-1] <= 0:
        gains.pop()

    """
    Starting with the first positive number, consider pairs of subsequent values
    at a time. They will be of the form (-a, +b). If a+b > 0, we can add (a+b) to
    our current sum and record |a| as a possible future improvement.
    If a+b < 0, we have a local maximum but need to continue further to decide
    whether it is part of a larger maximum. If the accumulated sum drops <= 0,
    local values cannot contribute to a maximum down the road (Kadane's algorithm).
    We can record the peak maximum as a candidate max and add all of the "-a"s
    before local maxima as future improvements.
    """
    csum = peak = 0
    local_improvements = stack()
    local_peaks = stack()
    best_transactions = deque()
    for g in gains:
        csum += g
        if csum > peak:
            # taller peak means we take any drops we have seen so far
            # and add them as single transaction improvements
            best_transactions.extend(local_improvements)
            local_improvements.clear()
            peak = csum
        if csum <= 0:
            best_transactions.append(peak)
            best_transactions.extend(local_improvements)
            local_improvements.clear()
            csum = peak = 0
            continue

        # Note: this is skipped for any g dropping csum below 0 because they will
        # never be inside a maximal subarray and therefore cannot be improvements.
        if g < 0:
            local_improvements.append(-g)
        peak = max(peak, csum)

    best_transactions.append(peak)
    best_transactions.extend(local_improvements)

    print(best_transactions)
    # Use heapsort to get k-max
    return nlargest(k, best_transactions)


def stock_profits(prices, k=1):
    """
    Reduce the problem to maximizing subarray sum.
    Since we only care about net profit, we can look at the daily changes in prices,
    and find the "k" largest-sum subarrays (non-overlapping).

    Furthermore, since we will never sell on a day before we reach peak price and will
    never buy on a day before we reach bottom price, we can sum same sign differences
    and look at an array of alternating positive and negative integers.

    For example:
        [1, 5, 9, 7, 2, 6] -diffs-> [4, 4, -2, -5, 4] -sums-> [8, -7, 4]
    """
    diffs = (b - a for a, b in zip(prices, prices[1:]))
    runs = _compact(diffs)
    return _max_sums(runs, k)


def main():
    days = 10
    k = 9
    # example = [1, 2, 3, 4, 10, 20, 0, 1, 20, 19, 4]
    # seed(20200423)
    # example = [randint(0, 20) for _ in range(days)]
    example = [1, 7, 2, 4]
    print("Example prices:\t", example)
    profits = stock_profits(example, k)
    print(f"Best {k} transactions:\t", profits)


if __name__ == "__main__":
    main()
