$(document).ready(function(){
    var number = 0;
    var win_width = $(window).width();
    var win_height = $(window).height();
    $('#screen').height(parseInt(win_height*0.35));
    $('.list').height(parseInt(win_height*0.65)-68);
    var width = $('#screen').width();
    var height = $('#screen').height();
    var roomId = window.location.href.split('/room/', 2)[1].split('/', 2)[0];

	socket = io.connect("http://"+window.location.host);

	socket.on('connect', function () {
        socket.emit('enter', roomId);
        console.log('connect');
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });

    socket.on('flash', function (data) {
        $('#member').html('当前:'+data+'人');
        console.log(data);
    });

    socket.on('msg', function (data) {
        console.log(data);
    });

    socket.on('bar', function (data) {
        $(".list").prepend('<li class="item" style="">'+data+"</li>");

        var top = parseInt(Math.random()*height*0.9);
        var id = 'id_'+(++number);
        
        var bar = '<nobr id="'+id+'" style="z-index:1;pointer-events:none;'+
                  'position:fixed;'+
                  'left:'+width+'px;'+
                  'top:'+top+'px;'+
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
