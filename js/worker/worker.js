var i=0;
var name = '';
var weight = 0;
var wires = new Array();
var started = false;
var xmlhttp = new XMLHttpRequest();

self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'kill':
            self.postMessage({
                'cmd':'dead',
                'msg':name
            });
            self.close();
        case 'name':
            if(data.msg == ''){
                self.postMessage(name);
            } else {
                name = data.msg;
            }			
            break;
        case 'start':
            if(!started){
                started = true;
                timedCount();                
            }
            break;
        case 'stop':
            started = false;
            break;
        case 'weight':
            if(data.msg == ''){				
                self.postMessage('Worker ' + name + ' weight: ' + weight);
            } else {
                weight = data.msg;
            }
            break;
        case 'wire':
            wires.push(data.msg);
            self.postMessage(wires);
            break;
        default:
            self.postMessage('Unknown command: ' + data.msg);
    }
}, false);

function timedCount(){
    i=i+1;
    
    ajax("http://www.google.com/finance/info?infotype=infoquoteall&q=GOOG&callback=?",function(data){
        self.postMessage(i+' - '+data);
        if(started){
            setTimeout("timedCount()",10000);
        }
    });   
    
    
}


function ajax(url, callback){
    
    xmlhttp.onreadystatechange=function()
    {
        postMessage(xmlhttp.readyState+':'+xmlhttp.status);
        if (xmlhttp.readyState==4)
        {
            postMessage('ajax4');
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    
}
