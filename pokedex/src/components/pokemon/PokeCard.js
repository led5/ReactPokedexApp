import React, { Component } from 'react'; 
import styled from 'styled-components';

const Sprite = styled.img `
    width: 5em;
    height: 5em; 
`;

const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);  
    }
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
                <Card className="card">
                    <h5 className="card-header"><h1>{this.state.pokemonId}</h1></h5>
                    <Sprite className="card-img-top mx-auto mt-2" 
                    src={this.state.image}>
                    </Sprite>
                    <div className="card-body mx-auto">
                        <h6 className="card-title">{this.state.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase()+ letter.substring(1))
                        .join(' ')}</h6>
                    </div>
                </Card>
            </div>
        )
    }
}
