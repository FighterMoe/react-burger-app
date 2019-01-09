import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://react-burger-56833.firebaseio.com/'
});

export default instance;