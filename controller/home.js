
exports.list = function(req, res, socketInfo) {
	var info = socketInfo.room;
	for (var r in info) {
		var id = info[r].id;
		info[r].member = socketInfo.socket['r_'+id].member;
	}
	return info;
};