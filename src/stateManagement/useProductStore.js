import React from 'react';
import  {useSelector, useDispatch} from 'react-redux';
import ProductAction from './ProductAction';

const useProductStore =()=> {
    const cartDetails = useSelector(state => state.cart);
    const totalOfferAmmount = useSelector(state => state.totalDiscountAmount);
    const totalShopAmount = useSelector(state => state.totalCartAmount);

    const dispatch = useDispatch();
    const addItem = (item)=>{
        dispatch(ProductAction.addToCart(item));
    }
    const increaseAmount = (item)=>{
        dispatch(ProductAction.increamentItem(item));
    }
    const decreaseItem = (item)=>{
        dispatch(ProductAction.decreaseItem(item));
    }
    const removeItem = (item) => {
        dispatch(ProductAction.removeItem(item));
    }
    const totalDiscount = (amount) => {
        dispatch(ProductAction.totalDiscount(amount));
    }
    const totalCartValue = (amount) => {
        dispatch(ProductAction.totalCartAmount(amount));
    }
    return {
        cartDetails, addItem, increaseAmount, decreaseItem, removeItem, totalDiscount, totalOfferAmmount, totalCartValue, totalShopAmount
        }
    
}

export default useProductStore
