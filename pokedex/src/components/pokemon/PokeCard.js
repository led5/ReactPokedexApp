import React, { Component } from 'react'; 
import styled from 'styled-components';

const Sprite = styled.img `
    width: 5em;
    height: 5em; 
`;

// Card represents a single pokemon
export default class PokeCard extends Component {
    state = {
        name: '' ,
        image: '',
        pokemonId: ''
    }; 

    componentDidMount(){
        const {name, url} = this.props;
        const pokemonId = url.split("/")[url.split("/").length - 2]; 
        const image = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`
    
        this.setState({
            name, 
            image, 
            pokemonId
        }); 
    }

    render() {

        return (
            <div className="col-md-3 cold-sm-6 mb-5">
                <div className="card">
                    <h5 className="card-header"><h1>{this.state.pokemonId}</h1></h5>
                    <Sprite className="card-img-top mx-auto mt-2" 
                    src={this.state.image}>
                    </Sprite>
                    <div className="card-body mx-auto">
                        <h6 className="card-title">{this.state.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase()+ letter.substring(1))
                        .join(' ')}</h6>
                    </div>
                </div>
            </div>
        )
    }
}
