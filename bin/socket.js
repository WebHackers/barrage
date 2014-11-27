
module.exports = function(server, socket_client, num_client){
		var io = require('socket.io');
		var io = io.listen(server);

		io.sockets.on('connection', function (client){
			num_client++;
			//console.log(process.memoryUsage());
			socket_client[client.id] = client;
			console.log('connect:'+client.id);
			
			client.on('disconnect', function (){
				console.log('disconnect:'+client.id);
			});
			
			client.on('bar', function (data){
				for(var c in socket_client) {
					socket_client[c].emit('bar', data);
				}

				console.log(data);
			});
		});
};
