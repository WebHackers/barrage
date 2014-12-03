
exports.list = function(req, res, socketInfo) {
	var info = socketInfo.room;
	for (var r in info) {
		var id = info[r].id;
		info[r].member = socketInfo.socket[id].member;
	}
	return info;
};