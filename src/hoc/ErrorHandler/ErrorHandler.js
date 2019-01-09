import React, {Component} from 'react';
import Aux from '../Reactaux/ReactAux';
import Modal from '../../components/UI/Modal/Modal';

const ErrorHander  = (WrappedElement, axios) => {
	return class extends Component {
		state = {
			error : null,
		}

		componentWillMount () {
			this.reqReject = axios.interceptors.request.use(request => {
				this.setState({eror:null});
				return request;
			});
			this.respReject = axios.interceptors.response.use( error => error, response => {
				this.setState({error: response});
			}); 
		}

		componentWillUnmount () {
			axios.interceptors.request.eject(this.reqReject);
			axios.interceptors.response.eject(this.respReject);
		}

		removeErrorMessage = () => {
			this.setState({error:null});
		}

		render() {
			return(<Aux>
				<Modal 
					show = {this.state.error} 
					cancelPurchase = {this.removeErrorMessage} >
					{ this.state.error ? this.state.error.message : null }
				</Modal>
				<WrappedElement {...this.props} />;
			</Aux>);
		}
	} 
}

export default ErrorHander ;