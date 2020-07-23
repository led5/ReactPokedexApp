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

        stats: {
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            specialAttack: "",
            specialDefense: "",
        },
        height: "",
        weight: "",
        eggGroup: "",
        abilities: "",
        genderRatioMale: "",
        genderRatioFemale: "",
        evs: "",
        hatchSteps: "",
    };

    async componentDidMount() {
        const { pokemonId } = this.props.match.params;
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        const pokeSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;

        const pokeRes = await axios.get(pokeUrl);
        const name = pokeRes.data.name;
        const image = pokeRes.data.sprites.front_default;

        const height =
            Math.round((pokeRes.data.height * 0.328084 + 0.0001) * 100) / 100;
        const weight =
            Math.round((pokeRes.data.height * 0.220462 + 0.0001) * 100) / 100;
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
            // <div className="col">
            //     <div className="card">
            //         <div className="card-header">
            //             <div className="row">
            //                 <div className="col-5">
            //                     <h5>{this.state.pokemonId}</h5>
            //                 </div>
            //                     <div className="col-7">
            //                     <div className="float-right">
            //                         {this.state.types.map(type => (
            //                             <span
            //                                 key={type}
            //                                 className="badge badge-primary badge-pill mr-1"
            //                                 style ={{
            //                                     backgroundColor: `#${TYPE_COLORS[type]}`, 
            //                                     color: 'white'
            //                                 }}>
            //                                 {type
            //                                 .toLowerCase()
            //                                 .split(' ')
            //                                 .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            //                                 .join(' ')}
            //                             </span>
            //                         ))}
            //                   </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>

            <div className="card-body">
                <div className="row align-items-center">
                        <div className="col-md-3">
                            <img src={this.state.image}
                            className="card-img-top rounded mx-auto mt-2"/> 
                        </div>
                        <div className="col-md-9">
                            <h4 className="mx-auto">
                                {this.state.name
                                    .toLowerCase()
                                    .split(' ')
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')}
                            </h4>
                        <div className="row align-items-center">
                        <h4 className="mx-auto">
                                {this.state.abilities
                                    .toLowerCase()
                                    .split(' ')
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')}
                            </h4>
                        </div>
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
        );
    }
}
