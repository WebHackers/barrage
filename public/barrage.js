
$(document).ready(function(){
    $('head').prepend('<script src="http://localhost:8080/socket.io/socket.io.js"></script>');

    socket = io.connect("http://localhost:8080");

    socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });

    var barNumber = 0;
    var win_width = $(window).width();
    var win_height = $(window).height();

    socket.on('bar', function (data) {console.log(data);
        var top = parseInt(Math.random()*win_height*0.5);
        var id = 'id_'+(++barNumber);
        for(var i=0;i<data.length;i++) {
            //
        }
        var width = data.replace(/[^\x00-\xff]/gi, "--").length*35;
        var bar = '<div id="'+id+'" style="z-index:99;pointer-events:none;'+
                  'position:fixed;'+
                  'left:'+win_width+'px;'+
                  'top:'+top+'px;'+
                  'width:'+width+'px;'+
                  'font-size:40px;'+
                  'font-family:微软雅黑;'+
                  'font-weight:bold;'+
                  'text-fill-color:#fff;'+
                  '-webkit-text-fill-color:#fff;'+
                  'text-stroke:2px #000;'+
                  '-webkit-text-stroke:2px #000;">'+data+'</div>';
                  
        $('body').append(bar);
        $('#'+id).animate({
            left:0
        },
        5000,
        'linear',
        function() {
            //$(this).remove();
        });
    });
});
