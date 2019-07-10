import React from 'react';
import { connect } from 'react-redux';
import { retrieveProducts, editProduct, selectProduct, deleteProduct } from '../../actions/global_actions/Product_Actions';
import { getProductForum } from '../../actions/feedback_forum_actions/Forum_Actions';
import { Link } from 'react-router-dom';


class Home extends React.Component {
    componentDidMount() {
        this.props.retrieveProducts();
    }
/*
    componentDidUpdate() {
        this.props.retrieveProducts();
    }
    */

    handleSelectProduct(product) {
        this.props.selectProduct(product);
    }

    handleDeleteProduct(product) {
        this.props.deleteProduct(product)
    }

    renderList() {
        const { products } = this.props;
        if (products){
            return products.map(product => {
                return (
                    <div key = {product._id}>
                        <Link to = {`${product.name}/forum`} onClick = {() => {this.handleSelectProduct(product)}} >
                            <div>{product.name}</div>
                        </Link>
                        <button onClick = {() => {this.handleDeleteProduct(product)}}>Delete</button>
                    </div>
                )
            })
        }
    }


    render() {
        return <div>
                    <Link to = "/create_product" >
                            <button>Create a Product</button>
                    </Link>
                    {this.renderList()}
               </div>
    }


}

const mapStateToProps = (state) => {
    return {
        currentProduct: state.productState.currentProduct,
        products: Object.values(state.productState.products)
    }
}

export default connect(mapStateToProps, { retrieveProducts, editProduct, 
    selectProduct, deleteProduct, getProductForum })(Home);

