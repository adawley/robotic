/*
 * Array object prototypes
 */
Array.prototype.map = function(callback){
    var i = 0;
    for(;i<this.length;i++){
        callback(this[i]);
    }
}