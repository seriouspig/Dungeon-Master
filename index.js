document.addEventListener('DOMContentLoaded', () => {

    const map = document.querySelector('.map')
    const forwardBtn = document.querySelector('.forward')
    const backBtn = document.querySelector('.backward')
    const leftBtn = document.querySelector('.left')
    const rightBtn = document.querySelector('.right')

    const imagesClose = [ "wall", "turn", "closed" ]
    const mazeArr = [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,1],
        [1,0,1,0,0,0,1,1,0,1],
        [1,0,0,0,1,0,1,1,0,1],
        [1,1,0,1,1,0,0,0,0,1],
        [1,1,0,1,1,0,1,1,0,1],
        [1,1,0,0,0,0,1,1,0,1],
        [1,1,1,1,1,0,1,1,0,1],
        [1,1,1,0,0,0,0,0,0,1],
        [1,1,1,0,1,1,1,1,1,1],
    ]

    let mazeBlocks = []
    let playerX = 9
    let playerY = 3
    let playerPos = [playerX, playerY]
    const directions = ['N', 'S', 'E', 'W']
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
        mazeBlocks[playerPos[0]][playerPos[1]].classList.add('map-player')
    }

    function removePlayer() {
        mazeBlocks[playerPos[0]][playerPos[1]].classList.remove('map-player')
    }

    function removePlayerFront() {
        mazeBlocks[playerPos[0]-1][playerPos[1]].classList.remove('map-player-front')
    }

    function mapPlayerFront() {
        mazeBlocks[playerPos[0]-1][playerPos[1]].classList.add('map-player-front')
    }

    mapCreator()
    mapPlayer()
    mapPlayerFront()

    console.log(mazeBlocks)
    console.log(forwardBtn)

    forwardBtn.addEventListener('click', () => {
        if (!mazeBlocks[playerX-1][playerY].classList.contains('map-wall')) {
            removePlayer()
            removePlayerFront()
            playerX --
            playerPos = [playerX, playerY]
            mapPlayer()
            mapPlayerFront()
        }        
    })
    backBtn.addEventListener('click', () => {
        if (!mazeBlocks[playerX+1][playerY].classList.contains('map-wall')) {
            removePlayer()
            playerX ++
            playerPos = [playerX, playerY]
        mapPlayer()
        }
    })
    leftBtn.addEventListener('click', () => {
        if (!mazeBlocks[playerX][playerY-1].classList.contains('map-wall')) {
            removePlayer()
            playerY --
            playerPos = [playerX, playerY]
            mapPlayer()
        }
    })
    rightBtn.addEventListener('click', () => {
        if (!mazeBlocks[playerX][playerY+1].classList.contains('map-wall')) {
            removePlayer()
            playerY ++
            playerPos = [playerX, playerY]
            mapPlayer()
        }
    })



})