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
            _resize(this._size*2);
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
            _resize(this._size/4);
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
    console.log("Stack test success.");

    function assert(b){
        if(!b){
            throw 1;
        }
        return true;
    }
})();