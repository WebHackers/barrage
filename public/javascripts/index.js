
$(document).ready(function(){
	
	if(document.documentElement.getBoundingClientRect) {
		var top1 = document.getElementById('footer').getBoundingClientRect().top;
		var top2 = document.getElementById('head').getBoundingClientRect().top;
		$('.list').height(top1-top2-44);
	}
	else {
		$('.list').height($(window).height()-88);
	}

	function addItem(info) {
		var item = 
			'<a class="item" href="./room/'+info.id+'/'+info.title+'">'+
	        '<h2>'+info.title+'</h2>'+
	        '<p style="float:left;">弹幕小队:'+info.id+'</p>'+
	        '<p style="float:right;">人数:'+info.member+'</p>'+
	      	'</a>';
		$('.list').prepend(item);
	}

	$.get(
		'./list',
		function(data) {
			for (var r in data) {
				addItem(data[r]);
			}
		}
	);
});