import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://react-my-burger-gragral.firebaseio.com'
});

export default instance;