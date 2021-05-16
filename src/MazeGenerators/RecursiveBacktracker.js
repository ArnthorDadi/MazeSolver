export function recursiveBacktracker(grid, start, finish){
    closeAllWallsAndUnvisistNodes(grid);
    var visitedNodesInOrder = [];
    start.isVisited = true;
    var nodeStack = [start];
    var neighbors;
    while(nodeStack.length > 0){
        let currentNode = nodeStack.pop();
        currentNode.isWall = false;
        
        visitedNodesInOrder.push(currentNode);
        neighbors = getUnvisitedNeighbors(currentNode, grid);
        
        if(neighbors.length > 0){
            nodeStack.push(currentNode);
            let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            randomNeighbor.isVisited = true;
            nodeStack.push(randomNeighbor);
            openWall(currentNode, randomNeighbor, grid);
        }
    }
    console.log("Done");
    return visitedNodesInOrder;
    
}
function closeAllWallsAndUnvisistNodes(grid){
    for(let lineOfCells of grid){
        for(let cell of lineOfCells){
            if(cell.col % 2 == 1 || cell.row % 2 == 1)
                cell.isWall = true;
            else
                cell.isWall = true;
            cell.isVisited = false;
        }
    }
}

function getUnvisitedNeighbors(node, grid){
    const {col, row} = node;
    let neighbors = [];
    // Up
    if (row > 0){
        neighbors.push(grid[row - 2][col]);
    }
    // Down
    if (row < grid.length - 1){
        neighbors.push(grid[row + 2][col]);
    }
    // Left
    if (col > 0){
        neighbors.push(grid[row][col - 2]);
    }
    // Right
    if (col < grid[0].length - 1){
        neighbors.push(grid[row][col + 2]);
    }

    if(neighbors.length == 0) return [];
    return neighbors.filter(neighbor => {
        if(neighbor == undefined)
            return false;
        else
            return !neighbor.isVisited
        });
}

function openWall(node, neighbor, grid){
    const {col, row} = node;
    // Up
    if (row > 0){
        if(grid[row - 2][col] === neighbor){
            grid[row - 1][col].isWall = false;
        }
    }
    // Down
    if (row < grid.length - 1){
        if(grid[row + 2][col] === neighbor){
            grid[row + 1][col].isWall = false;
        }
    }
    // Left
    if (col > 0){
        if(grid[row][col - 2] === neighbor){
            grid[row][col - 1].isWall = false;
        }
    }
    // Right
    if (col < grid[0].length - 1){
        if(grid[row][col + 2] === neighbor){
            grid[row][col + 1].isWall = false;
        }
    }
}