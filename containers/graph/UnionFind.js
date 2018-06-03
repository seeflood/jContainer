/**
    并查集UnionFind API
**/
UnionFind.prototype={
  constructor:UnionFind,
  union:function(a,b)  {},
  connected:function(a,b){},
  /**How many separate components are in the container?**/
  count:function(){}
};

function UnionFind(n){
    this._arr=new Array(n);
    this._count=n;
    this._weight=new Array(n);
    for(var i=0;i<this._arr.length;i++){
        this._arr[i]=i;
        this._weight[i]=1;
    }
}

/**
    UnionFind Implementation
**/
(function(){
    UnionFind.prototype.count=function(){
        return this._count;
    };
    UnionFind.prototype.union=function(a,b){
        var ra=root(this._arr,a);
        var rb=root(this._arr,b);
        if(ra==rb){
            return;
        }
        var parent,son;
        if(this._weight[ra]>this._weight[rb]){
            parent=ra;
            son=rb;
        }else{
            parent=rb;
            son=ra;            
        }
        this._arr[son]=parent;
        this._weight[parent]+=this._weight[son];
        this._count--;
    };

    UnionFind.prototype.connected=function(a,b){
        var ra=root(this._arr,a);
        var rb=root(this._arr,b);
        return ra==rb;
    };

    function root(arr,a){
        var result=arr[a];
        if(result==a){
            return a;
        }
        while(arr[result]!=result){
            this._weight[result]--;
            result=arr[result];
        }
        //hoisting
        arr[a]=result;
        
        return result;
    }

})();

/**
    unit test
**/    
(function(){
    var uf=new UnionFind(10);
    uf.union(1,4);
    uf.union(2,3);
    uf.union(4,5);
    assert(uf.connected(1,5));
    assert(!uf.connected(1,2));
    assert(uf.count()==7);

    function assert(b){
        if(!b){
            throw "Assertion Failed";
        }
    }
})();   
