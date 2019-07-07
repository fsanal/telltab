import { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveProducts, editProduct, selectProduct, createProduct } from '../../actions/Product_Actions';

class Home extends Component {
    componentDidMount() {
        this.props.retrieveProducts();
    }

    renderList() {
        const { products } = this.props.productState;
        return products.map(product => {
            return <Post key = {feedback.feedbackId} votes = {feedback.votes}
            name = {feedback.name} id = {feedback.feedbackId} title = {feedback.title} content = {feedback.content} />
        })
    }


}

const mapStateToProps = (state) => {
    return {
        productState: Object.values(state.productState)
    }
}

export default connect(mapStateToProps, { retrieveProducts, editProduct, 
    selectProduct, createProduct })

