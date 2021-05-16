import React, {Component} from 'react';
import Header from '../../Components/Header';
import Maze from '../../Components/Maze';

class Home extends Component {
    
    constructor(){
        super();
        this.state = {
            solvers: [
                "Dijkstra",
                "A* Search"
            ]
        }
    }

    render() {
        const {solvers} = this.state;
        return (
            <>
                <Header 
                    Title={"Maze Solver"} />
                <Maze Solvers={solvers} />
            </>
        );
    }
}

export default Home;