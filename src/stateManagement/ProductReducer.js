import React from 'react';
import ProductConstant from './ProductConstant';

const initialState = { 
    cart:[],
    totalDiscountAmount: 0,
    totalCartAmount: 0,
};
const ProductReducer = (state = initialState , action) => {
    switch(action.type){
        case ProductConstant.ADD_PRODUCT :
            const item = action.payload;
            const itemInCart = state.cart;
            const presentItem = state.cart.find((singleItem)=>{
                return singleItem.id === item.id;
            }) 
            const index = itemInCart.indexOf(presentItem);
            if(presentItem){
                item.countInCart = item.countInCart + 1;
                itemInCart.splice(index,1,item);
            }else{
                item.countInCart = 1;
                itemInCart.push(item);
            }
            return{
                ...state,
                cart: [...itemInCart]
            }
        case ProductConstant.INCREASE_COUNT:
            const selectedItem = state.cart.find((singleItem)=>{
                return singleItem.id === action.payload.id;
            }) 
            const indexOfItem = state.cart.indexOf(selectedItem);
            selectedItem.countInCart = selectedItem.countInCart+1;
            state.cart.splice(indexOfItem,1,selectedItem);
            return{
                ...state,
                cart: [...state.cart]
            }
        case ProductConstant.DECREASE_COUNT:
            const ClickedItem = state.cart.find((singleItem)=>{
                return singleItem.id === action.payload.id;
            }) 
            const indexItem = state.cart.indexOf(ClickedItem);
            ClickedItem.countInCart = ClickedItem.countInCart - 1;
            state.cart.splice(indexItem,1,ClickedItem);
            return{
                ...state,
                cart: [...state.cart]
            }
        case ProductConstant.REMOVE_FROM_CART:
            const willRemove = state.cart.find((singleItem)=>{
                return singleItem.id === action.payload.id;
            })
            const indexOfRemove = state.cart.indexOf(willRemove);
            state.cart.splice(indexOfRemove,1);
            return{
                ...state,
                cart: [...state.cart]
            }
        case ProductConstant.GET_TOTAL_DISCOUNT:
            return{
                ...state,
                totalDiscountAmount: action.payload
            }
        case ProductConstant.GET_TOTAL_AMOUNT:
            return{
                ...state,
                totalCartAmount: action.payload
            }
        default:
            return state;
    }
}

export default ProductReducer;
