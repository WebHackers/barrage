$(document).ready(function(){
    var number = 0;
    var win_width = $(window).width();
    var win_height = $(window).height();
    $('#screen').height(parseInt(win_height*0.35));
    $('#list').height(parseInt(win_height*0.65)-66);
    $('#color-board').css('top', parseInt(win_height*0.35)+24-45);
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
        $("#list").prepend('<li class="item" style="">'+data.barrage+"</li>");

        var top = parseInt((height-15)*(data.top/100));
        var id = 'id_'+(++number);
        
        var bar = '<nobr id="'+id+'" style="z-index:1;pointer-events:none;'+
                  'position:fixed;'+
                  'left:'+width+'px;'+
                  'top:'+top+'px;'+
                  'color:'+data.color+';'+
                  'font-size:14px;'+
                  'font-weight:bold;'+
                  '">'+data.barrage+'</nobr>';
                  
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
        var top = parseInt(Math.random()*100);
        var color = $('#color-select').css('background-color');
		socket.emit('bar',{top:top,color:color,barrage:barrage});
		$('#barrage').val('');
	});

    //$('#color-board').css('display', 'none');
    var show = false;
    $('#color-select').click(function() {
        if(show) {
            $('#color-board').css('display', 'none');
            show = false;
        }
        else {
            $('#color-board').css('display', '');
            show = true;
        }
    });

    $('div[id^="color-item"]').click(function() {
        $('#color-board').css('display', 'none');
        show = false;
        $('#color-select').css('background-color',$(this).css('background-color'));
    });

});
