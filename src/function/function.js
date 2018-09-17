Array.prototype.remove = function(val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.clone = function(){
    let a=[];
    for(let i=0,l=this.length;i<l;i++) {
        a.push(this[i]);
    }
    return a;
};