/* eslint-disable default-case */
import React, { Component } from "react";
import axios from "axios";


const TYPE_COLORS = {
    bug: "B1C12E",
    dark: "4F3A2D",
    dragon: "755EDF",
    electric: "FCBC17",
    fighting: "823551D",
    fire: "E73B0C",
    flying: "A3B3F7",
    ghost: "6060B2",
    grass: "74C236",
    ground: "D3B357",
    ice: "A3E7FD",
    normal: "C8C4BC",
    poison: "934594",
    psychic: "ED4882",
    rock: "B9A156",
    steel: "B5B5C3",
    water: "3295F6",
};

export default class Pokemon extends Component {
    state = {
        name: "",
        pokemonId: "",
        image: "",
        types: [],
        description: "",
        height: "",
        weight: "",
        abilities: "",
    };

    async componentDidMount() {
        const { pokemonId } = this.props.match.params;
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        const pokeSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;

        const pokeRes = await axios.get(pokeUrl);
        const name = pokeRes.data.name;
        const image = `https://www.cpokemon.com/pokes/animated/ds/${pokemonId}.gif?raw=true`;

        const height = Math.round((pokeRes.data.height * 0.328084 + 0.0001) * 100) / 100; 
        const weight = Math.round((pokeRes.data.height * 0.220462 + 0.0001) * 100) / 100;
        const types = pokeRes.data.types.map((type) => type.type.name);
        const abilities = pokeRes.data.abilities
            .map((ability) => {
                return ability.ability.name
                    .toLowerCase()
                    .split("-")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ");
            })
            .join(", ");


        // Get description
        await axios.get(pokeSpecies).then((res) => {
            let description = "";
            res.data.flavor_text_entries.some((flavor) => {
                if (flavor.language.name === "en") {
                    description = flavor.flavor_text;
                    return;
                }
            });

            this.setState({
                description,
            });
        });

        this.setState({
            image,
            pokemonId,
            name,
            types,
            height,
            weight,
            abilities,
        });
    }

    render() {
        return (
            <div className="col">
                <div className="card bg-light">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <img src={this.state.image} class="card-img-top-sprite mx-auto mt-2"/> 
                            </div>
                            <div className="col-md-9">
                            <h4><span class="d-block p-2 text-white">
                                        <small>No.{this.state.pokemonId}</small> &nbsp;&nbsp; {this.state.name
                                        .toLowerCase()
                                        .split(' ')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                       .join(' ')}
                                </span></h4>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th class="table-light" scope="col">Type</th>
                                            <th scope="col">{this.state.types.map(type => (
                                                <span
                                                     key={type}
                                                    className="badge badge-secondary mr-1"
                                                    style ={{
                                                    backgroundColor: `#${TYPE_COLORS[type]}`, 
                                                    color: 'white'
                                                }}>
                                                {type
                                                    .toLowerCase()
                                                    .split(' ')
                                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                                    .join(' ')}
                                            </span>
                                        ))}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th class="table-light" scope="row">Abilities</th>
                                        <td> <h6 className="mx-auto">
                                            {this.state.abilities
                                            .toLowerCase()
                                            .split(' ')
                                            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                            .join(' ')}
                                        </h6></td>
                                    </tr>
                                    <tr>
                                        <th class="table-light" scope="row">Height</th>
                                        <td><h6 className="mx-auto">{this.state.height}" </h6></td>
                                    </tr>
                                    <tr>
                                        <th class="table-light" scope="row">Weight</th>
                                        <td><h6 className="mx-auto">{this.state.weight} lbs</h6></td>
                                    </tr>
                                </tbody>
                                </table>
                        <div className="card-footer">
                            <div className="row mt-1">
                                    <div className="col">
                                        <p className="p-2">{this.state.description}</p> 
                                        </div>  
                                    </div>      
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
