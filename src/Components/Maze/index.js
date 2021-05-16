import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { createCellNode } from '../../Services/NodeService/NodeService';
import { helperHandleMouseDown, helperHandleMouseEnter } from '../../Services/MazeService/Walls';
import { getSolvedMazePath } from '../../Services/MazeService/SolveMaze';
import { recursiveBacktracker } from '../../MazeGenerators/RecursiveBacktracker'; 

import Menu from '../../Components/Menus';
import Cell from '../Cell';

import './index.css';

const HEIGHT = 25;
const WIDTH = 51;

const getInitialGrid = (start, finish) => {
    let row_nr = HEIGHT;
    let col_nr = WIDTH;
    const grid = [];
    for (let row = 0; row < row_nr; row++) {
        const currentRow = [];
        for (let col = 0; col < col_nr; col++) {
            let isStart = false;
            let isFinish = false;
            if(row == start.row && col == start.col) isStart = true;
            else if(row == finish.row && col == finish.col) isFinish = true;
            currentRow.push(createCellNode(col, row, isStart, isFinish, false));
        }
        grid.push(currentRow);
    }
    return grid;
  };

class Maze extends Component {
  

    constructor() {
        super();
        this.state = {
            startCell: {row: 0, col: 0}, 
            finishCell: {row: HEIGHT-1, col: WIDTH-1},
            grid: getInitialGrid({row: 0, col: 0}, {row: HEIGHT-1, col: WIDTH-1}),
            mouseIsPressed: false,
            solvedClass: false,
            selectedSolverId: 0, 
            selectedSolver: ''
        };
    }

    componentDidMount() {
        const {Solvers} = this.props;
        const {selectedSolverId} = this.state;
        this.setState({
            selectedSolver: Solvers[selectedSolverId]
        });
    }
    
    solveMaze = () => {
        const {grid, startCell, finishCell, selectedSolver} = this.state;
        this.clearClasses();
        const result = getSolvedMazePath(grid, startCell, finishCell, selectedSolver);
        this.animateSolver(result.visistedNodes, result.shortestPath);
        this.setState({solvedClass: true});
    }

    createMaze = () => {
        this.clearMaze();
        const {grid, startCell, finishCell} = this.state;
        recursiveBacktracker(grid, startCell, finishCell);
        this.setState({grid});
    }

    /* Animations of shortest path */
    animateSolver(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }
    /* ------------------- */
    
    /* Clear Maze */
    clearClasses = () => {
        const {grid} = this.state;
        for(let cellRow of grid){
            for(let cell of cellRow){
                if(cell.isStart){
                    document.getElementById(`node-${cell.row}-${cell.col}`).className ='node node-start';
                }else if(cell.isFinish){
                    document.getElementById(`node-${cell.row}-${cell.col}`).className ='node node-finish';
                }else if(cell.isWall){
                    document.getElementById(`node-${cell.row}-${cell.col}`).className ='node node-wall';
                }else{
                    document.getElementById(`node-${cell.row}-${cell.col}`).className ='node';
                }
            }
        }
    }
    clearMaze = () => {
        const {grid} = this.state;
        const newGrid = grid;
        this.clearClasses();
        for(let cellRow of newGrid){
            for(let cell of cellRow){
                cell.isWall = false;
            }
        }
        this.setState({grid: newGrid});
    }
    /* ------------------- */

    /* Draws walls */
    handleMouseDown = (row, col) => {
        const {grid, solvedClass} = this.state;
        if(solvedClass){
            this.clearClasses();
            this.setState({solvedClass: false});
        }
        let results = helperHandleMouseDown(row, col, grid);
        this.setState({
            grid: results.grid,
            mouseIsPressed: results.mouseIsPressed
        });
    }
    handleMouseEnter = (row, col) => {
        const {grid, mouseIsPressed} = this.state;
        this.setState({grid: helperHandleMouseEnter(row, col, grid, mouseIsPressed)});
    }
    handleMouseUp = () => {
        this.setState({mouseIsPressed: false});
    }
    /* ----------------------- */

    changeSolver = (newSolverId) => {
        const {Solvers} = this.props;
        this.setState({
            selectedSolverId: newSolverId,
            selectedSolver: Solvers[newSolverId]
        });
    }

    render() {
        const {grid, selectedSolverId, selectedSolver} = this.state;
        const {Solvers} = this.props;
        return (
            <>
                <div className="choices">
                    <Menu 
                        MenuName={"Select Solver!"} 
                        Options={Solvers} 
                        SelectedIndex={selectedSolverId}
                        changeSelectedOption={this.changeSolver} />
                    <Button variant="contained" color="primary" onClick={this.solveMaze}>Solve With <i style={{marginLeft: 5 + 'px'}}>{selectedSolver}!</i></Button>
                    <Button variant="contained" color="primary" onClick={this.createMaze}>Generate Maze</Button>
                    <Button variant="contained" color="primary" onClick={this.clearMaze}>Clear Maze</Button>
                </div>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isFinish, isStart, isWall} = node;
                                    return (
                                        <Cell
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            row={row}
                                            onMouseDown={this.handleMouseDown}
                                            onMouseEnter={this.handleMouseEnter}
                                            onMouseUp={this.handleMouseUp} />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default Maze;