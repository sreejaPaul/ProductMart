import React, { useState, useEffect } from 'react';
import useProductStore from './stateManagement/useProductStore';
import { PlusIcon, MinusIcon, TrashIcon, HomeIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartDetails, increaseAmount, decreaseItem, removeItem, totalDiscount, totalOfferAmmount, totalCartValue, totalShopAmount } = useProductStore();
    const [cheeseDiscount, setCheeseDiscount] = useState("");
    const [breadDiscount, setBreadDiscount] = useState(0);
    const [butterDiscount, setButterDiscount] = useState(0);

    useEffect(() => {
        const itemNames = cartDetails.map((item) => {
            return item.name;
        })
        const cheeseItem = findItem('Cheese');
        const soupItem = findItem('Soup');
        const breadItem = findItem('Bread');
        const butterItem = findItem('Butter');

        if (itemNames.includes('Cheese')) {
            const cheeseNo = cheeseItem.countInCart;
            setCheeseDiscount("You Will Get " + cheeseNo + " Free Cheese");
        }else if(!itemNames.includes('Cheese')){
            setCheeseDiscount("");
        }

        if (itemNames.includes('Soup') && itemNames.includes('Bread')) {
            const soupNo = soupItem.countInCart;
            const breadNo = breadItem.countInCart;
            let savings = 0;
            if (soupNo >= breadNo) {
                savings = (breadItem.price / 2) * breadItem.countInCart;
            } else if (soupNo < breadNo) {
                savings = (breadItem.price / 2) * soupItem.countInCart;
            }
            setBreadDiscount(savings.toFixed(2));
        }else if(!itemNames.includes('Soup') || !itemNames.includes('Bread')){
            setBreadDiscount(0);
        }
        if (itemNames.includes('Butter')) {
            let off = (butterItem.price / 3) * butterItem.countInCart;
            setButterDiscount(off.toFixed(2));
        }else if(!itemNames.includes('Butter')){
            setButterDiscount(0);
        }
    }, [cartDetails]);

    const findItem = (itemName) => {
        const matchedItem = cartDetails.find((item) => {
            return item.name === itemName;
        })
        return matchedItem;
    }
    const offerRenderer = (item) => {
        switch (item.name) {
            case 'Cheese':
                return cheeseDiscount;
            case 'Bread':
                return breadDiscount;
            case 'Butter':
                return butterDiscount;
            default:
                return '';
        }
    }

    useEffect(() => {
        const totalDiscountCal = (parseFloat(butterDiscount) + parseFloat(breadDiscount));
        totalDiscount(totalDiscountCal);
    }, [cartDetails, butterDiscount, breadDiscount]);

    useEffect(() => {
        const total = cartDetails.reduce((acc, item) => {
            acc = acc + (item.price * item.countInCart);
            return acc;
        }, 0);
        totalCartValue(total);
    }, [cartDetails]);

    return (
        <div>
            <div className='flex'>
                <h1 className='flex-grow font-bold m-5 text-xl'>Cart</h1>
                <Link to="/">
                    <button className='rounded-full outline-none border-2 border-slate-700 m-3'>
                        <HomeIcon className='h-6 m-2' />
                    </button>
                </Link>
            </div>
            {(cartDetails.length > 0) ?
                <>
                    <div className='flex ml-5 md:flex md:ml-24'>
                        <div className='flex-grow font-bold m-5 mb-2 text-lg'>Product</div>
                        <div className='flex-grow font-bold m-5 mb-2 text-lg'>Single Price</div>
                        <div className='flex-grow font-bold m-5 mb-2 text-lg'>Quantity</div>
                        <div className='flex-grow font-bold m-5 mb-2 text-lg'>Total</div>
                    </div>
                    {cartDetails.map((item) => (
                        <div key={item.id} className='border-t-2 border-b-2 border-slate-400 p-10 m-2 md:border-t-2 md:border-b-2 md:border-slate-400 md:p-10 md:m-5'>
                            <div className='flex mb-4'>
                                <span className='flex-col flex-grow mr-15 md:flex-col md:flex-grow md:mr-24'>
                                    <img src={item.pic} alt={item.name + " Pic"} className='h-20 w-20 md:h-40 md:w-36' />
                                    <div className='font-bold w-28 ml-10'>{item.name}</div>
                                </span>
                                <div className='font-bold flex-grow w-10 md:font-bold md:flex-grow md:w-28'>{item.price}</div>
                                <div className='flex flex-grow w-15 md:flex md:flex-grow md:w-28'>
                                    <button onClick={() => increaseAmount(item)} className='border-2 border-slate-700 mr-4 ml-4 hover:bg-slate-200 h-8'><PlusIcon className='h-4 md:h-6' /></button>
                                    <div className='font-bold'>{item.countInCart}</div>
                                    {(item.countInCart > 1) ?
                                        <button onClick={() => decreaseItem(item)} className='border-2 border-slate-700 mr-4 ml-4 hover:bg-slate-200 h-8'><MinusIcon className='h-4 md:h-6' /></button> : ""}
                                    <button onClick={() => removeItem(item)} className='border-2 border-slate-700 mr-4 ml-4 hover:bg-slate-200 h-8'><TrashIcon className='h-4 md:h-6' /></button>
                                </div>
                                <div className='flex-col flex-grow w-10 font-bold md:flex-col md:flex-grow md:w-28 md:font-bold'>
                                    <div>{"Item Price : " + (item.price * item.countInCart)}</div>
                                    <div className='text-red-500'>{(offerRenderer(item) !== '') ? ((offerRenderer(item) !== 0) ? ("Discount : " + offerRenderer(item)):"") : ""}</div>
                                </div>
                            </div>
                            {console.log(typeof(offerRenderer(item)))}
                        </div>
                    ))}
                    <div className='float-right font-bold mr-20'>
                        <div>{"Total Amount : " + totalShopAmount}</div>
                        <div className='text-red-500 text-bold'>{"Offer Amount : " + totalOfferAmmount}</div>
                        <div>{"Amount To Pay : " + (totalShopAmount - totalOfferAmmount)}</div>
                    </div>
                </>
                : <div className='m-5 text-lg font-bold'>
                    {"No Item Present....Go Back To Home Page"}
                </div>
            }
            
        </div>
    )
}

export default Cart
