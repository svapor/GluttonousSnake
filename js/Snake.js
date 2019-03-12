(function() {
    window.Snake = function () {
        this.body = [
            {"row":4,"col":7},
            {"row":4,"col":6},
            {"row":4,"col":5},
            {"row":4,"col":4},
            {"row":4,"col":3},
        ];
        this.willDirection = "R";
    }

    //渲染蛇的身体方法
    Snake.prototype.render = function () {
        //蛇头颜色
        game.setColor(this.body[0].row,this.body[0].col,"salmon");
        //蛇身
        for(var i = 1;i<this.body.length;i++){
            game.setColor(this.body[i].row,this.body[i].col,"skyblue");
        }
    }

    //更新(移动,撞墙,吃到食物..)
    Snake.prototype.update = function () {
        //根据方向，头插、
        
        //因update在定时器里面执行，通过willDirection在这里赋值可以解决瞬间撞自己的问题
        this.direction = this.willDirection;
        switch (this.direction) {
            case "R":
            
            //toucha 变量 在判定吃食物时候用得上
            var toucha = {"row":this.body[0].row,"col":this.body[0].col+1};
            this.body.unshift(toucha);     
            break;
            case "L":
            var toucha = {"row":this.body[0].row,"col":this.body[0].col-1};     
            this.body.unshift(toucha); 
            break;
            case "U":
            var toucha = {"row":this.body[0].row-1,"col":this.body[0].col};
            this.body.unshift(toucha);     
            break;
            case "D":
            var toucha = {"row":this.body[0].row+1,"col":this.body[0].col};
            this.body.unshift(toucha);     
            break;
            default:
            break;
        }
        //吃到食物不尾删，创建并新食物实例
        if (toucha.row === game.food.row && toucha.col === game.food.col) {
            //
            game.food = new Food(game);
        } else {
            //没有吃到食物就尾删
            this.body.pop();
        }
        //判定撞墙
        if (toucha.row<0 || toucha.col<0||toucha.row>game.rowsAmount -1 || toucha.col > game.colsAmount - 1) {
            alert("你撞墙了，长度为："+this.body.length);

            
            //此时后面的定时器后面的渲染还会执行，而toucha已经超出表格，必须去掉，否则会报错
            this.body.shift();//继续头插不合法

            clearInterval(game.timer);
        }
        //撞自己
        //i取值应为1到4，0是本身，4是能撞到的最小的那个
        for(var i=1;i<this.body.length;i++){
            if (toucha.row === this.body[i].row && toucha.col === this.body[i].col) {
                alert("你撞到自己了，长度为:"+this.body.length);

                this.body.shift();//继续头插不合理
                clearInterval(game.timer);
            }
        }



    }


    //改变方向的方法，供键盘事件调用
    Snake.prototype.changeDirection = function (str) {
        this.willDirection = str;
    }

})();