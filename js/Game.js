//因为一个项目有很多类，为了变量不相互干扰，利用闭包包裹隔离，而类则通过 window 暴露
(function() {
    window.Game = function(){

        //行和列
        this.rowsAmount = 20;
        this.colsAmount = 20;
        this.init();

        //实例化蛇类
        this.snake = new Snake();

        //实例化食物

        this.food = new Food(this);
        //开启定时器，渲染蛇类
        this.start();

        //监听事件
        this.bindEvent();
    }

    Game.prototype.init = function () {
        this.dom = document.createElement("table");
        for(var i = 0;i<this.rowsAmount;i++){
            var tr = document.createElement("tr");
            //行上树
            this.dom.appendChild(tr);
            for(var j = 0;j<this.colsAmount;j++){
                var td = document.createElement("td");
                //列上树
                tr.appendChild(td);
            }
        }

        document.querySelector(".wrap").appendChild(this.dom);
    }


    //封装对表格设置颜色的方法,用于设置蛇身颜色
    Game.prototype.setColor = function (row,col,color) {
        this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.backgroundColor = color;
    }

    //清屏
    Game.prototype.clear = function () {
        for(var i = 0;i<this.rowsAmount;i++){
            
            for(var j = 0;j<this.rowsAmount;j++){
                document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = "#fff";
                document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = "";
            }    
        }
    }

    Game.prototype.start = function () {
        var self = this;
        this.f = 0;
        var s;//通过s使蛇越来越快
        this.timer = setInterval(function(){
            self.f++;
            document.querySelector(".info").innerHTML = "帧编号："+ self.f;
            //清屏
            self.clear();

            s = (self.snake.body.length < 25) ? 30 - self.snake.body.length : 5;

            //隔30帧更新蛇
            self.f % s ===0 && self.snake.update();
            //渲染蛇
            self.snake.render();
            self.food.render();

        }, 20)
    }


    //监听事件
    Game.prototype.bindEvent = function () {
        //键盘事件改变方向

        var self = this;
        document.onkeydown = function (ev) {
            if (ev.keyCode === 37) {
                //不准反向掉头
                if (self.snake.direction === "R") {
                    return;
                }
                self.snake.changeDirection("L");
            }else if(ev.keyCode === 38){
                if (self.snake.direction === "D") {
                    return;
                }
                self.snake.changeDirection("U");
            }else if(ev.keyCode === 39){
                if (self.snake.direction === "L") {
                    return;
                }
                self.snake.changeDirection("R");
            }else if(ev.keyCode === 40){
                if (self.snake.direction === "U") {
                    return;
                }
                self.snake.changeDirection("D");
            }
            
        }

    }

    //把食物放进表格
    Game.prototype.setFood = function (row,col,content) {
        this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = content;
        
    }
})();