
var func = require('./func.js');

module.exports = function(server, room, socket, roomId) {
		var io = require('socket.io');
		var io = io.listen(server);

		io.sockets.on('connection', function (client) {
			var id;
			var isSet = false;
			client.on('open', function (data) {
				if(isSet) {
					return;
				}
				if(room[data.url]) {
					id = room[data.url].id;
					socket[id][client.id] = client;
					socket[id].member++;
					func.flash(id, socket);
					console.log(id+' member:'+socket[id].member);
				}
				else
				{
					room[data.url] = {};
					room[data.url].title = data.title;
					room[data.url].id = 'r_'+(++roomId);
					id = room[data.url].id;

					if(socket[id]) {
						socket[id][client.id] = client;
						socket[id].member++;
						console.log(id+' member:'+socket[id].member);
					}
					else {
						socket[id] = {member: 1};
						socket[id][client.id] = client;
						console.log(id+' member:'+socket[id].member);
					}
				}
				console.log(room[data.url]);
				isSet = true;
			});

			client.on('enter', function (data) {
				if(isSet) {
					return;
				}
				if(!(/^r_[1-9]{1,1}[0-9]{2,}/.test(data))) {
					client.emit('msg', 'false');
					console.log('Wrong enter');
					return;
				}

				if(socket[data]) {
					id = data;
					socket[id][client.id] = client;
					socket[id].member++;
					func.flash(id, socket);
					console.log('user:'+client.id+' enter room '+id);
					console.log(id+' member:'+socket[id].member);
					isSet = true;
				}
				else {
					client.emit('msg', 'false');
					console.log('Wrong enter');
				}
			});

			//console.log(process.memoryUsage());
			console.log('connect:'+client.id);
			
			client.on('disconnect', function () {
				if(socket[id]) {
					delete socket[id][client.id];
					socket[id].member--;
					func.flash(id, socket);
					console.log(id+' member:'+socket[id].member);
					if(socket[id].member==0) {
						delete socket[id];
						for(var r in room) {
							if(room[r].id==id) {
								delete room[r];
								console.log('delete '+id);
							}
						}
					}
				}
				console.log('disconnect:'+client.id);
			});
			
			client.on('bar', function (data) {
				data = func.protect(data);
				if(socket[id]) {
					for(var c in socket[id]) {
						if(socket[id][c]&&c!='member') {
							socket[id][c].emit('bar', data);
						}
					}
				}
				console.log(data);
			});
		});
};
