//claa:類別，例子
//設定位置
class Obj{ //宣告一個類別，針對一個畫的圖案
  constructor(args){ //預設值，基本資料(物件顏色，移動速度，大小，初始顯示位置...)
    //this.p = args.p || {x:random(width),  y:random(height)}//描述該物件的初始位置，||(or)，當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有傳參數，就以||(or)後面設定產出
    this.p = args.p || createVector(random(width),random(height))//把原本的{x:...,y:...}改成"向量"方式呈現
    // this.v = {x:random(-1,1),  y:random(-1,1)}//設定一個物件的移動速度
    this.v = createVector(random(-1,1),random(-1,1))//把原本的{x:...,y:...}改成"向量"方式呈現
    this.size = random(5,15)//一個物件的放大倍率
    this.color = random(fill_colors) //物件充滿顏色
    this.stroke = random(line_colors)//物件外框顏色

  }

  //畫圖
 draw(){ //劃出單一個物件形狀
   push() //執行push指令後，依照我的設定，設定原點(0,0)的位置
     translate(this.p.x,this.p.y) //以該物件位置為原點
     scale(this.v.x<0?1:-1,-1)//物件方向改變
     fill(this.color)
     stroke(this.stroke)
     strokeWeight(5) //線條粗細
     beginShape()
     for(var k=0; k < points.length;k=k+1){
       //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
       //vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一個點，當指令到endShape()，會把所有點串接在一起   
       curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫線為圓弧方式畫圖
     }
     endShape(CLOSE)
   pop() //執行pop()，原點(0,0)的設定回到整個視窗左上角
 }
 //物件碰到螢幕邊框會往內彈
 update(){//移動的程式碼
   // this.p.x = this.p.x +this.v.x //x目前位置(this.p.x)加上x軸的移動速度(this.v.x)
   // this.p.y = this.p.y +this.v.y //y目前位置(this.p.y)加上y軸的移動速度(this.v.y)
   this.p.add(this.v) //設定好"向量"，使用add，就可以與上面兩行指令一樣的效果
   //向量sub==>減號

   //知道滑鼠位置，並建立一個滑鼠向量
  //  let mouseV = createVector(mouseX,mouseY)//把滑鼠的位置轉換成一個向量
  //  let delta = mouseV.sub(this.p).limit(this.v.mag()*2) //sub計算出滑鼠所在位置的向量(mouseV)到物件向量(this.p)的距離，limit (3)移動距離
  //  //this.v.mag()該物件的速度大小(一個向量值有大小和方向)
  //  this.p.add(delta)

   if(this.p.x<=0 || this.p.x>width){ //x軸碰到左邊(<=0)，，或是碰到右邊(>width)
      this.v.x = -this.v.x //把x方向速度改變
   }
   if(this.p.y<=0 || this.p.y>height){ //y軸碰到上邊(<=0)，，或是碰到下邊(>height)
      this.v.y = -this.v.y //把y方向速度改變
   }
 }
 //判斷物件是否被觸碰(按到)
 isBallInRanger(x,y){ //功能:判斷飛彈的位子是否在物件的範圍內
  let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下物件為中心點)之間的距離，放到d變數內
  if(d<4*this.size) {//d<計算物件大小
    return true //滑鼠與物件的距離小於物件的寬度，代表觸碰了，則傳回true的值(觸碰)
    }else{
      return false //滑鼠與物件的距離小於物件的寬度，代表沒觸碰了，則傳回false的值(誤觸碰)
    }
}
}
