const { dijkstra, getDijkstraNodesInShortestPathOrder } = require('./Dijkstra');
const { createTestGrid, getExpectedResaults } = require('./Constants/SmallDijkstra5x5test');

test('Simple 5x5 Dijkstra test', () => {
    const startNodeCol = 0;
    const startNodeRow = 0;
    const finishNodeCol = 4;
    const finishNodeRow = 4;

    let grid = createTestGrid(startNodeCol, startNodeRow, finishNodeCol, finishNodeRow);
    let startNode = grid[startNodeCol][startNodeRow];
    let endNode = grid[finishNodeCol][finishNodeRow];
    let expectedVisistedNodesInOrder = getExpectedResaults(grid);

    let results = dijkstra(grid, startNode, endNode);
    let visistedNodesInOrder = results[0];

    expect(visistedNodesInOrder).toStrictEqual(expectedVisistedNodesInOrder);
});
