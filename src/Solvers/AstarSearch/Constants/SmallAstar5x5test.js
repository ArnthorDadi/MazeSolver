const { createCellNode } = require('../../../Services/NodeService/NodeService');

function createTestGrid(startNodeCol, startNodeRow, finishNodeCol, finishNodeRow){
    let walls = [
        [1, 0], [1, 1], [1, 2], [1, 3],
        [3, 1], [3, 2], [3, 3], [3, 4]
    ];

    let height_length = 5;
    let grid = [];

    for(let row=0; row< height_length; row++){
        let cellLine = [];
        for(let col=0; col< height_length; col++){
            
            let isWall = isCellWall(col, row, walls);
            let isStart = col === startNodeCol && row === startNodeRow;
            let isFinish = col === finishNodeCol && row === finishNodeRow;
            
            cellLine.push( createCellNode(col, row, isStart, isFinish, isWall) );
        }
        grid.push(cellLine);
    }
    return grid;
}

function getExpectedResaults(grid){
    return [
        grid[0][0], grid[1][0], grid[2][0], grid[3][0], 
        grid[4][0], grid[4][1], grid[4][2], 
        grid[3][2], grid[2][2], grid[1][2], 
        grid[0][2], grid[0][3], grid[0][4], 
        grid[1][4], grid[2][4], grid[3][4], grid[4][4], 
    ]
}

function isCellWall(col, row, walls){
    for(let wall of walls){
        const wallCol = wall[0];
        const wallRow = wall[1];
        if(wallCol === col && wallRow == row){
            return true;
        }
    }
    return false;
}

module.exports = { createTestGrid, getExpectedResaults};