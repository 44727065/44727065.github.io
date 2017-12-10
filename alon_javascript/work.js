self.onmessage = function(event) {
  var method = event.data.method;
  var args = event.data.args;

  var reply = doSomething(args);
  console.log(reply);
  self.postMessage({method: method, reply: reply});
};

function doSomething(o){
	o + '';
}