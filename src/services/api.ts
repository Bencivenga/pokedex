import {BASE_URL} from '../const';
import axios from 'axios';

export const api = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});
