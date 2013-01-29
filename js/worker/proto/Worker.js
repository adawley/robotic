/*
 * Worker object prototypes
 */
Worker.prototype.NAME = '';
Worker.prototype.WEIGHT = -1;
Worker.prototype.init = function(name, weight){
    // set the message listener
    this.onmessage = function (event) {
        var data = event.data;
        switch (data.cmd) {
            case 'dead':
                $('#'+name).remove();
                break;
            case 'wired':
                $('#'+name+' #workerWires').append(data.msg);
                break;
            default:
                $('#'+name+' div.workerMsg').html(event.data);                                
        }                        
    };
    this.name(name);
    this.NAME = name;
    this.weight(weight);
    this.WEIGHT = weight;
}
Worker.prototype.kill = function(){
    this.postMessage({
        'cmd':'kill'
    });
}
Worker.prototype.name = function(name){
    name = (typeof(name) === "undefined") ? '' : name;
    this.postMessage({
        'cmd':'name',
        'msg': name
    });
}
Worker.prototype.start = function(){
    this.postMessage({
        'cmd':'start'
    });
}
Worker.prototype.stop = function(){
    this.postMessage({
        'cmd':'stop'
    });
}
Worker.prototype.weight = function(weight){
    weight = (typeof(weight) === "undefined") ? '' : weight;
    this.postMessage({
        'cmd':'weight',
        'msg': weight
    });
}
Worker.prototype.wire = function(worker){
    this.postMessage({
        'cmd':'wire',
        'msg':worker
    });
}