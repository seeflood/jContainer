/**
    Bag Api
**/   
Bag.prototype={
    constructor:Bag,
    add:function(v){},
    remove:function(v){},
    size:function(){},
    isEmpty:function(){},
    contains:function(){},
    iterator:function(){}
};

function Bag(){
    this._size=0;
    this.root=null;
};

/**
Implementation
**/
(function(){
    Bag.prototype.add=function(v){
        var n=new Node(v,this.root);
        this.root=n;
        this._size++;
    };

    Bag.prototype.remove=function(v){
        if(this.isEmpty()){
            throw "The bag is empty.";
        }

        if(this.root.val==v){
            this.root=this.root.next;
            this._size--;
            return;
        }
        var n;
        var node=this.root;
        while(node.next){
            if(node.next.val==v){
                n=node;
                break;
            }
            node=node.next;
        }
        if(!n){
            throw "Not contain the given argument.";
        }
        node.next=node.next.next;
        this._size--;
    };
    Bag.prototype.size=function(){
        return this._size;
    };

    Bag.prototype.contains=function(v){
        var n=_find(this.root,v);
        if(!n){
            return false;
        }
        return true;
    };

    Bag.prototype.isEmpty=function(){
        return this._size==0;
    };

    Bag.prototype.iterator=function(){
        var head=new Node(0,this.root);
        var itr={
            hasNext:function(){
                return head.next!=null;
            },
            next:function(){
                head=head.next;
                return head.val;
            }
        }  ;
        return itr;
    };
    function Node(val,next){
        this.val=val;
        this.next=next;
    }

    function _find(node,v){
        if(node.val==v){
            return node;
        }
        while(node.next){
            node=node.next;
            if(node.val==v){
                return node;
            }
        }
        return null;
    }
})();

/**
    unit test
    **/
    (function(){
        var b=new Bag();
        assert(b.size()==0);

        var arr=[10,8,0,9,7,4,6,10];
        for(var i in arr){
            b.add(arr[i]);
        };
        assert(8==b.size());
        assert(b.contains(10));

        b.remove(10);
        assert(b.contains(10));
        b.remove(4);
        assert(!b.contains(4));

        var itr=b.iterator();
        var count=0;
        while(itr.hasNext()){
            itr.next();
            count++;
        }
        assert(count==b.size());
        
        function assert(b){
            if(!b){
                throw "Assertion Failed";
            }
        }
    })();