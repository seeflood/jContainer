/**
    RedBlackTree API
    目前只写了contains,put,get,min,max,size
    ,isEmpty,select,rank,count,range
    别的用到再写
    实现原理参考：https://algs4.cs.princeton.edu/33balanced/
**/
RedBlackTree.prototype={
    constructor:RedBlackTree  ,
    size:function(){},
    isEmpty:function(){},
    get:function(key){},
    contains:function(key){},
    put:function(key,v){},
    deleteMin:function(){},
    deleteMax:function(){},
    delete:function(key){},
    min:function(){},
    max:function(){},
    floor:function(key){},
    ceiling:function(key){},
    /** the rank start from 0**/
    select:function(rank){},
    count:function(a,b){},
    range:function(a,b){},
    /** 
        return the number of keys in the tree 
        less than the given key
        **/
    rank:function(key){},
    DEFAULT_COMPARATOR:function(a,b){}
};

function RedBlackTree(comparator){
    this.root=null;
    if(!comparator){
        comparator=this.DEFAULT_COMPARATOR;
    }
    this.comparator=comparator;
};

/**
    RedBlackTree impl
**/
(function(){
    var BLACK=false,RED=true;
    var _comparator=RedBlackTree.DEFAULT_COMPARATOR;

    RedBlackTree.prototype.DEFAULT_COMPARATOR=function(a,b){
            if(a<b){
                return -1;
            }else if(a>b){
                return 1;
            }else{
                return 0;
            }
        };

    RedBlackTree.prototype.size=function(){
      return _size(this.root)  ;
    };

    RedBlackTree.prototype.isEmpty=function(){
        return 0==this.size();
    };

    RedBlackTree.prototype.get=function(key){
        _comparator=this.comparator;
        return _get(this.root,key);
    };
    RedBlackTree.prototype.contains=function(key){
        return (this.get(key)!=null);
    };

    RedBlackTree.prototype.put=function(key,val){
        _comparator=this.comparator;
        this.root=put(this.root,key,val);
        this.root.color=BLACK;
    };
    RedBlackTree.prototype.min=function(){
        if(this.isEmpty()){
            throw "The tree is Empty!";
        }
        return min(this.root).key;
    };
    RedBlackTree.prototype.max=function(){
        if(this.isEmpty()){
            throw "The tree is Empty!";
        }
        return max(this.root).key;
    };

    RedBlackTree.prototype.select=function(rank){
        if(this.isEmpty()){
            throw "The tree is Empty!";
        }
        if(rank<0 || rank>=this.size()){
            throw "Argument out of count!";
        }
        return select(this.root,rank).key;
    };

    RedBlackTree.prototype.rank=function(key){
        if(this.isEmpty()){
            throw "The tree is Empty!";
        }
        _comparator=this.comparator;
        return rank(this.root,key);
    };
    RedBlackTree.prototype.count=function(a,b){
        if(this.contains(b)){
            return this.rank(b)-this.rank(a)+1;
        }
        return this.rank(b)-this.rank(a);
    };

    RedBlackTree.prototype.range=function(a,b){
        var resultSet={};
        range(this.root,a,b,resultSet);
        return resultSet;
    };
    function range(node,a,b,resultSet){
        if(!node){
            return;
        }
        if(node.key<a){
            return range(node.right,a,b,resultSet);
        }
        if(node.key>b){
            return range(node.left,a,b,resultSet);
        }
        //otherwise,this node'key is in the range
        resultSet[node.key]=node.val;
        range(node.left,a,node.key,resultSet);
        range(node.right,node.key,b,resultSet);
    };
    function rank(node,key){
        if(!node){
            return 0;
        }
        var cmp=_comparator(key,node.key);
        if(cmp<0){
            return rank(node.left,key);
        }else if(cmp>0){
            return 1+_size(node.left)+rank(node.right,key);
        }else{
            return _size(node.left);
        }
    }
    function select(node,rank){
        var s=_size(node.left);
        if(s<rank){
            return select(node.right,rank-s-1);
        }else if(s>rank){
            return  select(node.left,rank);
        }else{
            return node;
        }
    }
    
    function min(node){
        while(node.left){
            node=node.left;
        }
        return node;
    };
    function max(node){
        while(node.right){
            node=node.right;
        }
        return node;
    }

    function put(node,key,val){
        if(!node){
            return new Node(key,val,RED,1);
        }
        var cmp=_comparator(key,node.key);
        if(cmp<0){
            node.left=put(node.left,key,val);
        }else if(cmp>0){
            node.right=put(node.right,key,val);
        }else{
            node.val=val;
        }
        //rotate the fucking sub tree!!!!!!!!!!!
        if(isRed(node.right)&&!isRed(node.left)){
            node=rotateLeft(node);
        }
        if(isRed(node.left)&&isRed(node.left.left)){
            node=rotateRight(node);
        }
        if(isRed(node.left)&&isRed(node.right)){
            flipColor(node);
        }

        //maintain the fucking size!!!!
        node.size=_size(node.left)+_size(node.right)+1;
        return node;
    };

    function rotateLeft(node){
        var x=node.right;
        node.right=x.left;
        x.left=node;
        x.color=node.color;
        node.color=RED;
        return x;
    };

    function rotateRight(node){
        var x=node.left;
        node.left=x.right;
        x.right=node;
        x.color=node.color;
        node.color=RED;
        return x;
    };

    function flipColor(node){
        node.color=RED;
        node.left.color=BLACK;
        node.right.color=BLACK;
    };
    function isRed(node){
        if(!node){
            return false;
        }
        return node.color==RED;
    }

    function _size(node){
        if(!node){
            return 0;
        }
        return node.size;
    };
    function _get(node,key){
      //traverse the search tree
      while(node)  {
          var cmp=_comparator(key,node.key);
          if(cmp<0){
            node=node.left;
          }else if(cmp>0){
              node=node.right;
          }else{
              return node.val;
          }
      }
    };
    /**
        Node of the tree
        **/
    function Node(key,val,color,size){
        this.key=key;
        this.val=val;
        //color of parent link
        this.color=color;
        this.size=size;
        this.left=null;
        this.right=null;
    };
})();


/**
    Unit test
**/
(function(){
    //set up
    var tree=new RedBlackTree();
    var arr=[10,8,1,0,7,8,9,5];
    console.log("The raw array is:");
    console.log(arr);

    //exercise
    for(var i=0;i<arr.length;i++){
        tree.put(arr[i],"index"+i);
    }
    shuffle(arr);
    console.log("After putting them into the tree,list the tree randomly:");
    for(var i=0;i<arr.length;i++){
        var k=arr[i];
        var temp=tree.get(k);
        console.log(k+","+temp);
    };
    var result=tree.range(0,5);

    //validation
    assert("index3"==tree.get(0));
    //value of key 8 has been overwrited.
    assert("index5"==tree.get(8));
    assert(10==tree.max());
    assert(0==tree.min());
    assert(5==tree.select(2));
    assert(2==tree.rank(5));
    assert(0==tree.rank(0));
    assert(3==tree.count(0,5));
    assert(result[0]=="index3");
    assert(result[1]=="index2");
    assert(result[5]=="index7");
    function shuffle(arr){
        if(!arr || arr.length<=1){
            return;
        }
        for(var j=1;j<arr.length;j++){
            var target=Math.floor(Math.random()*j);
            var t=arr[target];
            arr[target]=arr[j];
            arr[j]=t;
        }
    }

    function assert(b){
        if(!b){
            throw "Assertion Failed!";
        }
    }
})();