/**
    Graph API
**/
Graph.prototype={
    constructor:Graph,
    addEdge:function(a,b){},
    /**
        find ajacent vertices
    **/    
    adj:function(v){},
    sizeOfVertices:function(){},
    sizeOfEdges:function(){}
};

function Graph(sizeOfV){
    if(isNaN(sizeOfV)){
        throw "size of v must be a number.";
    }
    this.sizeV=sizeOfV;
    this.vertices=new Array(sizeOfV);
    this.sizeE=0;
    for(var i=0;i<sizeOfV;i++){
        this.vertices[i]=new Bag();
    }
};

/**
    Implementation
**/    
(function(){
    Graph.prototype.addEdge=function(a,b){
      this.vertices[a].add(b)  ;
      this.vertices[b].add(a);
      this.sizeE++;
    };
    Graph.prototype.adj=function(v){
      return this.vertices[v]  ;
    };
    Graph.prototype.sizeOfEdges=function(){
      return this.sizeE;
    };    
    Graph.prototype.sizeOfVertices=function(){
      return this.sizeV;
    };
})();


/**
    unit test
**/    
(function(){
    var g=new Graph(10);
    g.addEdge(1,2);
    g.addEdge(1,3);
    var v=g.adj(1);
    assert(v.size()==2);

    function assert(b){
        if(!b){
            throw "Assertion Failed!";
        }
    }
})();