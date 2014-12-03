
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
            var top = parseInt((win_height-50)*(data.top/100));
            var id = 'id_'+(++number)+'_'+random;
            
            var bar = '<nobr id="'+id+'" style="z-index:99;pointer-events:none;'+
                      'position:fixed;'+
                      'left:'+win_width+'px;'+
                      'top:'+top+'px;'+
                      'color:'+data.color+';'+
                      'font-size:40px;'+
                      'font-weight:bold;'+
                      '">'+data.barrage+'</nobr>';
                      
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
