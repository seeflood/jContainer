/**
    Set API definition
**/
Set.prototype={
    constructor:Set,
    add:function(v){},
    remove:function(v){},
    removeAll:function(set){},
    contains:function(v){},
    containsAll:function(set){},
    size:function(){},
    isEmpty:function(){}
};

function Set(){
    this.content={};
    this._size=0;
};

/**
    Set implementation
**/
(function(){
    Set.prototype.add=function(v){
        if(!this.content[v]){
            this.content[v]=1;
            this._size++;
        }
    };

    Set.prototype.remove=function(v){
        if(this.isEmpty() || !this.contains(v)){
            throw "The given value not exists in the set";
        }
        this.content[v]=null;
        this._size--;
    };


    Set.prototype.contains=function(v){
        if(!this.content[v]){
            return false;
        }
        return true;
    };
    
    Set.prototype.size=function(){
        return this._size;
    };


    Set.prototype.isEmpty=function(){
        return this._size==0;
    };


    Set.prototype.containsAll=function(set){
        for(var v in set.content){
            if(!this.contains(v)){
                return false;
            }
        }
        return true;
    };


    Set.prototype.removeAll=function(set){
        for(var v in set.content){
            if(this.contains(v)){
                this.remove(v);
            }
        }
    };


})();

//unit test
(function(){
    //set up 
    var set=new Set();
    var set2=new Set();
    var arr=[10,5,3,8,10,4,3];

    //exercise
    for(var i=0;i<arr.length;i++){
        set.add(arr[i]);
    }
    set2.add(3);
    set2.add(4);

    //validation
    assert(5==set.size());
    assert(set.contains(3));
    assert(set.containsAll(set2));

    set.removeAll(set2);
    assert(set.size()==3);

    function assert(b){
        if(!b){
            throw "Assertion Failed.";
        }
    }

})();