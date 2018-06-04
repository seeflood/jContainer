function Stack(size){
    this._count=0;
    this._size=(size&& (size%1==0))?size:Stack.DEFAULT_COUNT;
    this.arr=new Array(this._size);
}

Stack.prototype={
    constructor:Stack,
    push:function(v){
        //resize
        if(this._count==this._size){
            this._resize(this._size*2);
        }
        this.arr[this._count]=v;
        this._count++;
    },
    pop:function(){
        if(this._count==0){
            throw "can't prop when empty!";
        }
        var temp=this.arr[this._count-1];
        this.arr[this._count-1]=null;
        this._count--;
        //resize
        if(this._count<(this._size/4)){
            this._resize(this._size/4);
        }
        return temp;
    },
    size:function(){
      return this._count;
    },
    isEmpty:function(){
      return (this._count==0)  ;
    },
    DEFAULT_COUNT:1,
    _resize:function(newSize){
        var newArr=new Array(newSize);
        //length equals min(_count,newSize)
        var len=(this._count<newSize)?this._count:newSize;
        for(var i=0;i<len;i++){
            newArr=this.arr[i];
        }
        this.arr=newArr;
    },
    iterator:function(){
        var _this=this;
        var len=this.size();
        var curr=len;
        return {
            hasNext:function(){
                return (curr>0);
            },
            next:function(){
                curr--;
                return _this.arr[curr];
            }
        }
    }
};

//unit test
(function(){
    var s=new Stack();
    s.push(11111);
    var aaa=s.size();
    assert(aaa==1);      
    var bbb=s.pop();

    assert(bbb==11111);
    assert(s.isEmpty());
    
    s.push(9);
    s.push(0);
    testIterator(s);
    console.log("Stack test success.");

    function testIterator(s){
        var count=0;
        var itr=s.iterator();
        while(itr.hasNext()){
            itr.next();
            count++;
        }
        assert(count==s.size());
    }
    function assert(b){
        if(!b){
            throw 1;
        }
        return true;
    }
})();