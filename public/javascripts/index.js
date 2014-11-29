$(document).ready(function(){

	socket = io.connect("http://"+window.location.host);

	socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });

    socket.on('bar', function (data) {
        $("#biu").after('<p style="margin:10px;">'+data+"</p>");
    });

	$('#biu').click(function() {
		var barrage = $('#barrage').val();

        if(barrage == '')return;
        if(barrage.length>256) {
            $("#biu").after('<p style="margin:10px;">（╯‵□′）╯︵┴─┴</p>');
            $('#barrage').val('');
            return;
        }

		socket.emit('bar',barrage);
		$('#barrage').val('');
	});

});
