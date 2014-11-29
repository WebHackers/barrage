
var protect = require('./protect.js');

module.exports = function(server, room_list, socket_client, roomId) {
		var io = require('socket.io');
		var io = io.listen(server);

		io.sockets.on('connection', function (client) {
			var id;
			client.on('open', function (data) {
				if(room_list[data.url]) {
					var room = room_list[data.url];
					socket_client['r_'+room.id][client.id] = client;
					id = room.id;
				}
				else
				{
					var room = {
						title: data.title,
						id: ++roomId
					};
					room_list[data.url] = room;

					if(socket_client['r_'+room.id]) {
						socket_client['r_'+room.id][client.id] = client;
					}
					else {
						socket_client['r_'+room.id] = {};
						socket_client['r_'+room.id][client.id] = client;
					}
					
					id = room.id;
				}
				console.log(room_list[data.url]);
			});

			client.on('enter', function (data) {
				if(isNaN(data)||data<=100||parseInt(data)!=data) {
					client.emit('msg', '房间不存在额~~ ╮（╯_╰）╭');
					console.log('房间不存在额~~ ╮（╯_╰）╭');
					return;
				}

				if(socket_client['r_'+data]) {
					socket_client['r_'+data][client.id] = client;
					id = data;
					console.log('user:'+client.id+' enter room '+data);
				}
				else {
					client.emit('msg', '房间不存在额~~ ╮（╯_╰）╭');
					console.log('房间不存在额~~ ╮（╯_╰）╭');
				}
			});

			//console.log(process.memoryUsage());
			console.log('connect:'+client.id);
			
			client.on('disconnect', function () {
				console.log('disconnect:'+client.id);
			});
			
			client.on('bar', function (data) {
				data = protect(data);
				for(var c in socket_client['r_'+id]) {
					socket_client['r_'+id][c].emit('bar', data);
				}

				console.log(data);
			});
		});
};
