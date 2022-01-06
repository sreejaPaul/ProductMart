import React from 'react';
import ProductConstant from './ProductConstant';

const ProductAction = {
    addToCart: (item) => {
                return {
                        type: ProductConstant.ADD_PRODUCT,
                        payload: item
                    }
    },
    increamentItem: (item)=>{
        return {
            type: ProductConstant.INCREASE_COUNT,
            payload: item
        }
    },
    decreaseItem: (item)=>{
        return{
            type: ProductConstant.DECREASE_COUNT,
            payload: item
        }
    },
    removeItem: (item)=>{
        return{
            type: ProductConstant.REMOVE_FROM_CART,
            payload: item
        }
    },
    totalDiscount: (amount)=>{
        return{
            type: ProductConstant.GET_TOTAL_DISCOUNT,
            payload: amount
        }
    },
    totalCartAmount: (amount)=>{
        return{
            type: ProductConstant.GET_TOTAL_AMOUNT,
            payload: amount
        }
    }
}

export default ProductAction
