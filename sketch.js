// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]


//let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [[1,-3], [5,-4], [4,-3],[9,1],[7,2],[8,5],[5,4],[5,5],[3,4],[4,9],[2,7],[0, 10],[-2, 7], [-4, 8],[-3,3],[-5,6],[-5,4],[-8,5],[-7,2],[-9,1],[-4,-3],[-5,-4],[0,-3],[2,-7],[2,-6],[1,-3]]; //list資料

var fill_colors = "d8e2dc-ffe5d9-ffcad4-f4acb7-9d8189".split("-").map(a=>"#"+a)

var line_colors = "ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a".split("-").map(a=>"#"+a)

//畫points所有"點"的物件定義
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[]//把產生的"所有"的物件，為物建倉庫，所有的物件資料都在此

//設定飛彈物件的變數
var bullet
var bullets =[]//把產生的"所有"的物件，為物建倉庫，所有的物件資料都在此

//設定怪物物件的變數
var monster
var monsters =[]//把產生的"所有"的物件，為物建倉庫，所有的物件資料都在此
//設定砲台位置
var shipP

//設定分數
var score = 0


function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2) //預設砲台位置為(width/2,height/2)
  for(var i=0;i<20;i=i+1){//i=0,1,2,3,4....9
    ball = new Obj({})//產生一個Obj class元件
    balls.push(ball) //把ball物件放入到balls陣列內

  }
  createCanvas(windowWidth, windowHeight);
  for(var i=0;i<10;i=i+1){//i=0,1,2,3,4....9
    monster = new Monster({})//產生一個Obj class元件
    monsters.push(monster) //把ball物件放入到balls陣列內
  }
}
function draw() {
  background("#fee9e1");
  // for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  //}
 //上下左右建
  if(keyIsPressed){

    if(key=="ArrowLeft" || key=="a"){ //按下左鍵
      shipP.x = shipP.x - 5
    }
    if(key=="ArrowRight"|| key=="d"){ //按下右鍵
      shipP.x = shipP.x + 5
  }
    if(key=="ArrowUp"|| key=="w"){ //按下往上鍵
      shipP.y = shipP.y - 5
  }
    if(key=="ArrowDown"|| key=="s"){ //按下往下鍵
      shipP.y = shipP.y + 5
  }





  }
  //大象的顯示
  for(let ball of balls)//只要是陣列的方式，都可以利用在此方式處理
  {
    ball.draw()
    ball.update()
      //在物件上按下滑鼠，物件消失不見，分數+1分
      for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有無接觸現在的ball
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score-1
        
      }
    }
   }

  //飛彈的顯示
  for(let bullet of bullets)//只要是陣列的方式，都可以利用在此方式處理
  {
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示
  for(let monster of monsters)//只要是陣列的方式，都可以利用在此方式處理
  {
    if(monster.dead == true && monster.timenum>40){
      monsters.splice(monsters.indexOf(monster),1)//從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取1個
    }
    monster.draw()
    monster.update()
      //在物件上按下滑鼠，物件消失不見，分數+1分
      for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有無接觸現在的ball
        // monsters.splice(monsters.indexOf(monster),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score+1
        monster.dead = true //代表該怪物死亡
      }
    }
  }

  textSize(60)
  text(score,50,50) //在座標為(50，50)上，顯示score分數內容
  push() //重新規劃畫原點(0,0)，在視窗中心
  let dx = mouseX - width/2
  let dy = mouseY - height/2
  let angle = atan2(dy,dx)
  //translate(width/2,height/2)
  translate(shipP.x,shipP.y)
  fill("#ec7d10")
  noStroke()
  rotate(angle)
  triangle(-25,25,-25,-25,50,0)// 設定三個點，畫成一個三角形
  pop()//恢復原本設定，原點(0,0)在視窗左上角
}
//滑鼠按下產生新物件
function mousePressed(){
  //滑鼠按下產生新物件
  // ball = new Obj({
  //   p:{x:mouseX,y:mouseY}
  // })//在滑鼠按下的地方，產生一個Obj class元件
  // balls.push(ball) //把ball物件放入到balls陣列內(丟到倉庫)

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //在物件上按下滑鼠，物件消失不見，分數+1分
  // for(let ball of balls){
  //   if(ball.isBallInRanger(mouseX,mouseY)){
  //     balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取1個
  //     score = score+1
  //   }
  // }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++
  //按一下產生一個飛彈
  bullet = new Bullet({})//在滑鼠按下的地方，產生一個ullet class元件(產生一個飛彈)
  bullets.push(bullet) //把bullet物件放入到bullets陣列內(丟到倉庫)
  // bullet_sound.play()
}
//按下空白建
function keyPressed(){     
  if(key==" "){ //按下空白建，發射飛彈，其實跟按下滑鼠功能一樣
    bullet = new Bullet({})//在按下空白建的地方，產生一個ullet class元件(產生一個飛彈)
    bullets.push(bullet) //把bullet物件放入到bullets陣列內(丟到倉庫)
    bullet_sound.play()

  }
  // //上下左右建
  // if(key=="ArrowLeft"){ //按下左鍵
  //   shipP.x = shipP.x - 5
  // }
  // if(key=="ArrowRight"){ //按下右鍵
  //   shipP.x = shipP.x + 5
  // }
  // if(key=="ArrowUp"){ //按下往上鍵
  //   shipP.y = shipP.y - 5
  // }
  // if(key=="ArrowDown"){ //按下往下鍵
  //   shipP.y = shipP.y + 5
  // }

}   
