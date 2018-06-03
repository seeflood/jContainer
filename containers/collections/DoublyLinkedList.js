/**
双向链表

**/
var DoublyLinkedList=(function(){

    function Node(element){
        this.element=element;
    }
    function SentinelNode(){}
       
    var n=new Node();
    SentinelNode.prototype=n;
    SentinelNode.prototype.constructor=SentinelNode;
   

    function DoublyLinkedList(){
        this.head=new SentinelNode();
        this.tail=new SentinelNode();
        this.head.next=this.tail;
        this.tail.prev=this.head;
        this.count=0;
    }
    DoublyLinkedList.prototype={
        size:function(){
            return this.count;
        },
        isEmpty:function(){
            return this.count==0;
        },
        first:function(){
            var fn=this.head.next;
            return _getEle(fn);
        },
        last:function(){
          var ln= this.tail.prev;
          return _getEle(ln);
        },
        addFirst:function(e){
            var newN=new Node(e);
            _addBetween(newN,this.head,this.head.next);
            this.count++;
        },
        addLast:function(e){
          var newN=new Node(e)  ;
          _addBetween(newN,this.tail.prev,this.tail);
          this.count++;
        },
        removeFirst:function(){
            if(this.count==0){
                return undefined;
            }
            var _h=this.head.next;
            this.head.next=this.head.next.next;
            this.head.next.prev=this.head;
            this.count--;
            return _getEle(_h);
        },
        removeLast:function(){
            if(this.count==0){
                return undefined;
            }
            var _l=this.tail.prev;
            this.tail.prev.prev=this.tail;
            this.tail.prev=this.tail.prev.prev;
            this.count--;
            return _getEle(_l);
        },
        constructor:DoublyLinkedList
    }

    
    return DoublyLinkedList;

    function _getEle(node){
        if(node instanceof SentinelNode){
            return undefined;
        }else if(node instanceof Node){
            return node.element;
        }else{
            return undefined;
        }
    }

    function _addBetween(newN,left,right){
        left.next=newN;
        newN.prev=left;
        newN.next=right;
        right.prev=newN;
    }
})();


/*var dl=new DoublyLinkedList();
dl.addFirst(2);
dl.addFirst('111');
dl.addLast('3');
var s=dl.removeLast();
console.log(s);
console.log(dl.first());
console.log(dl.size());*/