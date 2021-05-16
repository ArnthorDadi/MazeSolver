import {dijkstra, getDijkstraNodesInShortestPathOrder} from '../../Solvers/Dijkstra/Dijkstra';
import {Astar} from '../../Solvers/AstarSearch/AstarSearch';

export function getSolvedMazePath(grid, start, finish, solver){
    let visistedNodes;
    let shortestPath;
    let nodeVisisted_finish;
    switch(solver){
        // Dijkstra
        case 'Dijkstra':
            nodeVisisted_finish = dijkstra(grid, start, finish);
            visistedNodes = nodeVisisted_finish[0];
            shortestPath = getDijkstraNodesInShortestPathOrder(nodeVisisted_finish[1]);
            return {
                visistedNodes: visistedNodes,
                shortestPath: shortestPath
            }
        // A* Search
        case 'A* Search':
            nodeVisisted_finish = Astar(grid, start, finish);
            visistedNodes = nodeVisisted_finish[0];
            shortestPath = getDijkstraNodesInShortestPathOrder(nodeVisisted_finish[1]);
            return {
                visistedNodes: visistedNodes,
                shortestPath: shortestPath
            }
        default:
            visistedNodes = [];
            shortestPath = [];
    }
}
