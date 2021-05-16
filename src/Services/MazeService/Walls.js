function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

function helperHandleMouseDown(row, col, grid){
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    return {
        grid: newGrid,
        mouseIsPressed: true
    };
}

function helperHandleMouseEnter(row, col, grid, mouseIsPressed){
    if (!mouseIsPressed) return grid;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    return newGrid;
}

module.exports = { helperHandleMouseDown, helperHandleMouseEnter };