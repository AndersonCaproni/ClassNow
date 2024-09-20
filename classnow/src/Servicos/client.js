import axios from 'axios';

export const HTTPClient = axios.create({
    baseURL: 'http://192.168.1.9:5282',
     headers: {
    'Access-Controll-Allow-Origins': '*',
    'Access-Controll-Allow-Headers': 'Authorization',
    'Access-Controll-Allow-Methods': 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
    'Content-Type': 'application/json;charset=UTF-8',
}})