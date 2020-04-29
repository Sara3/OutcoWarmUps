from random import randint, seed
from heapq import nlargest
from collections import deque
from itertools import starmap


def max_profits(price_intervals, k=1) -> int:
    """
    We are given an input of (lo, hi) values representing an interval
    where the price goes from a local minimum to a local maximum.
    By comparing adjacent points, we can determine all possible profits
    and return the k-largest ones.

    Maintain a stack of intervals where the top represents our current profit window.
    If the top of the stack is (lo1, hi1) and the next interval to consider is
    (lo2, hi2), there are two special cases we need to handle:
        a) lo2 < lo1: in this case, all gains from (lo1, hi1) are negated by the drop
            from hi1 to lo2. Since we can't sell at the hi1 price after having bought
            at lo2, we remove (lo1, hi1) off of the stack and place (lo2, hi2) there
            as our new profit window. Record profit hi1 - lo1.
        b) hi2 >= hi1 and low2 >= low1: in this case the larger single price window is
            (lo1, hi2) but the larger total profit comes from the sum of both windows.
            - Fortunately, we can store the difference between the hi1 and lo2, as a
            future transaction: this is the cost we are paying to have this larger
            single transaction over two separate transaction. If we have an extra
            transaction to use later, we could offset this cost by having done two
            transactions.
    One final point: because we may have lots of local maximum profits inside larger
    windows (handling case a may remove a hi value higher than the new hi, and case
    b may take out a lo value lower than the new lo), we have to iteratively apply the
    rules to make sure we account for all potential (lo, hi) values where lo comes
    before hi.
    """
    profits = deque()
    windows = deque()

    def case_a(lo2, hi2):
        if len(windows) == 0:
            return False

        lo1, hi1 = windows[-1]
        if lo2 < lo1:
            if hi1 - lo1 > 0:
                profits.append(hi1 - lo1)
            windows.pop()
            return True
        return False

    def case_b(lo2, hi2):
        # This passes back the lower lo value as second return value
        if len(windows) == 0:
            return False, lo2
        lo1, hi1 = windows[-1]
        if hi2 >= hi1 and lo2 >= lo1:
            # this is the price drop we can get rid of later using another
            # transaction
            p = hi1 - lo2
            if p > 0:
                profits.append(p)
            windows.pop()
            return True, lo1
        return False, lo2

    for lo2, hi2 in price_intervals:
        while case_a(lo2, hi2):
            pass

        _cont, lo2 = case_b(lo2, hi2)
        while _cont:
            _cont, lo2 = case_b(lo2, hi2)
            pass

        # Having resolved the above two cases, we add range (lo2, hi2) to stack
        windows.append((lo2, hi2))

    # pop out any remaining windows and add their profits
    for lo, hi in windows:
        profits.append(hi - lo)

    # Use heapsort to return k-largest profits
    return nlargest(k, profits)


def stock_profits(prices, k=1):
    """
    This is the driver routine to get the valley, peaks from the input
    and feed it to the max_profits function. See its description for
    more info.
    """
    n = len(prices)
    if n < 2 or k < 1:
        return 0
    elif n == 2:
        return max(0, prices[1]-prices[0])

    intervals = deque()
    lo, hi = prices[:2]
    for x in prices[2:]:
        while lo > hi:
            lo, hi = hi, x
            continue
        while hi < x:
            hi = x
            continue

        intervals.append((lo, hi))
        lo, hi = hi, x

    return max_profits(intervals, k)


def main():
    days = 20
    k = 4
    # example = [1, 2, 3, 4, 10, 20, 0, 1, 20, 19, 4]
    seed(20200423)
    example = [randint(0, 20) for _ in range(days)]
    print("Example prices:\t", example)
    profits = stock_profits(example, k)
    print(f"Best (at most) {k} transactions:\t", profits)


if __name__ == "__main__":
    main()
