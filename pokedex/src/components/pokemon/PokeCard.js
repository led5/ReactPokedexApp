import React, { Component } from 'react'; 


// Card represents a single pokemon
export default class PokeCard extends Component {
    state = {
        name: '' ,
        image: '',
        pokemonId: ''
    }; 

    render() {
        const name = this.props.name; 
        const url = this.props.url;

        return (
            <div className="col-md-3 cold-sm-6 mb-5">
                <div className="card">
                    <div className="card-header">
                        <h1>{name}</h1>
                    </div>
                </div>
            </div>
        )
    }
}
