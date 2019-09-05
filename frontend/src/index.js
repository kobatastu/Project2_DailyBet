import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ステートの値を作成
let state_value= {
    mycoin:0, 
    myemail:'',
    name:'',
    mypic:''
}
//レデューサーを作成
export function counter(state=state_value,action){
    switch (action.type){
        case 'ADD':
            return addReducer(state, action);
        case 'SUB':
            return subReducer(state, action);
        case 'EMAIL':
            return addEmail(state,action);
        case 'NAME':
            return addName(state,action);
        case 'MYPIC':
            return addMypic(state,action);
        default:
            return state;
    }
}

//追加のレデュース処理
function addReducer(state,action){
    let data = state.mycoin + action.bet;
    return {...state,mycoin:data}
}
//減少のレデュース処理
function subReducer(state,action){
    let data = state.mycoin - action.bet;
    return {...state,mycoin:data}
}
//メール追加のレデュース処理
function addEmail(state,action){
    let data = action.email;
    return {...state,myemail:data}
}
//名前追加のレデュース処理
function addName(state,action){
    let data = action.name;
    return {...state,name:data}
}
//写真追加のレデュース処理
function addMypic(state,action){
    let data = action.mypic;
    return {...state,mypic:data}
}
//追加のアクションクリエーター
export function addR(num){
    return {
        type:"ADD",
        bet:num
    }
}
//減少のアクションクリエーター
export function subR(num){
    return {
        type:"SUB",
        bet:num
    }
}
//メール追加のアクションクリエーター
export function addE(text){
    return {
        type:"EMAIL",
        email:text
    }
}
//名前追加のアクションクリエーター
export function addN(text){
    return {
        type:"NAME",
        name:text
    }
}
//写真追加のアクションクリエーター
export function addP(text){
    return {
        type:"MYPIC",
        mypic:text
    }
}

//ストアを作成
let store = createStore(counter);



ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
, document.getElementById('root'));



serviceWorker.unregister();
