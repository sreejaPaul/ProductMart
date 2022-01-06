import React, {useState, useEffect} from 'react';
import { data } from './data';
import SmallCard from './SmallCard';
import { Routes, Route, Link } from 'react-router-dom';
import Cart from './Cart';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import useProductStore from './stateManagement/useProductStore';

function App() {
  const {cartDetails} = useProductStore();
  const [cartSize, setCartSize] = useState(0);
  useEffect(()=>{
    setCartSize(cartDetails.length);
  },[cartDetails]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <div>
            <div className='flex'>
              <h1 className='font-bold flex-grow m-5 text-2xl'>Product Mart</h1>
              <Link to="/cart">
                <div className='m-5 flex'>
                  <ShoppingCartIcon className='h-6 z-10'/>
                  <div className='font-bold pl-2 pb-1 pr-2 -ml-2 mb-2 h-5 w-5 rounded-full bg-slate-400 text-white'>{cartSize}</div>
                </div>
              </Link>
            </div>
            <div className='md:flex'>
              {data.map((item, index) => (
                <SmallCard key={index} item={item} />
              ))}
            </div>
          </div>
        }
        />
        <Route path="/cart" element={
          <div>
            <Cart />
          </div>
        }
        />
      </Routes>
    </div>
  );
}

export default App;
