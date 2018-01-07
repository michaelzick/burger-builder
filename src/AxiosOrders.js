import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-2018.firebaseio.com/'
});

export default instance;
