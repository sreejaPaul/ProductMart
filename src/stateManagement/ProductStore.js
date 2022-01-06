import {createStore} from 'redux';
import ProductReducer from './ProductReducer'

const ProductStore = createStore(ProductReducer);

export default ProductStore;