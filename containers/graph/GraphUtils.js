/**
    Graph related algorithms
    Below is GraphUtils API definition:
**/
GraphUtils = {
    degree: function(graph, v) {},
    maxDegree: function(graph) {},
    averageDegree: function(graph) {},
    numberOfSelfLoops: function(graph) {},
    /**
        Depth-first search.
        Return an instance of GraphPath
            **/
    dfs: function(graph, v) {},

    /**
        Breadth-first search
        Return an instance of GraphPath with an extra method:
            int distanceTo(target){}
        **/
    bfs: function(graph, v) {},

    connectedComponents: function(graph) {}
};

/**
    Class GraphPath API definition
**/
GraphPath.prototype = {
    constructor: GraphPath,
    /**
       check if there's a path to the target vertex.
    **/
    hasPath: function(target) {},

    /**
       This method return a iterator,which has method like:

       class iterator{
            boolean hasNext(){};
            value next(){}
       } 

       I dont know how to describe it without comment.
       Fuck javascript.
    **/
    pathTo: function(v) {}
}

function GraphUtils() {}
function GraphPath() {}

/**
    GraphPath Implementation
**/
(function() {
    GraphPath.prototype.hasPath = function(v) {
        return this.hasPathCB(v);
    }
    GraphPath.prototype.pathTo = function(v) {
        return this.pathToCB(v);
    }
}
)();

/**
    GraphUtils Implementation
**/
(function() {
    GraphUtils.degree = function(graph, v) {
        var bag = graph.adj(v);
        return bag.size();
    }

    GraphUtils.maxDegree = function(graph) {
        var max = 0;
        for (var i = 0; i < graph.sizeOfVertices(); i++) {
            var d = this.degree(graph, i);
            if (d > max) {
                max = d;
            }
        }
        return max;
    }

    GraphUtils.averageDegree = function(graph) {
        return 2 * graph.sizeOfEdges() / graph.sizeOfVertices();
    }

    GraphUtils.numberOfSelfLoops = function(graph) {
        var count = 0;
        for (var i = 0; i < graph.sizeOfVertices(); i++) {
            var bag = graph.adj(i);
            var itr = bag.iterator();
            while (itr.hasNext()) {
                var v = itr.next();
                if (v == i) {
                    count++;
                }
            }
        }
        return count / 2;
    }

    GraphUtils.dfs = function(graph, v) {
        var len = graph.sizeOfVertices();
        var root = v;
        var marked = new Array(len);
        var edgeTo = new Array(len);
        _dfs(graph, v, marked, edgeTo);

        var paths = new GraphPath();
        paths.hasPathCB = function(v) {
            return marked[v] == true;
        }
        paths.pathToCB = function(v) {
            if (!this.hasPath(v)) {
                return null;
            }
            var stack = new Stack();
            for (var x = v; x != root; x = edgeTo[x]) {
                stack.push(x);
            }
            stack.push(root);
            return stack.iterator();
        }
        return paths;
    }

    GraphUtils.bfs = function(g, v) {
        var len = g.sizeOfVertices();
        var edgeTo = new Array(len);
        var disTo = new Array(len);
        var distance = 0;
        var root = v;
        edgeTo[v] = v;
        disTo[v] = distance;

        //use a queue for bfs
        var q = new Queue();
        q.enqueue(v);
        //start bfs traverse
        while (!q.isEmpty()) {
            var next = q.dequeue();
            distance++;
            //check the ajacent vertices
            var itr = g.adj(next).iterator();
            while (itr.hasNext()) {
                var temp = itr.next();
                if (edgeTo[temp]) {
                    //has been marked
                    continue;
                }
                q.enqueue(temp);
                edgeTo[temp] = next;
                disTo[temp] = distance;
            }
        }
        var paths = new GraphPath();
        paths.hasPathCB = function(v) {
            return edgeTo[v] != null;
        }
        paths.pathToCB = function(v) {
            if (!this.hasPath(v)) {
                return null;
            }
            var stack = new Stack();
            for (var x = v; x != root; x = edgeTo[x]) {
                stack.push(x);
            }
            stack.push(root);
            return stack.iterator();
        }
        paths.distanceTo = function(v) {
            if (!this.hasPath(v)) {
                return -1;
            }
            return disTo[v];
        }
        return paths;
    }

    GraphUtils.connectedComponents = function(g) {
        var size = g.sizeOfVertices();
        var marked = new Array(size);
        var edgeTo = new Array(size);
        var count = 0;

        for (var i = 0; i < size; i++) {
            if (!marked[i]) {
                _dfs(g, i, marked, edgeTo);
                count++;
            }
        }
        return count;
    }

    function _dfs(g, v, marked, edgeTo) {
        marked[v] = true;
        var itr = g.adj(v).iterator();
        while (itr.hasNext()) {
            var n = itr.next();
            if (!marked[n]) {
                _dfs(g, n, marked, edgeTo);
                edgeTo[n] = v;
            }
        }
    }
}
)();

/**
    unit test
**/
(function() {
    testDegreeRelated();
    testDfs();
    testBfs();
    testCC();

    function testCC() {
        var g = new Graph(10);
        g.addEdge(1, 2);
        g.addEdge(1, 5);
        var result = GraphUtils.connectedComponents(g);
        assert(8 == result);
    }
    function testDegreeRelated() {
        var g = new Graph(10);
        g.addEdge(1, 2);
        g.addEdge(1, 5);
        assert(GraphUtils.degree(g, 1) == 2);
        assert(GraphUtils.maxDegree(g) == 2);
        assert(GraphUtils.averageDegree(g) == 0.4);
        g.addEdge(1, 1);
        g.addEdge(1, 1);
        assert(GraphUtils.numberOfSelfLoops(g) == 2);
    }

    function testDfs() {
        var g = new Graph(10);
        g.addEdge(1, 2);
        g.addEdge(1, 5);
        g.addEdge(2, 9);
        var paths = GraphUtils.dfs(g, 5);
        assert(paths.hasPath(9));
        var itr = paths.pathTo(9);
        var expectedPath = [5, 1, 2, 9];
        _testPath(itr, expectedPath);
    }

    function testBfs() {
        var g = new Graph(10);
        g.addEdge(1, 2);
        g.addEdge(1, 5);
        g.addEdge(2, 9);
        var paths = GraphUtils.bfs(g, 5);
        assert(paths.hasPath(9));
        var itr = paths.pathTo(9);
        var expectedPath = [5, 1, 2, 9];
        _testPath(itr, expectedPath);

        //test distanceTo
        assert(3 == paths.distanceTo(9));

        //test shortest path
        g.addEdge(5, 9);
        paths = GraphUtils.bfs(g, 5);
        assert(paths.hasPath(9));
        assert(1 == paths.distanceTo(9));
        expectedPath = [5, 9];
        _testPath(paths.pathTo(9), expectedPath);
    }

    function _testPath(itr, expected) {
        var count = 0;
        while (itr.hasNext()) {
            var temp = itr.next();
            assert(temp == expected[count]);
            count++;
        }
        assert(count == expected.length);
    }

    function assert(b) {
        if (!b) {
            throw "Assertion Failed.";
        }
    }
}
)();
