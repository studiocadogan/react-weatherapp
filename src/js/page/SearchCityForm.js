import React from "react";
import {Router} from "react-router";
export default class SearchCityForm extends React.Component {

    constructor(){
        super();
        this.state={};
    }
    onInputChange(e){
        this.setState({inputCity: e.target.value});
    }
    onSubmitCity(e){
        e.preventDefault();
        this.context.router.push('/city/'+this.state.inputCity);
    }

    render() {
        return (
            <form class="flexbox container search" action="#" onSubmit={this.onSubmitCity.bind(this)}>
                <input type="search" autoCapitalize="true" autoComplete="off" onChange={this.onInputChange.bind(this)} autoFocus="autofocus" placeholder="Search Location..." />
            </form>
        );
    }
    

}
SearchCityForm.contextTypes = {
    router: function contextType() {
        return React.PropTypes.func.isRequired;
    }
};