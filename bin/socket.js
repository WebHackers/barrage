
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
					socket_client['r_'+room.id].member++;
					console.log('room:'+room.id+' member:'+socket_client['r_'+room.id].member);
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
						socket_client['r_'+room.id].member++;
						console.log('room:'+room.id+' member:'+member);
					}
					else {
						socket_client['r_'+room.id] = {member:1};
						socket_client['r_'+room.id][client.id] = client;
						console.log('room:'+room.id+' member:'+socket_client['r_'+room.id].member);
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
					id = data;
					socket_client['r_'+id][client.id] = client;
					socket_client['r_'+id].member++;
					console.log('user:'+client.id+' enter room '+id);
					console.log('room:'+id+' member:'+socket_client['r_'+id].member);
				}
				else {
					client.emit('msg', '房间不存在额~~ ╮（╯_╰）╭');
					console.log('房间不存在额~~ ╮（╯_╰）╭');
				}
			});

			//console.log(process.memoryUsage());
			console.log('connect:'+client.id);
			
			client.on('disconnect', function () {
				if(socket_client['r_'+id]) {
					delete socket_client['r_'+id][client.id];
					socket_client['r_'+id].member--;
					console.log('room:'+id+' member:'+socket_client['r_'+id].member);
					if(socket_client['r_'+id].member==0) {
						delete socket_client['r_'+id];
						for(var r in room_list) {
							if(room_list[r].id==id) {
								delete room_list[r];
								console.log('delete room '+id);
							}
						}
					}
				}
				console.log('disconnect:'+client.id);
			});
			
			client.on('bar', function (data) {
				data = protect(data);
				if(socket_client['r_'+id]) {
					for(var c in socket_client['r_'+id]) {
						if(socket_client['r_'+id][c]&&c!='member') {
							socket_client['r_'+id][c].emit('bar', data);
						}
					}
				}
				console.log(data);
			});
		});
};
