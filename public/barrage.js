
$(document).ready(function(){
    $('head').prepend('<script src="http://localhost:8080/socket.io/socket.io.js"></script>');

    socket = io.connect("http://localhost:8080");

    socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });

    var number = 0;
    var win_width = $(window).width();
    var win_height = $(window).height();
    var random = parseInt(Math.random()*1000);

    socket.on('bar', function (data) {
        var span = '<span id="Barrage_get_width" style="position:fixed;left:0;top:-100px;font-size:40px;font-weight:bold;">'+data+'</span>';
        $('body').append(span);
        var width = $('#Barrage_get_width').width();
        $('#Barrage_get_width').remove();
        var top = parseInt(Math.random()*win_height*0.5);
        var id = 'id_'+(++number)+'_'+random;
        var speed = win_width/width*1000;
        
        var bar = '<span id="'+id+'" style="z-index:99;pointer-events:none;'+
                  'position:fixed;'+
                  'left:'+win_width+'px;'+
                  'top:'+top+'px;'+
                  'width:'+width+'px;'+
                  'font-size:40px;'+
                  'font-weight:bold;'+
                  '-moz-text-fill-color:#fff;'+
                  '-webkit-text-fill-color:#fff;'+
                  '-moz-text-stroke:2px #000;'+
                  '-webkit-text-stroke:2px #000;">'+data+'</span>';
                  
        $('body').append(bar);
        $('#'+id).animate({
            left:-width
        },
        speed,
        'linear',
        function() {
            $(this).remove();
        });
    });
});
