var monster_colors = "edf2fb-e2eafc-d7e3fc-ccdbfd-c1d3fe-b6ccfe-abc4ff".split("-").map(a=>"#"+a)

class Monster{ //宣告一個怪物類別，名稱Monster
    constructor(args){ //預設值，基本資料(物件顏色，移動速度，大小，初始顯示位置...)
        this.r = args.r || random(50,100) //(大小差異)設定的怪固的主體， 就傳參數args.r來設定怪物大小，沒傳參數，就已100為主
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的數度，如果沒船args參數，就會利用亂數(-1，1)，抽參數
        this.color = args.color || random(monster_colors) //物件充滿顏色
        this.mode = random(["happy","bad"])
        this.dead = false
        this.timenum = 0 //延長時間讓它顯示死亡畫面

    }

    draw(){ //劃出元件
        if(this.dead == false ){

            push() //重新設定圓點位置
                translate(this.p.x,this.p.y) //把原點座標(0，0)座標移到物件中心位置
                fill(this.color)
                noStroke()
                ellipse(0,0,this.r)

                if(this.mode=="happy"){
                    fill(255)
                    ellipse(0,0,this.r/2)
                    fill(0)
                    ellipse(0,0,this.r/3)
                }else{
                    fill(255)
                    arc(0,0,this.r/2,this.r/1,0,PI)
                    fill(0)
                    arc(0,0,this.r/3,this.r/2,0,PI)
                }
                stroke(this.color)
                strokeWeight(4)
                noFill()
                //line(this.r/2,0,this.r,0)
                for(var j=0;j<8;j++){
                    rotate(PI/4)
                    beginShape()
                        for(var i=0;i<(this.r/2);i++){
                            vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                        }

                    endShape()
                }
            pop() //恢復到整個視窗的左上角
        }
        else{ //怪物死亡的畫面
            this.timenum=this.timenum+1
            push()
                translate(this.p.x,this.p.y) //把原點座標(0，0)座標移到物件中心位置
                fill(this.color)
                noStroke()
                ellipse(0,0,this.r)
                stroke(255)
                line(-this.r/2,0,this.r/2,0)
                stroke(this.color)
                strokeWeight(4)
                noFill()

                for(var i=0;i<(this.r/2);i++){
                    rotate(PI/4)
                    line(this.r/2,0,this.r,0)
                }
                //vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
            pop()

    }
}
    update(){ //計算出移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>width){ //x軸碰到左邊(<=0)，，或是碰到右邊(>width)
            this.v.x = -this.v.x //把x方向速度改變
         }
         if(this.p.y<=0 || this.p.y>height){ //y軸碰到上邊(<=0)，，或是碰到下邊(>height)
            this.v.y = -this.v.y //把y方向速度改變
         }
       }

       isBallInRanger(x,y){ //功能:判斷飛彈的位子是否在物件的範圍內
        let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下物件為中心點)之間的距離，放到d變數內
        if(d<this.r/2) {//d<計算物件大小
          return true //飛彈(x,y)與物件的距離(x,y,this.p.x,this.p.y)小於物件的半徑，代表觸碰了，則傳回true的值(觸碰)
          }else{
            return false //飛彈(x,y)與物件的距離(x,y,this.p.x,this.p.y)小於物件的半徑，代表沒觸碰了，則傳回false的值(誤觸碰)
          }
      }

}