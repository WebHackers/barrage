
$(document).ready(function(){
    $.getScript('http://'+window.location.host+'/socket.io/socket.io.js',function(data, status, jqxhr) {

        socket = io.connect("http://"+window.location.host);

        socket.on('connect', function () {
            socket.emit('open',{
                title: $(document).attr("title"),
                url: window.location.href
            });
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
            var top = parseInt(Math.random()*win_height*0.5);
            var id = 'id_'+(++number)+'_'+random;
            
            var bar = '<nobr id="'+id+'" style="z-index:99;pointer-events:none;'+
                      'position:fixed;'+
                      'left:'+win_width+'px;'+
                      'top:'+top+'px;'+
                      'font-size:40px;'+
                      'font-weight:bold;'+
                      '-moz-text-fill-color:#fff;'+
                      '-webkit-text-fill-color:#fff;'+
                      '-moz-text-stroke:2px #000;'+
                      '-webkit-text-stroke:2px #000;">'+data+'</nobr>';
                      
            $('body').append(bar);
            bar = $('#'+id);
            var speed = parseInt(10000-bar.width()*10);
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
    });
});
