import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionTypes from '../../store/actions/index';

class auth extends Component {
    state={
        controls: {
            email: {
                elementType: input,
                elementConfig: {
                    type: 'email',
                    placeholder: 'User E-mail',
                },
                value: '',
                validation : {
                    required: true,
                    isEmail: true
				},
				valid: false,
            },
            password: {
                elementType: input,
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation : {
                    required: true,
                    minLength: 6,
					maxLength: 6,
				},
				valid: false,
            }
        },
        isSingup: true,
    }

    componentDidMount() {
        if(!this.props.building && this.props.redirectPath !== "/") {
            this.props.onSetAuthRedirect();
        }
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { isSingup: !prevState.isSingup}
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
           this.state.controls.email.value,
           this.state.controls.password.value,
           this.state.isSingup
           );
    }

    checkValidity = (rules, value) => {
        if(!rules.required) { return };

        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value);
        }
        
        return isValid;

    }

    onInputChangeHandler = (event, inputId) => {
        const newControls = {...this.state.controls};
        
        const targetInput = {...newControls[inputId]};
        targetInput.value = event.target.value;

        targetInput.valid = this.checkValidity(targetInput.validation, targetInput.value);

        newControls[inputId] = targetInput;

        this.setState({controls: newControls});
    }

    render () {
        const formElement = [];
        
        for ( let key in this.state.controls ) {
            formElement.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElement.map( key => (
            <Input 
                key= {key.id} 
                className={classes.Input}
                elementType= {key.config.elementType}
                elementConfig={key.config.elementConfig}
                value={key.config.value}
                changed={ (event) => this.onInputChangeHandler(event, key.id)}
                invalid={!key.config.valid} />
        ));
        
        if(this.props.loading) {
            form = <Spinner />
        }

        let redirect = null;
        if(this.props.isAuth){
            redirect = <Redirect to={this.props.redirectPath} />
        }

        return ( 
            <div className={classes.Authentication}>
                {redirect}
                <h3>Authentication</h3>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger"
                        clicked = {this.switchAuthModeHandler}>
                        Authentication { this.state.isSingup ? 'SINGUP' : 'SINGIN'} </Button>
            </div>
         );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        redirectPath : state.auth.redirectPath,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userEmail, password, isSingup) => dispatch(actionTypes.auth(userEmail, password, isSingup)),
        onSetAuthRedirect : () => dispatch(actionTypes.setAuthRedirect('/')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);