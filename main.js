
var canvas= document.getElementById('game');
var context= canvas.getContext('2d');
var scoreshow=document.getElementById('score');
var start =document.getElementById('start');
var end = document.getElementById('gameover')
var luuten = document.getElementById('name')
var restart= document.getElementById('restart')
var btn_anh= document.getElementById('chon')
var btn_anh1=document.getElementById('chon1')
var anh= document.getElementById('chonanh')
var anh1= document.getElementById('chonanh1')
var danhsach= document.getElementById('ds')

var fly = new Audio();
var scor = new Audio();
fly.src = "sound/fly.mp3";
scor.src = "sound/score.mp3";

var birdimg= new Image();
var hinhnenchinh=new Image();
var ongtren= new Image();
var ongduoi=new Image();
hinhnenchinh.src="images/nenchinh.png";
ongtren.src="images/ongtren.png";
ongduoi.src="images/ongduoi.png";

var score=0;
var khoangcachhaiong=140; 
var khoangcachdenongduoi; // là khoảng cách từ đầu ống trên đến vị trí đầu ống dưới
var bird={
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
}
var ong=[]; //tạo mảng ống để chứa các ống di chuỷen
ong[0]={
    x:canvas.width,
    y:0 
}
function run(){
    // load hình ảnh vào
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(birdimg,bird.x,bird.y);

    for(var i=0;i<ong.length;i++){
        khoangcachdenongduoi=ongtren.height+khoangcachhaiong;
        context.drawImage(ongtren,ong[i].x,ong[i].y);
        context.drawImage(ongduoi,ong[i].x,ong[i].y+khoangcachdenongduoi);
        ong[i].x-=5; //để ống di chuyển
        

        // lập trình thêm ống khi ống di chuyển đến giữa
        // nó sẽ tạo thêm 1 ống nữa
        if(ong[i].x ==canvas.width/2){  
             ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height
                })
        }
        if(ong[i].x ==0 )ong.splice(0,1);
        // nếu ống đụng lề trái thì xóa nó đi để tránh mảng ống
      
        if(ong[i].x==bird.x){
          score++;
          
          scor.play(); }
         
          // game over  
        if(bird.y+birdimg.height==canvas.height||bird.y<0||
            bird.x+birdimg.width>= ong[i].x && bird.x <= ong[i].x +ongtren.width
            && (bird.y<=ong[i].y+ongtren.height||
            bird.y +birdimg.height>= ong[i].y+ khoangcachdenongduoi)    
            
        ){
            end.style.display= 'block';
            return;
        }                   
    }

    scoreshow.innerHTML="Score: " +score;
    // cho bird rơi xuống
    bird.y+=3;
    danhsach.innerHTML= 'anh yeu em'
    
    
 requestAnimationFrame(run);
  
}
document.addEventListener("keydown",function(e){
    if(e.keyCode==32){
    bird.y-=60;
    fly.play();   }
})

start.addEventListener('click',function(){
     run();
     start.style.display='none';

})
end.addEventListener('click',function(){
    end.style.display= 'none';
   var tên = prompt('Mời bạn nhập tên để lưu điểm')
    luuten.innerHTML =tên + '<br>' + score +  "điểm";
    luuten.style.display= 'block';
    restart.style.display= 'block';

})
restart.addEventListener('click',function(){
    restart.style.display= 'none'
    luuten.style.display= 'none';
    location.reload();

})
btn_anh.addEventListener('click',function(){
    birdimg.src = anh.getAttribute('src')

})
btn_anh1.addEventListener('click',function(){
    birdimg.src = anh1.getAttribute('src')

})


