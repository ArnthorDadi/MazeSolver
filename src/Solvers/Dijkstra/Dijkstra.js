const { createCellNode, createDijkstraNode } = require('../../Services/NodeService/NodeService');
// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getDijkstraNodesInShortestPathOrder(finish) {
    const nodesInShortestPathOrder = [];
    let currentNode = finish;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
  
function dijkstra(grid, start, finish)
{
    const orderedVisitedNodes = [];
    let dijkstrasGrid = getDijkstraGrid(grid, start);

    let unvisitedNodes = getNodes(dijkstrasGrid);
    
    // While there are some unvisited nodes keep going
    while(unvisitedNodes.length !== 0)
    {
        // Finds the vertex in unvisited nodes that has the min distance to finish node
        var minDistNode = findClosestNode(unvisitedNodes);
        // If we encounter a wall, we skip it.
        if (minDistNode.isWall) 
            continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (minDistNode.distance === Infinity){
            console.log("This is not suppost to happen");
            console.log(minDistNode.col, ", ", minDistNode.row);
            return [stripExtraData(orderedVisitedNodes), minDistNode];
        }
        // Mark the node as visited and set it to the unvisitedNodes
        minDistNode.isVisited = true;
        orderedVisitedNodes.push(minDistNode);
        // If the closest node is the finish node we are done and can return orderedVisitedNodes
        if (minDistNode.isFinish){
            return [stripExtraData(orderedVisitedNodes), minDistNode];
        }
        // Lastly we update unvisited nodes, their distances and paths
        updateUnvisitedNeighbors(minDistNode, dijkstrasGrid);
    }
}

function stripExtraData(nodes){
    let returnNodes = [];
    for (const node of nodes) {
        const { col, row, isStart, isFinish, isWall } = node;
        returnNodes.push(createCellNode(col, row, isStart, isFinish, isWall));
    }
    return returnNodes;
}
  
function updateUnvisitedNeighbors(node, grid) {
    // Gets the up, down, left, right cells
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    // Adds one (thats the distance) to that neighbors distance.
    // If we wanted to add a weights to nodes this will need to be refactored
    for (const neighbor of unvisitedNeighbors) 
    {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
}
  
  function getUnvisitedNeighbors(node, grid) {
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
  
  function findClosestNode(unvisitedNodes) {
    // Sorts after distance
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    //console.log("Sorted unvisited nodes: ", unvisitedNodes);
    // Gets the first element in the array
    return unvisitedNodes.shift();
  }
  
    function getNodes(grid, startNode) {
        let dijkstraNodes = [];
        for (const row of grid) {
            for (const node of row) {
                dijkstraNodes.push(node);
            }
        }
        return dijkstraNodes;
    }

    function getDijkstraGrid(grid, startNode){
        let dijkstraGrid = [];
        for (const row of grid) {
            let dijkstraRow = [];
            for (const node of row) {
                const { col, row, isStart, isFinish, isWall } = node;
                
                let dijkstraNode = createDijkstraNode(col, row, isStart, isFinish, isWall);
                if(node === startNode) 
                    dijkstraNode.distance = 0;

                dijkstraRow.push(dijkstraNode);
            }
            dijkstraGrid.push(dijkstraRow);
        }
        return dijkstraGrid;
    }

module.exports = { dijkstra, getDijkstraNodesInShortestPathOrder };