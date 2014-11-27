$(document).ready(function(){

	socket = io.connect("http://"+window.location.host);

	socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });

    socket.on('bar', function (data) {
        $("#biu").after('<p class="note">'+data+"</p>");
    });

	$('#biu').click(function() {
		var barrage = $('#barrage').val();
		socket.emit('bar',barrage);
		$('#barrage').val('');
	});

});
