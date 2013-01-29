var i=0;
var name = '';
var weight = 0;
var wires = new Array();
var started = false;

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
        case 'signal':
            wires.map(function(w){
                w.name();
            });
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
            // add node to wires array
            wires.push(data.msg);
            self.postMessage({
                'cmd': 'wired',
                'msg': data.msg.NAME
            });
            break;
        default:
            self.postMessage('Unknown command: ' + data.msg);
    }
}, false);

function timedCount(){
    i=i+1;
    self.postMessage(i);
    if(started){
        setTimeout('timedCount()', weight*100);
    }
}
