     	var active_blocks = []; //массив индексов активных ячеек (закрашеных дивов)
        var timer,point=0;
        var chek=false;
        function begin(){
        for (var i = 0; i < 5; i++) {
            document.getElementsByClassName('start')[0].disabled =true;
            document.getElementsByClassName('pause')[0].disabled =true;
            document.getElementById('main').innerHTML+='<div class = "row" id="row'+i+'">';
            for (var j = 0; j < 6; j++) {
                        
                        document.getElementById('row'+i).innerHTML+='<div class = "coll-lg-3"><div class = "cell cell'+(i*6+j)+'"></div></div>';
            }
        }
    }
        begin();
        function newActiv(newActivBlock){
    active_blocks.push(newActivBlock);
    for (var i = 0; i < 31; i++)
    {
        if(newActivBlock==i)
            {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                $('.cell'+i).addClass("activ");
                $('.cell'+i).css({'background-color': 'rgb('+r+','+g+','+b+')'});
                break;}
            }
    }
function new_g(){
    document.getElementsByClassName('new_game')[0].disabled =true;
    document.getElementsByClassName('pause')[0].disabled =false;
            for (var i = 0; i < 31; i++){
                $('.cell'+i).removeClass("activ");
                $('.cell'+i).css({'background': 'black'});
        }
        for (var i = 0; i < 5; i++)
            active_blocks[i]=Math.floor(Math.random() * 31);
        for (var i = 0; i < 31; i++)
            for(var j=0; j<5; j++)       
                newActiv(active_blocks[j]);
    point=0;
    var startFrom = 60;
    document.getElementById('countdown').value=startFrom;
    timer = setInterval(function(){
        if(!chek){
        --startFrom;
        document.getElementById('countdown').value=startFrom;
        if(startFrom <= 0 ) {

            clearInterval(timer);
            $("#firstModal").modal('show');
            document.getElementsByClassName('new_game')[0].disabled =false;
            document.getElementsByClassName('start')[0].disabled =true;
            document.getElementsByClassName('pause')[0].disabled =true;
            timer=null; 
        }
    }
}
    
    ,1000);
}

function getIndex(str){
if(str[6]==undefined)
	return(Number(str[5]));
else
	return(Number(str[5]+str[6]));
}

function start(){
    document.getElementsByClassName('start')[0].disabled =true;
    document.getElementsByClassName('pause')[0].disabled =false;
    chek=false;
}

function pause(){
    document.getElementsByClassName('start')[0].disabled =false;
    document.getElementsByClassName('pause')[0].disabled =true;
    chek=true;
}

$('.start').click(start);
$('.pause').click(pause);
$('.new_game').click(new_g);

$( document ).on("click",".activ",function(){
	var id  = getIndex(this.id);
	if(timer){
	point++;
	document.getElementById('points').value=point;
    $(this).removeClass('activ');
    $(this).css("background", "black");
    var num= Math.floor(Math.random() * 2+1);
    if(active_blocks.lentgh==1){ num=2;}

			active_blocks.splice(active_blocks.indexOf(id),1);
            var newActivBlock=[];
            for (var i =0; i <num; i++) {
                newActivBlock[i] = Math.floor(Math.random() * 31);
               newActiv(newActivBlock[i]);
            }
}
})

$('#firstModal').on('hidden.bs.modal', function (event) { 
 var tbl=document.getElementsByTagName('table')[0]; 
var name= document.getElementById("txt").value;
  tbl.innerHTML += "<tr><td>"+name+"</td><td>"+point+"</td></tr>";
});
