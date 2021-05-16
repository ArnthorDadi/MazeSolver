const { createCellNode, createAstarNode } = require('../../Services/NodeService/NodeService');
function Astar(grid, start, finish){

    let astartGrid = getAStarGrid(grid);

    astartGrid[start.row][start.col].distance = 0;
    astartGrid[start.row][start.col].heuristic = getHeuristicScore(astartGrid[start.row][start.col], finish);
    astartGrid[start.row][start.col].fullDistance = 0 + astartGrid[start.row][start.col].heuristic;

    let unvisitedNodes = [astartGrid[start.row][start.col]];
    let visitiedNodes = [];

    let currentNode = null;
    while (unvisitedNodes.length > 0) {
        currentNode = closestNode(unvisitedNodes);
        
        if (currentNode.isWall) continue;
        
        if (currentNode.distance === Infinity){
            return [stripExtraData(visitiedNodes), currentNode];
        }
        
        currentNode.isVisited = true;
        visitiedNodes.push(currentNode);
        
        if (currentNode.isFinish){
            return [stripExtraData(visitiedNodes), currentNode];
        }

        let newArray = unvisitedNodes.filter(node => node != currentNode);
        unvisitedNodes = newArray;
        
        updateNeighbors(currentNode, unvisitedNodes, astartGrid, finish);
    }
}

function closestNode(unvisitedNodes){
    let closestNode = {fullDistance: Infinity};
    for (let node of unvisitedNodes) {
        if(node.fullDistance < closestNode.fullDistance)
            closestNode = node;
        else if(node.fullDistance == closestNode.fullDistance)
        {
            if(node.heuristic < closestNode.heuristic){
                closestNode = node;
            }
        }
    }
    return closestNode;
}

function updateNeighbors(currentNode, unvisitedNodes, grid, finish){
    let neighbors = getNeighbors(currentNode, grid);
    for (let neighbor of neighbors) {
        if(neighbor.isWall) continue;

        if (!unvisitedNodes.includes(neighbor)) {
            neighbor.distance = currentNode.distance + 1;
            neighbor.heuristic = getHeuristicScore(neighbor, finish);
            neighbor.fullDistance = neighbor.distance + neighbor.heuristic;
            neighbor.previousNode = currentNode;

            unvisitedNodes.push(neighbor);
        } else {
            let currDistance = currentNode.distance + 1;
            if(currDistance < neighbor.distance){
                neighbor.distance = currDistance
                neighbor.fullDistance = neighbor.distance + neighbor.heuristic;
                neighbor.previousNode = currentNode;
            }
        }
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) 
        neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) 
        neighbors.push(grid[row + 1][col]);
    if (col > 0) 
        neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) 
        neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getHeuristicScore(neighbor, finish){
    let xOne = neighbor.col;
    let xTwo = finish.col;
    let yOne = neighbor.row;
    let yTwo = finish.row;

    let xChange = Math.abs(xOne - xTwo);
    let yChange = Math.abs(yOne - yTwo);

    return (xChange + yChange);
}

function getAStarGrid(grid){
    let astarGrid = [];
    for (const row of grid) {
        let astarRow = [];
        for (const node of row) {
            const { col, row, isStart, isFinish, isWall } = node;    
            let astarNode = createAstarNode(col, row, isStart, isFinish, isWall);
            astarRow.push(astarNode);
        }
        astarGrid.push(astarRow);
    }
    return astarGrid;
}

function stripExtraData(nodes){
    let returnNodes = [];
    for (const node of nodes) {
        const { col, row, isStart, isFinish, isWall } = node;
        returnNodes.push(createCellNode(col, row, isStart, isFinish, isWall));
    }
    return returnNodes;
}

module.exports = { Astar };