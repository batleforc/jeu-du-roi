import React from 'react';
/* eslint-disable */
export default class WaitingGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reload:true
        }
        var canvas;
        var ctx;
        var ballRadius;
        var x;
        var y ;
        var dx;
        var dy ;
        var paddleHeight ;
        var paddleWidth;
        var paddleX;
        var rightPressed ;
        var leftPressed;
        var brickRowCount ;
        var brickColumnCount ;
        var brickWidth ;
        var brickHeight ;
        var brickPadding ;
        var brickOffsetTop ;
        var brickOffsetLeft;
        var score ;
        var lives ;
        var bricks ;
        var animationFrame;

        this.keyDownHandler=this.keyDownHandler.bind(this);
        this.keyUpHandler=this.keyUpHandler.bind(this);
        this.mouseMoveHandler=this.mouseMoveHandler.bind(this);
        this.collisionDetection=this.collisionDetection.bind(this);
        this.drawBall=this.drawBall.bind(this);
        this.drawPaddle=this.drawPaddle.bind(this);
        this.drawBricks=this.drawBricks.bind(this);
        this.drawScore=this.drawScore.bind(this);
        this.drawLives=this.drawLives.bind(this);
        this.draw=this.draw.bind(this);
        this.handleStop=this.handleStop.bind(this);
        this.handleDEBUGstop=this.handleDEBUGstop.bind(this);
        this.startrestart=this.startrestart.bind(this);

    }
    keyDownHandler(e) {
        if(e.keyCode == 39) {
            this.rightPressed = true;
        }
        else if(e.keyCode == 37) {
            this.leftPressed = true;
        }
    }
     keyUpHandler(e) {
        if(e.keyCode == 39) {
            this.rightPressed = false;
        }
        else if(e.keyCode == 37) {
            this.leftPressed = false;
        }
    }
     mouseMoveHandler(e) {
        var relativeX = e.clientX - this.canvas.offsetLeft;
        if(relativeX > 0 && relativeX < this.canvas.width) {
            this.paddleX = relativeX - this.paddleWidth/2;
        }
    }
     collisionDetection() {
        for(var c=0; c<this.brickColumnCount; c++) {
            for(var r=0; r<this.brickRowCount; r++) {
                var b = this.bricks[c][r];
                if(b.status == 1) {
                    if(this.x > b.x && this.x < b.x+this.brickWidth && this.y > b.y && this.y < b.y+this.brickHeight) {
                        this.dy = -this.dy;
                        b.status = 0;
                        this.score++;
                        if(this.score == this.brickRowCount*this.brickColumnCount) {
                            alert("YOU WIN, CONGRATS!");
                            cancelAnimationFrame(this.animationFrame);
                            this.setState({reload:true});
                            this.startrestart();
                        }
                    }
                }
            }
        }
    }
     drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
     drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX, this.canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
     drawBricks() {
        for(var c=0; c<this.brickColumnCount; c++) {
            for(var r=0; r<this.brickRowCount; r++) {
                if(this.bricks[c][r].status == 1) {
                    var brickX = (r*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                    var brickY = (c*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = "#0095DD";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }
     drawScore() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Score: "+this.score, 8, 20);
    }
     drawLives() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Lives: "+this.lives, this.canvas.width-65, 20);
    }
     draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.drawLives();
        this.collisionDetection();
        if(this.x + this.dx > this.canvas.width-this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if(this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }
        else if(this.y + this.dy > this.canvas.height-this.ballRadius) {
            if(this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
                this.dy = -this.dy;
            }
            else {
                this.lives--;
                if(!this.lives) {
                    alert("GAME OVER");
                    this.handleStop()
                    this.setState({reload:true});
                    this.startrestart();
                }
                else {
                    this.x = this.canvas.width/2;
                    this.y = this.canvas.height-30;
                    this.dx = 3;
                    this.dy = -3;
                    this.paddleX = (this.canvas.width-this.paddleWidth)/2;
                }
            }
        }
        if(this.rightPressed && this.paddleX < this.canvas.width-this.paddleWidth) {
            this.paddleX += 7;
        }
        else if(this.leftPressed && this.paddleX > 0) {
            this.paddleX -= 7;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.animationFrame= requestAnimationFrame(this.draw);
    }
    componentDidMount(){
        if(this.state.reload){
            this.setState({reload:false})
            this.startrestart();
        }
    }
    startrestart(){
        cancelAnimationFrame(this.animationFrame)
        this.canvas = document.getElementById("mycanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ballRadius = 10;
        this.x = this.canvas.width/2;
        this.y = this.canvas.height-30;
        this.dx = 2;
        this.dy = -2;
        this.paddleHeight = 10;
        this.paddleWidth = 75;
        this.paddleX = (this.canvas.width-this.paddleWidth)/2;
        this.rightPressed = false;
        this.leftPressed = false;
        this.brickRowCount = 5;
        this.brickColumnCount = 3;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;
        this.score = 0;
        this.lives = 3;
        this.bricks = [];
        for(var c=0; c<this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for(var r=0; r<this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("mousemove", this.mouseMoveHandler, false);
        this.draw();
    }
    handleStop(){
        cancelAnimationFrame(this.animationFrame)
    }
    handleDEBUGstop(){
        this.handleStop();
        this.props.handle();
    }

    render(){
        return(
            <div>
                <h1> Veuillez profiter de ce jeux en attendant que la partie sois compléte</h1>
                <canvas id="mycanvas" width="480" height="320" style={{background:"#eee",display:"block",margin:"0 auto"}}></canvas>
                <button className="FormButton" onClick={this.startrestart}>Recommencer</button>
                {this.props.debug&&<button className="FormButton" onClick={this.handleDEBUGstop}>Passer le chargement</button>}

            </div>
        )
    }
}