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
        depth-first search.
        return an instance of GraphPath
            **/
    dfs: function(graph, v) {}
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
        _dfs(graph, v);
        function _dfs(g, v) {
            marked[v] = true;
            var itr = g.adj(v).iterator();
            while (itr.hasNext()) {
                var n = itr.next();
                if (!marked[n]) {
                    _dfs(g, n);
                    edgeTo[n] = v;
                }
            }
        }
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

}
)();

/**
    unit test
**/
(function() {
    testDegreeRelated();
    testDfs();
    
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
        g.addEdge(2,9);
        var paths=GraphUtils.dfs(g,5);
        assert(paths.hasPath(9));
        var itr=paths.pathTo(9);
        var expectedPath=[5,1,2,9];
        var count=0;
        while(itr.hasNext()){
            var temp=itr.next();
            assert(temp==expectedPath[count]);
            count++;
        }
        assert(count==expectedPath.length);
    }

    function assert(b) {
        if (!b) {
            throw "Assertion Failed.";
        }
    }
}
)();
