/**
    Array related algorithms.
    Below is API definition:
**/
ArrayUtils = {
    sort: function(arr) {},
    /**
        选择排名k的。k从零起算
    **/
    select: function(arr, rank) {}
};

/**
    Implementation
**/
(function() {
    var qSort = {
        sort: function(arr) {
            shuffle(arr);
            this._sort(arr, 0, arr.length - 1);
        },
        _sort: function(arr, lo, hi) {
            //shuffle(arr);
            if (lo >= hi)
                return;

            //split
            var m = arr[lo];
            var lt = lo
              , gt = hi
              , i = lt + 1;
            while (i <= gt) {
                if (arr[i] < m) {
                    exchange(arr, lt, i);
                    lt++;
                    i++;
                } else if (arr[i] > m) {
                    exchange(arr, i, gt);
                    gt--;
                } else {
                    i++;

                }
            }
            this._sort(arr, lo, lt - 1);
            this._sort(arr, gt + 1, hi);
        }
    };
    var qSelect = {
        select: function(arr, k) {
            shuffle(arr);
            console.log("after shuffle:", arr);
            var lo = 0
              , hi = arr.length - 1;
            while (hi > lo) {
                var j = this.partition(arr, lo, hi);
                if (j.end < k) {
                    lo = j.end + 1;
                } else if (j.start > k) {
                    hi = j.start - 1;
                } else {
                    return arr[k];
                }
            }
            return arr[k];
        },
        partition: function(arr, lo, hi) {
            var m = arr[lo];
            var lt = lo
              , gt = hi
              , i = lt + 1;
            while (i <= gt) {
                var t = arr[i];
                if (t < m) {
                    exchange(arr, i, lt);
                    lt++;
                    i++;
                } else if (t > m) {
                    exchange(arr, i, gt);
                    gt--;
                } else {
                    i++;
                }
            }
            return {
                start: lt,
                end: gt
            }
        }
    };


	//策略模式，方便换算法
    ArrayUtils.sort = function(arr){
        return qSort.sort(arr);
    };

    ArrayUtils.select = function(arr,k){
        return qSelect.select(arr,k);
    };

    function exchange(arr, a, b) {
        var t = arr[a];
        arr[a] = arr[b];
        arr[b] = t;
    }

    function shuffle(arr) {
        for (var i = 0; i < arr.length; i++) {
            var t = Math.floor(Math.random() * i);
            exchange(arr, t, i);
        }

    }
}
)();

/**
    unit test
**/
(function() {
    var arr = [9, 8, 7, 0, 1, 2, 3, 5, 6];

    var t = ArrayUtils.select(arr, 4);
    assert(t == 5);

    ArrayUtils.sort(arr);
    for (var i = 0; i < arr.length - 1; i++) {
        assert(arr[i] <= arr[i + 1]);
    }
    ;
    function assert(b) {
        if (!b) {
            throw "Assertion Failed.";
        }
    }
}
)();
