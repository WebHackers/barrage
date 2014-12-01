$(document).ready(function(){
    var number = 0;
    var win_width = $(window).width();
    var win_height = $(window).height();
    $('#screen').height(parseInt(win_height*0.4));
    $('.list').height(parseInt(win_height*0.6)-44);
    var width = $('#screen').width();
    var height = $('#screen').height();

	socket = io.connect("http://"+window.location.host);

	socket.on('connect', function () {
        var path = window.location.href.split('/room/', 2)[1];

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
        $(".list").prepend('<p style="margin:10px;">'+data+"</p>");

        var top = parseInt(Math.random()*height*0.9);
        var id = 'id_'+(++number);
        
        var bar = '<nobr id="'+id+'" style="z-index:1;pointer-events:none;'+
                  'position:fixed;'+
                  'left:'+width+'px;'+
                  'top:'+top+'px;'+
                  'color:#fff;'+
                  'font-size:14px;'+
                  'font-weight:bold;'+
                  '">'+data+'</nobr>';
                  
        $('#screen').append(bar);
        bar = $('#'+id);
        var speed = parseInt(10000-bar.width()*30);
        if(speed<2000)speed = 2000;

        bar.animate({
            left:-bar.width()
        },
        speed,
        'linear',
        function() {
            $(this).remove();
        });
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
