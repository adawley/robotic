var i=0;
var name = '';
var weight = 0;

self.addEventListener('message', function(e) {
  var data = e.data;
	switch (data.cmd) {
		case 'name':
			if(data.msg == ''){
				self.postMessage('NAMED: ' + name);				
			} else {
				name = data.msg;
			}			
			break;
		case 'start':
			self.postMessage('WORKER STARTED: ' + data.msg);
			break;
		case 'stop':
			self.postMessage('Worker: ' + name + ' over out.');
			self.close(); // Terminates the worker.
			break;
		case 'timedCount':
			i=i+1;
			postMessage(i);
			setTimeout("timedCount()",2000);
			break;
		case 'weight':
			if(data.msg == ''){				
				self.postMessage('Worker ' + name + ' weight: ' + weight);
			} else {
				weight = data.msg;
			}
			break;
		default:
			self.postMessage('Unknown command: ' + data.msg);
	}
}, false);
