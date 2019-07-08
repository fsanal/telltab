import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    SELECT_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentProduct: null,
    products: {}
}

export default ( state = INITIAL_STATE, action ) => {
    const {products, currentProduct} = state;
    switch (action.type) {
        case CREATE_PRODUCT:
            products[action.payload._id] = action.payload;
            return { ...state, products }
        case RETRIEVE_PRODUCTS:
            return { ...state, products : _.mapKeys(action.payload, '_id') }
        case SELECT_PRODUCT:
            return { ...state, currentProduct: action.payload }
        case EDIT_PRODUCT:
            products[action.payload._id] = action.payload;
            return { ...state, products }
        default:
            return state;
    }
};