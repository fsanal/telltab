import React from 'react';
import { connect } from 'react-redux';
import { retrieveProducts, editProduct, selectProduct, deleteProduct } from '../../actions/global_actions/Product_Actions';
import { getProductForum } from '../../actions/feedback_forum_actions/Forum_Actions';
import { getProductRoadmap } from '../../actions/roadmap_actions/RoadMap_Actions';
import { Link } from 'react-router-dom';


class Home extends React.Component {
    componentDidMount() {
        this.props.retrieveProducts();
    }

    handleSelectProduct(product) {
        this.props.selectProduct(product);
    }

    handleSelectProductRoadmap(product) {
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
                        <Link to = {`${product.name}/roadmap`} onClick = {() => {this.handleSelectProductRoadmap(product)}} >
                            <div>{product.name} Roadmap</div>
                        </Link>
                        <button onClick = {() => {this.handleDeleteProduct(product)}}>Delete</button>
                    </div>
                )
            })
        }
    }


    render() {
        return (
            <div>
                <div>
                    <Link to = "/login">
                        <button>Login</button>
                    </Link>
                    <Link to = "/signup">
                        <button>Signup</button>
                    </Link>
                    <Link to = "/logout">
                        <button>Logout</button>
                    </Link>
                </div>
                <Link to = "/create_product" >
                    <button>Create a Product</button>
                </Link>
                {this.renderList()}
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        currentProduct: state.productState.currentProduct,
        products: Object.values(state.productState.products)
    }
}

export default connect(mapStateToProps, { retrieveProducts, editProduct, 
    selectProduct, deleteProduct, getProductForum, getProductRoadmap })(Home);

