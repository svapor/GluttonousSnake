(function() {

    //在Game构造函数中 生成实例食物，而食物中又要调用game实例，所以需要中介者参数mediator
    window.Food = function (mediator) {
        var self = this;

        do {
            this.row = ~~(Math.random()*mediator.rowsAmount);
            this.col = ~~(Math.random()*mediator.colsAmount);
        } while (
            //判定条件里要用到循环。所以用了IIFE
            (function () {
                for(var i = 0;i<mediator.snake.body.length;i++){
                    if (mediator.snake.body[i].row === self.row && mediator.snake.body[i].col === self.col) {
                        return true;  //食物随机到蛇身上，再执行循环
                    }
                }


                return false;   //食物不在蛇身上，循环终止
            })()
        );
    }

    //渲染食物出来，放在定时器里
    Food.prototype.render = function () {
        game.setFood(this.row,this.col,"🍔");
    }
})();