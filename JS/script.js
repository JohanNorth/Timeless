var ctx, c;

var TILE_SIZE = 40;

var UP_DIR = 0;
var DOWN_DIR = 1;
var LEFT_DIR = 2;
var RIGHT_DIR = 3;

var FLOOR_TILE = 0;
var WALL_TILE = 1;
var PLAYER_TILE = 2;
var BOX_TILE = 3;
var DUMMY_TILE = 4;
var WINNING_TILE = 5;

var LEVEL = 0;


var map1 =[ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,0,0,4,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,5,0,0,0,0,0,0,0,3,2,4,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,0,0,0,0,0,0,4,0,0,0,1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]   

var map2 =[ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,4,2,4,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1,5,1,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var maps= [map1, map2];

function start() {

    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    playerImg = document.getElementById("player");
    wallImg = document.getElementById("wall")

    window.setInterval(update, 20);

}

function findPlayerI() {
   
    for(var j = 0; j < maps[LEVEL].length; j ++){
        for(var i = 0; i < maps[LEVEL][0].length; i ++) {
            if (maps[LEVEL][j][i] == PLAYER_TILE) {
                
                return i;
            }
        }
    }
}

function findPlayerJ() {
    
    for(var j = 0; j < maps[LEVEL].length; j ++){
        for(var i = 0; i < maps[LEVEL][0].length; i ++) {
            if(maps[LEVEL][j][i] == PLAYER_TILE){
                
                return j;
            }
            
        }
    
    }
    
}

function nextPositionI(i, j, dir) {
    
    switch (dir){
            
        case UP_DIR:
        case DOWN_DIR:
            return i;
            
            break;
        case LEFT_DIR:
            
            return i-1;
            
            break;
            
        case RIGHT_DIR:
            
             return i+1;
            
            break;       
                
    }
    
    
}

function nextPositionJ(i, j, dir) {
    
    switch (dir){
            
        case UP_DIR:
            
            return j-1
            
            break;
            
        case DOWN_DIR:
            
            return j+1;
            
            break;
            
            
        case LEFT_DIR:    
        case RIGHT_DIR:
            
             return j;
            
            break;       
                
    }
    
}

function moveDummy(i, j, dir){
    var dummyi = i;
    var dummyj = j;
    var nexti = nextPositionI(i, j, dir);
    var nextj = nextPositionJ(i, j, dir);
    
    while(maps[LEVEL][nextj][nexti] != WALL_TILE && maps[LEVEL][nextj][nexti] != BOX_TILE && maps[LEVEL][nextj][nexti] != DUMMY_TILE) {
        var tempi = nexti;
        var tempj = nextj;
        
        dummyi = nexti;
        dummyj = nextj;
        nexti = nextPositionI(tempi, tempj, dir);
        nextj = nextPositionJ(tempi, tempj, dir);
    }
    
    maps[LEVEL][j][i] = FLOOR_TILE;
    maps[LEVEL][dummyj][dummyi] = DUMMY_TILE;
    
}

function moveBox(i, j, dir){
    var boxi = i;
    var boxj = j;
    var nexti = nextPositionI(i, j, dir);
    var nextj = nextPositionJ(i, j, dir);
    
    while(maps[LEVEL][nextj][nexti] != WALL_TILE && maps[LEVEL][nextj][nexti] != BOX_TILE && maps[LEVEL][nextj][nexti] != DUMMY_TILE) {
        var tempi = nexti;
        var tempj = nextj;
        
        boxi = nexti;
        boxj = nextj;
        nexti = nextPositionI(tempi, tempj, dir);
        nextj = nextPositionJ(tempi, tempj, dir);
        
            if(maps[LEVEL][boxj][boxi] == WINNING_TILE) {
        
                var win = prompt("You Won!");
        
                    alert(win);
        }
    }
    
    
    maps[LEVEL][j][i] = FLOOR_TILE;
    maps[LEVEL][boxj][boxi] = BOX_TILE;
        
}

function movePlayer(dir) {
    
    var pi = findPlayerI();
    var pj = findPlayerJ();
    
    var nexti = nextPositionI(pi, pj, dir);
    var nextj = nextPositionJ(pi, pj, dir);
    
    if (maps[LEVEL][nextj][nexti] == BOX_TILE){
        
        moveBox(nexti, nextj, dir);
        
        return;
    }
    
    if (maps[LEVEL][nextj][nexti] == DUMMY_TILE){
        
        moveDummy(nexti, nextj, dir);
        
        return;
    }
    
    if (maps[LEVEL][nextj][nexti] != FLOOR_TILE){
        
        return;
    }
    
    maps[LEVEL][pj][pi] = FLOOR_TILE;
    maps[LEVEL][nextj][nexti] = PLAYER_TILE;
    
}
    
function paintLevel() {

    for(var j = 0; j < maps[LEVEL].length; j ++){
    
        for(var i = 0; i < maps[LEVEL][0].length; i ++) {
            
            switch (maps[LEVEL][j][i]) {
                    
                //Paint Wall    
                case WALL_TILE:
                    
                    ctx.fillStyle = "rgb(0,0,0)";
                    ctx.fillRect(i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                
                    break;
                    
                //Paint Floor    
                case FLOOR_TILE:
                    
                    ctx.fillStyle = "rgb(200,0,0)";
                    ctx.fillRect(i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    
                    
                    break;
                    
                //Paint Player    
                case PLAYER_TILE:
                    
                    ctx.fillStyle = "rgb(200,0,0)";
                    ctx.fillRect(i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    
                    ctx.drawImage(playerImg, i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    
                    break;
                    
                //Paint Box    
                case BOX_TILE:
                    
                    ctx.fillStyle = "rgb(16, 201, 65)";
                    ctx.fillRect(i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    
                    break; 
                    
                //Paint Dummy Box  
                case DUMMY_TILE:
                    
                    ctx.fillStyle = "rgb(126, 114, 19)";
                    ctx.fillRect(i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    
                    break;    
                    
                //Paint Winning Tile   
                case WINNING_TILE:
                    
                    ctx.fillStyle = "rgb(20, 137, 51)";
                    ctx.fillRect(i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    
                    break;
            }
            
            
            //Draws Grid
            ctx.drawImage(wallImg,i*TILE_SIZE,j*TILE_SIZE,TILE_SIZE,TILE_SIZE);
            
         

        }
              
     }

}


        

function zoom(){
    
    document.body.style.zoom = "200%"; 
    
}
        

function update(){
    
    ctx.clearRect(0, 0, c.width, c.height);

    paintLevel(); 
    zoom();

}




/*------Kontroller-------*/

function keyDown(e) {

    console.log(e.keyCode);
    e.preventDefault();

    //Vänster
    if (e.keyCode == 65) {
        
         movePlayer(LEFT_DIR);
        
    }

    //Höger
    if (e.keyCode == 68) {

        movePlayer(RIGHT_DIR);
    }

    //Upp
    if(e.keyCode == 87) {

        movePlayer(UP_DIR);
    
        
    }

    //Ner
    if(e.keyCode == 83) {

    
        movePlayer(DOWN_DIR);
        
    }

}

function keyUp(e){
    
}
/*-------------------------------*/
