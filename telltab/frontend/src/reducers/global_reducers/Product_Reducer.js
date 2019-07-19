import {
    GET_PRODUCT,
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    SELECT_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT
} from '../../actions/types/global_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentProduct: null,
    products: {}
}

export default ( state = INITIAL_STATE, action ) => {
    let {products, currentProduct} = state;
    switch (action.type) {
        case GET_PRODUCT:
            products[action.payload._id] = action.payload;
            return { ...state, products}
        case CREATE_PRODUCT:
            currentProduct = action.payload;
            products[action.payload._id] = action.payload;
            return { ...state, products, currentProduct }
        case RETRIEVE_PRODUCTS:
            return { ...state, products : _.mapKeys(action.payload, '_id') }
        case SELECT_PRODUCT:
            return { ...state, currentProduct: action.payload }
        case EDIT_PRODUCT:
            products[action.payload._id] = action.payload;
            return { ...state, products }
        case DELETE_PRODUCT:
            products = _.omit(products, action.payload._id);
            return { ...state, products }
        default:
            return state;
    }
};