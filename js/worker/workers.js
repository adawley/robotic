/*
* A wrapper to handle multiple workers
*/
function workers(){
                    
}           
                
/*
* Sets count
* returns count
*/
workers.count = function(){
    var l = workers.cata.length;
    document.getElementById("worker_count").innerHTML = l;
    return l;
}
                
/*
* The catalog of workers
*/
workers.cata = new Array();
                
/*
* Add a worker
* returns the new worker.
*/
workers.add = function(){
    var w=new Worker("worker.js");
                    
    var name = new Date().getTime();
    var weight=Math.floor(Math.random()*11)+1;
    w.init(name, weight);
                   
    // add it to the stack
    workers.cata.push(w);
                    
    // trigger a count update
    workers.count();
    
    // create a worker window and append it to the workers div
    var div = "<div class='workerWindow' id='"+name+"'>\n"
        + "<div class='workerName'>"+name+"</div>\n"
        + "<div class='workerMsg'></div>\n"
        + "</div>\n";    
    $(div).appendTo('div#workers');
    
    // return the newly created worker?  
    return w;
}
                
/*
* Gets the names of the current workers.
*/
workers.names = function(){
    workers.cata.map(function(w){
        w.name();
    });
}
                
/*
* Stops then removes the specified worker. If no worker is 
* passed then the last worker is removed.
*/
workers.remove = function(worker){
    // if no worker is passed pop off the last worker
    if(typeof(worker) === "undefined"){
        worker = workers.cata.pop();
    }else {
        workers.cata.splice(workers.cata.indexOf(worker),1);
    }
                    
    worker.kill();
    workers.count();
}
                
/*
* Starts the worker.
*/
workers.start = function(){
    workers.cata.map(function(w){
        w.start(); 
    });
}
                
/*
* Stops the worker.
*/
workers.stop = function(){
    workers.cata.map(function(w){
        w.stop(); 
    });
}
                
/*
* Gets the weights of the current workers.
*/
workers.weights = function(){
    workers.cata.map(function(w){
        w.weight();
    });
}