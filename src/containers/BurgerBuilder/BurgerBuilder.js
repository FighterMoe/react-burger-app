import React, {Component} from 'react';
import Aux from '../../hoc/Reactaux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index.js';

export class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchasing: false,
		showSpinnerLoader: false,
	}

	componentDidMount() {
		this.props.onInitIngredients();
	}

	purchasingHanlder = () => {
		if(this.props.isAuth) {
			this.setState({purchasing : true});
		}else {
			this.props.onSetAuthRedirect('/checkout');
			this.props.history.push("/auth");
		}
	}

	cancelpurchaseHandler = () => {
		this.setState({purchasing : false});
	}

	containuepurchaseHandler = () => {
		/*this.setState({showSpinnerLoader: true});

		const order = {
			customer : {
				adress: {
					country: "Russia",
					street : "BilidSa Latcica",
					zipCode: 125480,
				},
				email: "test@gmail.com",
				name: "FighterMoe"
			},
			ingredients : this.state.ingredients,
			price : this.state.totalPrice,
			deliveryMethod: 'Fastest'
		} 

		axios.post('/orders.json', order)
			.then( request => {
				this.setState({showSpinnerLoader: false, purchasing: false})
			})
			.catch( error => {
				this.setState({showSpinnerLoader: false});
			});*/
		this.props.onInitPurchase();
		this.props.history.push("/checkout");		
	}

	purchasHandler = (updateIng) => {
		const ingredients = {...updateIng};

		const sumPrice = Object.keys(ingredients).map( igKey => {
			return ingredients[igKey];
		}).reduce(( sum, price) => {
			return sum + price;
		} , 0);

		return sumPrice;
	}

	// addIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const newCount = oldCount + 1;
	// 	const updateIng = {...this.state.ingredients};
	// 	updateIng[type] = newCount;

	// 	const ingPrices = INGREDIENTS_PRICES[type];
	// 	const totalPrice = this.state.totalPrice;
	// 	const newPrice = totalPrice + ingPrices;

	// 	this.setState({
	// 		ingredients : updateIng,
	// 		totalPrice : newPrice
	// 	});

	// 	this.purchasHandler(updateIng);
	// }

	// removeIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if(oldCount <= 0 ) {
	// 		return;
	// 	}
	// 	const newCount = oldCount - 1;
	// 	const updateIng = {...this.state.ingredients};
	// 	updateIng[type] = newCount;
		
	// 	const ingPrices = INGREDIENTS_PRICES[type];
	// 	const totalPrice = this.state.totalPrice;
	// 	const newPrice = totalPrice - ingPrices;

	// 	this.setState({
	// 		ingredients : updateIng,
	// 		totalPrice : newPrice
	// 	});
		
	// 	this.purchasHandler(updateIng);
	// }

	render() {
		const disableInfo = {...this.props.ings};

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] > 0;
		}

		let modalChildren = null;

		let burger = this.props.error ? <p>Ingredients can&#39;t get.</p> : <Spinner />;
		
		if(this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients = {this.props.ings} />

					<BuildControls 
					addIng = {this.props.onAddIngredients}
					lessIng = {this.props.onRemoveIngredients} 
					disableInfo = {disableInfo}
					totalPrice = {this.props.price} 
					disable = {this.purchasHandler(this.props.ings)}
					purchasing = {this.purchasingHanlder}
					isAuth = {this.props.isAuth}/>
				</Aux>
				)

			modalChildren = <OrderSummary 
									ingredients = {this.props.ings} 
									totalPrice = {this.props.price}
									cancelHandler = {this.cancelpurchaseHandler} 
									containueHandler = {this.containuepurchaseHandler}/>
		}

		if(this.state.showSpinnerLoader) {
			modalChildren = <Spinner />
		}
		
		return (
			<Aux>
				<Modal 
					show = {this.state.purchasing}
					cancelPurchase = {this.cancelpurchaseHandler} >

					{modalChildren}
					
				</Modal>

				{burger}
			</Aux>
		)
	}
}

const mapStateToProp = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		error: state.burgerBuilder.error,
		price: state.burgerBuilder.totalPrice,
		isAuth: state.auth.token !== null,
	}
}

const mapDispatchToProp = dispatch => {
	return {
		onAddIngredients: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
		onRemoveIngredients: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actionTypes.initIngredients()),
		onInitPurchase: () => dispatch(actionTypes.purchaseBurgerInit()),
		onSetAuthRedirect: (path) => dispatch(actionTypes.setAuthRedirect(path)),
	}
}

export default connect(mapStateToProp, mapDispatchToProp)(ErrorHandler(BurgerBuilder, axios));