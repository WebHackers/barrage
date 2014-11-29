$(document).ready(function(){

	socket = io.connect("http://"+window.location.host);

	socket.on('connect', function () {
        var path = window.location.href.split('?', 2)[1].
            split('&', 1)[0].
            split('=', 2)[1];

        socket.emit('enter', path);
        console.log('connect');
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });

    socket.on('msg', function (data) {
        console.log(data);
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
