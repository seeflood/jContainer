/**
    Bounded cache using LRU replace algorithm
    Below is API definition:
**/   
LRUCache.prototype={
    constructor:LRUCache,
    put:function(k,v){},
    get:function(k){},
    size:function(){},
    remove:function(k){},
    contains:function(k){}
    //not allow resize the bound
    //setBound:function(){},
};

function LRUCache(bound){
    if(!bound){
        throw "The bound must be specified.";
    }
    if(isNaN(bound)|| bound<=0){
        throw "The bound is illegal.";
    }
    this.bound=bound;
    this.content={};
    this.root=null;
    this.tail=null;
    this._size=0;
};

/**
    Implementation
**/
(function(){
    LRUCache.prototype.contains=function(k){
        var e=false;
        if(this.content[k]){
            e=true;
            this.access(k);
        }
        return e;
    };
    LRUCache.prototype.put=function(k,v){
        var node=this.content[k];
        if(node){
            node.value=v;
            this.access(node)  ;
            return;
        }
        //else,not already exists
        node=new Node(k,v);
        this.content[k]=node;
        this.access(node)  ;
        this._size++;
        if(this._size>this.bound){
            this.replace();
        }
    };
    LRUCache.prototype.get=function(k){
        var v=this.content[k];
        if(v)
        {
            this.access(k);
            return v.value;
        }
        return null;
    };
    LRUCache.prototype.size=function(){
        return this._size;
    };
    LRUCache.prototype.remove=function(k){
        var n=this.content[k];
        if(!n){
            throw "Not exists!";
        }
        this.removeFromList(n);
        this.removeFromTable(n);
    };    
    LRUCache.prototype.access=function(node){
        if(this.size()==0){
            this.root=node;
            this.tail=node;
            return;
        };
        if(this.root==node){
            return;
        }
        //do remove
        if(node.prev){
            node.prev.next=node.next;
        }
        //add to the first
        node.prev=null;
        node.next=this.root;
        this.root=node;
    };    
    LRUCache.prototype.replace=function(){
        var t=this.tail;
 
        this.removeFromList(t);
        this.removeFromTable(t);
    };    
    LRUCache.prototype.removeFromList=function(node){
        //remove from the linked list
        if(this._size==1){
            this.root=null;
            this.tail=null;
            this._size--;
            return;
        }
        if(node==this.root){
            this.root=node.next;
        }else if(node==this.tail){
            this.tail=node.prev;
        }else{
            node.prev.next=node.next;
        }  
        this._size--;
    };
    LRUCache.prototype.removeFromTable=function(node){
        this.content[node.key]=null  ;
    };

    function Node(k,v,next,prev){
        this.key=k;
        this.value=v;
        this.next=next;
        this.prev=prev;
    }
})()    ;

/**
    unit test
**/
(function(){
    var cache=new LRUCache(2);
    cache.put("zhou",10);
    cache.put("zhou",1000);
    assert(1000==cache.get("zhou"));
    assert(1==cache.size());
    cache.put("wang",9);
    cache.put("ma yun",10000000000);
    assert(2==cache.size());
    assert(null==cache.get("zhou"));

    function assert(b){
        if(!b){
            throw "Assertion Failed!";
        }
    }
})()    ;