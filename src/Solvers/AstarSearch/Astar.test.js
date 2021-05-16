const { astar } = require('./AstarSearch');
const { createTestGrid, getExpectedResaults } = require('./Constants/SmallAstar5x5test');

test('Simple 5x5 Astar test', () => {
    const startNodeCol = 0;
    const startNodeRow = 0;
    const finishNodeCol = 4;
    const finishNodeRow = 4;

    let grid = createTestGrid(startNodeCol, startNodeRow, finishNodeCol, finishNodeRow);
    let startNode = grid[startNodeCol][startNodeRow];
    let endNode = grid[finishNodeCol][finishNodeRow];
    let expectedResaults = getExpectedResaults(grid);

    let results = astar(grid, startNode, endNode);
    let visistedNodesInOrder = results[0];
    
    expect(visistedNodesInOrder).toStrictEqual(expectedResaults);
});
