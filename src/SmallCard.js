import React , {useEffect, useState} from 'react'
import useProductStore from './stateManagement/useProductStore';

const SmallCard = ({item}) => {
    const {cartDetails,addItem} = useProductStore();
    const [disable, setDisable] = useState(false);
    
    useEffect(()=>{
        const itemAdded = cartDetails.find((singleItem)=>{
            return singleItem.name === item.name;
        })
        if(itemAdded){
            setDisable(true);
        }else{
            setDisable(false);
        }
    },[cartDetails]);
    return (
        <div className='border-2 border-slate-700 p-10 m-10 ml-20 pl-20 md:border-2 md:border-slate-700 md:p-10 md:m-10 '>
            <img src={item.pic} alt={item.name + " Pic"} className='h-44 w-40 md:h-40 md:w-44'/>
            <h1>{"Product : " + item.name}</h1>
            <h3>{"Price : Rs. " + item.price}</h3>
            <button disabled={disable} onClick={()=>addItem(item)} className='border-2 border-slate-700 p-2 mt-5 ml-10 hover:bg-slate-200 md:border-2 md:border-slate-700 md:p-2 md:ml-5 md:hover:bg-slate-200 ' style={{cursor: disable?"no-drop":"pointer"}}>
                {disable ? "Item Added" : "Add To Cart"}
            </button>
        </div>
    )
}

export default SmallCard
