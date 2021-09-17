document.addEventListener('DOMContentLoaded', () => {

    const map = document.querySelector('.map')
    const forwardBtn = document.querySelector('.forward')
    const backBtn = document.querySelector('.backward')
    const leftBtn = document.querySelector('.left')
    const rightBtn = document.querySelector('.right')
    const turnLeftBtn = document.querySelector('.turnLeft')
    const turnRightBtn = document.querySelector('.turnRight')
    const imageLeft1 = document.getElementById("left_1")
    const imageLeft2 = document.getElementById("left_2")
    const imageLeft3 = document.getElementById("left_3")
    const imageRight1 = document.getElementById("right_1")
    const imageRight2 = document.getElementById("right_2")
    const imageRight3 = document.getElementById("right_3")

    const imagesClose = [ "wall", "turn", "closed" ]
    const mazeArr = [
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,1,0,0,0,0,1,1],
        [1,1,0,1,0,0,0,1,1,0,1,1],
        [1,1,0,0,0,1,0,1,1,0,1,1],
        [1,1,1,0,1,1,0,0,0,0,1,1],
        [1,1,1,0,1,1,0,1,1,0,1,1],
        [1,1,1,0,0,0,0,1,1,0,1,1],
        [1,1,1,1,1,1,0,1,1,0,1,1],
        [1,1,1,1,0,0,0,0,0,0,1,1],
        [1,1,1,1,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1]
    ]

    let mazeBlocks = []
    let playerY = 10
    let playerX = 4
    let playerPos = [playerX, playerY]
    const directions = ['N', 'E', 'S', 'W']
    let playerDir = directions[0]

    function mapCreator() {
        
        for (let i=0; i < mazeArr.length; i++) {
            let row = []
            for (let j=0; j< mazeArr[i].length; j++) {
                const mapBlock = document.createElement('div')            
                if (mazeArr[i][j] === 1) {
                    mapBlock.classList.add('map-wall')
                } else if (mazeArr[i][j] === 0) {
                    mapBlock.classList.add('map-empty')
                }
                row.push(mapBlock);
                map.appendChild(mapBlock)                
            } mazeBlocks.push(row)
        }
    }

    function mapPlayer() {
        mazeBlocks[playerPos[1]][playerPos[0]].classList.add('map-player')
    }

    function removePlayer() {
        mazeBlocks[playerPos[1]][playerPos[0]].classList.remove('map-player')
    }


    function mapPlayerFront() {
        if(playerDir == "N") {
            mazeBlocks[playerPos[1]-1][playerPos[0]].classList.add('map-player-front')
            
            mazeBlocks[playerPos[1]-2][playerPos[0]].classList.add('map-player-front-2')
            mazeBlocks[playerPos[1]][playerPos[0]-1].classList.add('map-player-left-1')
            mazeBlocks[playerPos[1]][playerPos[0]-1].classList.contains('map-wall') ? imageLeft1.src = "images/1_closed.png" : imageLeft1.src = "images/1_open.png"
            mazeBlocks[playerPos[1]-1][playerPos[0]-1].classList.add('map-player-left-2')
            mazeBlocks[playerPos[1]-1][playerPos[0]-1].classList.contains('map-wall') ? imageLeft2.src = "images/2_closed.png" : imageLeft2.src = "images/2_open.png"
            mazeBlocks[playerPos[1]-2][playerPos[0]-1].classList.add('map-player-left-3')
            mazeBlocks[playerPos[1]-2][playerPos[0]-1].classList.contains('map-wall') ? imageLeft3.src = "images/3_closed.png" : imageLeft3.src = "images/3_open.png"
            mazeBlocks[playerPos[1]][playerPos[0]+1].classList.add('map-player-right-1')
            mazeBlocks[playerPos[1]][playerPos[0]+1].classList.contains('map-wall') ? imageRight1.src = "images/1_closed.png" : imageRight1.src = "images/1_open.png"
            mazeBlocks[playerPos[1]-1][playerPos[0]+1].classList.add('map-player-right-2')
            mazeBlocks[playerPos[1]-1][playerPos[0]+1].classList.contains('map-wall') ? imageRight2.src = "images/2_closed.png" : imageRight2.src = "images/2_open.png"
            mazeBlocks[playerPos[1]-2][playerPos[0]+1].classList.add('map-player-right-3')
            mazeBlocks[playerPos[1]-2][playerPos[0]+1].classList.contains('map-wall') ? imageRight3.src = "images/3_closed.png" : imageRight3.src = "images/3_open.png"
            if (mazeBlocks[playerPos[1]-1][playerPos[0]].classList.contains('map-wall')) {
                imageLeft1.src = "images/1_wall.png";
                imageRight1.src = "images/1_wall.png";
            }
        } else if (playerDir == "E") {
            mazeBlocks[playerPos[1]][playerPos[0]+1].classList.add('map-player-front')
            mazeBlocks[playerPos[1]][playerPos[0]+2].classList.add('map-player-front-2')
            mazeBlocks[playerPos[1]-1][playerPos[0]].classList.add('map-player-left-1')
            mazeBlocks[playerPos[1]-1][playerPos[0]].classList.contains('map-wall') ? imageLeft1.src = "images/1_closed.png" : imageLeft1.src = "images/1_open.png"
            mazeBlocks[playerPos[1]-1][playerPos[0]+1].classList.add('map-player-left-2')
            mazeBlocks[playerPos[1]-1][playerPos[0]+1].classList.contains('map-wall') ? imageLeft2.src = "images/2_closed.png" : imageLeft2.src = "images/2_open.png"
            mazeBlocks[playerPos[1]-1][playerPos[0]+2].classList.add('map-player-left-3')
            mazeBlocks[playerPos[1]-1][playerPos[0]+1].classList.contains('map-wall') ? imageLeft3.src = "images/3_closed.png" : imageLeft3.src = "images/3_open.png"
            mazeBlocks[playerPos[1]+1][playerPos[0]].classList.add('map-player-right-1')
            mazeBlocks[playerPos[1]+1][playerPos[0]].classList.contains('map-wall') ? imageRight1.src = "images/1_closed.png" : imageRight1.src = "images/1_open.png"
            mazeBlocks[playerPos[1]+1][playerPos[0]+1].classList.add('map-player-right-2')
            mazeBlocks[playerPos[1]+1][playerPos[0]+1].classList.contains('map-wall') ? imageRight2.src = "images/2_closed.png" : imageRight2.src = "images/2_open.png"
            mazeBlocks[playerPos[1]+1][playerPos[0]+2].classList.add('map-player-right-3')
            mazeBlocks[playerPos[1]+1][playerPos[0]+2].classList.contains('map-wall') ? imageRight3.src = "images/3_closed.png" : imageRight3.src = "images/3_open.png"
        } else if (playerDir == "S") {
            mazeBlocks[playerPos[1]+1][playerPos[0]].classList.add('map-player-front')
            mazeBlocks[playerPos[1]+2][playerPos[0]].classList.add('map-player-front-2')
            mazeBlocks[playerPos[1]][playerPos[0]+1].classList.add('map-player-left-1')
            mazeBlocks[playerPos[1]][playerPos[0]+1].classList.contains('map-wall') ? imageLeft1.src = "images/1_closed.png" : imageLeft1.src = "images/1_open.png"
            mazeBlocks[playerPos[1]+1][playerPos[0]+1].classList.add('map-player-left-2')
            mazeBlocks[playerPos[1]+1][playerPos[0]+1].classList.contains('map-wall') ? imageLeft2.src = "images/2_closed.png" : imageLeft2.src = "images/2_open.png"
            mazeBlocks[playerPos[1]+2][playerPos[0]+1].classList.add('map-player-left-3')
            mazeBlocks[playerPos[1]+2][playerPos[0]+1].classList.contains('map-wall') ? imageLeft3.src = "images/3_closed.png" : imageLeft3.src = "images/3_open.png"
            mazeBlocks[playerPos[1]][playerPos[0]-1].classList.add('map-player-right-1')
            mazeBlocks[playerPos[1]][playerPos[0]-1].classList.contains('map-wall') ? imageRight1.src = "images/1_closed.png" : imageRight1.src = "images/1_open.png"
            mazeBlocks[playerPos[1]+1][playerPos[0]-1].classList.add('map-player-right-2')
            mazeBlocks[playerPos[1]+1][playerPos[0]-1].classList.contains('map-wall') ? imageRight2.src = "images/2_closed.png" : imageRight2.src = "images/2_open.png"
            mazeBlocks[playerPos[1]+2][playerPos[0]-1].classList.add('map-player-right-3')
            mazeBlocks[playerPos[1]+2][playerPos[0]-1].classList.contains('map-wall') ? imageRight3.src = "images/3_closed.png" : imageRight3.src = "images/3_open.png"
        } else if (playerDir == "W") {
            mazeBlocks[playerPos[1]][playerPos[0]-1].classList.add('map-player-front')
            mazeBlocks[playerPos[1]][playerPos[0]-2].classList.add('map-player-front-2')
            mazeBlocks[playerPos[1]+1][playerPos[0]].classList.add('map-player-left-1')
            mazeBlocks[playerPos[1]+1][playerPos[0]].classList.contains('map-wall') ? imageLeft1.src = "images/1_closed.png" : imageLeft1.src = "images/1_open.png"
            mazeBlocks[playerPos[1]+1][playerPos[0]-1].classList.add('map-player-left-2')
            mazeBlocks[playerPos[1]+1][playerPos[0]-1].classList.contains('map-wall') ? imageLeft2.src = "images/2_closed.png" : imageLeft2.src = "images/2_open.png"
            mazeBlocks[playerPos[1]+1][playerPos[0]-2].classList.add('map-player-left-3')
            mazeBlocks[playerPos[1]+1][playerPos[0]-2].classList.contains('map-wall') ? imageLeft3.src = "images/3_closed.png" : imageLeft3.src = "images/3_open.png"
            mazeBlocks[playerPos[1]-1][playerPos[0]].classList.add('map-player-right-1')
            mazeBlocks[playerPos[1]-1][playerPos[0]].classList.contains('map-wall') ? imageRight1.src = "images/1_closed.png" : imageRight1.src = "images/1_open.png"
            mazeBlocks[playerPos[1]-1][playerPos[0]-1].classList.add('map-player-right-2')
            mazeBlocks[playerPos[1]-1][playerPos[0]-1].classList.contains('map-wall') ? imageRight2.src = "images/2_closed.png" : imageRight2.src = "images/2_open.png"
            mazeBlocks[playerPos[1]-1][playerPos[0]-2].classList.add('map-player-right-3')
            mazeBlocks[playerPos[1]+2][playerPos[0]-2].classList.contains('map-wall') ? imageRight3.src = "images/3_closed.png" : imageRight3.src = "images/3_open.png"
        }        
    }

    function removePlayerFront() {
        if(playerDir == "N") {
            mazeBlocks[playerPos[1]-1][playerPos[0]].classList.remove('map-player-front')
            mazeBlocks[playerPos[1]-2][playerPos[0]].classList.remove('map-player-front-2')
            mazeBlocks[playerPos[1]][playerPos[0]-1].classList.remove('map-player-left-1')
            mazeBlocks[playerPos[1]-1][playerPos[0]-1].classList.remove('map-player-left-2')
            mazeBlocks[playerPos[1]-2][playerPos[0]-1].classList.remove('map-player-left-3')
            mazeBlocks[playerPos[1]][playerPos[0]+1].classList.remove('map-player-right-1')
            mazeBlocks[playerPos[1]-1][playerPos[0]+1].classList.remove('map-player-right-2')
            mazeBlocks[playerPos[1]-2][playerPos[0]+1].classList.remove('map-player-right-3')
        } else if (playerDir == "E") {
            mazeBlocks[playerPos[1]][playerPos[0]+1].classList.remove('map-player-front')
            mazeBlocks[playerPos[1]][playerPos[0]+2].classList.remove('map-player-front-2')
            mazeBlocks[playerPos[1]-1][playerPos[0]].classList.remove('map-player-left-1')
            mazeBlocks[playerPos[1]-1][playerPos[0]+1].classList.remove('map-player-left-2')
            mazeBlocks[playerPos[1]-1][playerPos[0]+2].classList.remove('map-player-left-3')
            mazeBlocks[playerPos[1]+1][playerPos[0]].classList.remove('map-player-right-1')
            mazeBlocks[playerPos[1]+1][playerPos[0]+1].classList.remove('map-player-right-2')
            mazeBlocks[playerPos[1]+1][playerPos[0]+2].classList.remove('map-player-right-3')
        } else if (playerDir == "S") {
            mazeBlocks[playerPos[1]+1][playerPos[0]].classList.remove('map-player-front')
            mazeBlocks[playerPos[1]+2][playerPos[0]].classList.remove('map-player-front-2')
            mazeBlocks[playerPos[1]][playerPos[0]+1].classList.remove('map-player-left-1')
            mazeBlocks[playerPos[1]+1][playerPos[0]+1].classList.remove('map-player-left-2')
            mazeBlocks[playerPos[1]+2][playerPos[0]+1].classList.remove('map-player-left-3')
            mazeBlocks[playerPos[1]][playerPos[0]-1].classList.remove('map-player-right-1')
            mazeBlocks[playerPos[1]+1][playerPos[0]-1].classList.remove('map-player-right-2')
            mazeBlocks[playerPos[1]+2][playerPos[0]-1].classList.remove('map-player-right-3')
        } else if (playerDir == "W") {
            mazeBlocks[playerPos[1]][playerPos[0]-1].classList.remove('map-player-front')
            mazeBlocks[playerPos[1]][playerPos[0]-2].classList.remove('map-player-front-2')
            mazeBlocks[playerPos[1]+1][playerPos[0]].classList.remove('map-player-left-1')
            mazeBlocks[playerPos[1]+1][playerPos[0]-1].classList.remove('map-player-left-2')
            mazeBlocks[playerPos[1]+1][playerPos[0]-2].classList.remove('map-player-left-3')
            mazeBlocks[playerPos[1]-1][playerPos[0]].classList.remove('map-player-right-1')
            mazeBlocks[playerPos[1]-1][playerPos[0]-1].classList.remove('map-player-right-2')
            mazeBlocks[playerPos[1]-1][playerPos[0]-2].classList.remove('map-player-right-3')
        }     
    }

    function moveUp() {
        if (!mazeBlocks[playerY-1][playerX].classList.contains('map-wall')) {
            removePlayer()
            removePlayerFront()
            playerY --
            playerPos = [playerX, playerY]
            mapPlayer()
            mapPlayerFront()
        }
    }

    function moveDown() {
        if (!mazeBlocks[playerY+1][playerX].classList.contains('map-wall')) {
            removePlayer()
            removePlayerFront()
            playerY ++
            playerPos = [playerX, playerY]
            mapPlayer()
            mapPlayerFront()
        }
    }

    function moveLeft() {
        if (!mazeBlocks[playerY][playerX-1].classList.contains('map-wall')) {
            removePlayer()
            removePlayerFront()
            playerX --
            playerPos = [playerX, playerY]
            mapPlayer()
            mapPlayerFront()
        }
    }

    function moveRight() {
        if (!mazeBlocks[playerY][playerX+1].classList.contains('map-wall')) {
            removePlayer()
            removePlayerFront()
            playerX ++
            playerPos = [playerX, playerY]
            mapPlayer()
            mapPlayerFront()
        }
    }

    mapCreator()
    mapPlayer()
    mapPlayerFront()

    console.log(mazeBlocks)
    console.log(forwardBtn)

    forwardBtn.addEventListener('click', () => {
        if (playerDir == "N") {
            moveUp()
        }
        else if (playerDir == "E") {
            moveRight()
        }
        else if (playerDir == "S") {
            moveDown()
        }
        else if (playerDir == "W") {
            moveLeft()
        }             
    })

    backBtn.addEventListener('click', () => {
        if (playerDir == "N") {
            moveDown()
        }
        else if (playerDir == "E") {
            moveLeft()
        }
        else if (playerDir == "S") {
            moveUp()
        }
        else if (playerDir == "W") {
            moveRight()
        }           
    })

    leftBtn.addEventListener('click', () => {
        if (playerDir == "N") {
            moveLeft()
        }
        else if (playerDir == "E") {
            moveUp()
        }
        else if (playerDir == "S") {
            moveRight()
        }
        else if (playerDir == "W") {
            moveDown()
        }  
    })

    rightBtn.addEventListener('click', () => {
        if (playerDir == "N") {
            moveRight()
        }
        else if (playerDir == "E") {
            moveDown()
        }
        else if (playerDir == "S") {
            moveLeft()
        }
        else if (playerDir == "W") {
            moveUp()
        }          
    })

    turnRightBtn.addEventListener('click', () => {
        if (playerDir == "N") {
            removePlayerFront()
            playerDir="E"
            mapPlayerFront()
        }
        else if (playerDir == "E") {
            removePlayerFront()
            playerDir="S"
            mapPlayerFront()
        }
        else if (playerDir == "S") {
            removePlayerFront()
            playerDir="W"
            mapPlayerFront()
        }
        else if (playerDir == "W") {
            removePlayerFront()
            playerDir="N"
            mapPlayerFront()
        }
    })

    turnLeftBtn.addEventListener('click', () => {
        if (playerDir == "N") {
            removePlayerFront()
            playerDir="W"
            mapPlayerFront()
        }
        else if (playerDir == "E") {
            removePlayerFront()
            playerDir="N"
            mapPlayerFront()
        }
        else if (playerDir == "S") {
            removePlayerFront()
            playerDir="E"
            mapPlayerFront()
        }
        else if (playerDir == "W") {
            removePlayerFront()
            playerDir="S"
            mapPlayerFront()
        }
    })

})