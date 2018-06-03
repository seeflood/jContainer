/**数组实现**/
function Queue(size){
    this._init(size);
}

Queue.prototype={
    constructor:Queue,
    enqueue:function(v){
        //check resize
        if(this.tail==this._capacity){
            this._resize(this._count*2);
        }
        this._arr[this.tail]=v;
        this.tail++;
        this._count++;
        if(this.head==-1){
            this.head=0;
        }
    },
    dequeue:function(){
        if(this.isEmpty()){
            throw "can't dequeue when empty";
        }
        var temp=this._arr[this.head];
        this._arr[this.head]=null;
        this._count--;
        this.head++;
        //check resize;
        if(this.isEmpty()){
            this._init();
        }else if(this._count<(this._capacity/4)){
            this._resize(this._count*2);
        }
        return temp;
    },
    isEmpty:function(){
        return (this._count==0);
    },
    size:function(){
        return this._count;
    },
    DEFAULT_capacity:10,
    _resize:function(newCap){
        

        if(this.isEmpty()){
            this._init(newCap);
            return;
        }
        //stash old array
        var _oldArr=this._arr;
        var _oldH=this.head;
        var _oldT=this.tail;
        //reset
        this._init(newCap);
        //copy array
        
        for(var i=_oldH;i<_oldT;i++){
            this._arr[i-_oldT]=_oldArr[i];
            _oldArr[i]=null;
        }
    },
    _init:function(size){
        this._count=0;
        this._capacity=(size&&(size%1==0))?size:Queue.DEFAULT_capacity;
        this._arr=new Array(this._capacity);
        this.head=-1;
        this.tail=0;
    }
};


//unit test
(function(){
   var q=new Queue(1);
   q.enqueue(1);
   var s1=q.size();
    assert(s1==1);
    var t=q.dequeue();
    assert(t==1);
    assert(q.isEmpty());
    
    q.enqueue(2);
    q.enqueue(3);
    assert(q.size()==2);

   function assert(b){
       if(!b){
           throw "assert fail";
       }
   }

})();