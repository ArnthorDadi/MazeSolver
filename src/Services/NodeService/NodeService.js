function createCellNode(col, row, isStart, isFinish, isWall){
    return {
        col: col,
        row: row,
        isStart: isStart,
        isFinish: isFinish,
        isWall: isWall,
      };
};

function createDijkstraNode(col, row, isStart, isFinish, isWall, distance = Infinity){
    return {
        col: col,
        row: row,
        isStart: isStart,
        isFinish: isFinish,
        isWall: isWall,
        distance: distance,
        previousNode: null,
        isVisisted: false
      };
};

function createAstarNode(col, row, isStart, isFinish, isWall, distance=Infinity, heuristic=null, fullDistance=null){
  return {
      col: col,
      row: row,
      isStart: isStart,
      isFinish: isFinish,
      isWall: isWall,
      isVisisted: false,
      previousNode: null,
      distance: distance,
      heuristic: heuristic,
      fullDistance: fullDistance,
    };
};

module.exports = { createCellNode, createDijkstraNode, createAstarNode };