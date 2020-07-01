import React, { Component } from 'react'
import PokeList from '../pokemon/PokeList'; 

export default class Dashboard extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <PokeList /> 
                </div>
            </div>
        )
    }
}
