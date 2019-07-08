import React from 'react';
import { connect } from 'react-redux';
import { retrieveProducts, editProduct, selectProduct } from '../../actions/global_actions/Product_Actions';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class Home extends React.Component {
    componentDidMount() {
        this.props.retrieveProducts();
    }

    handleProductClick(product) {
        console.log("Entered Here");
        this.props.selectProduct(product);
    }

    renderList() {
        const { products } = this.props;
        if (products){
            return products.map(product => {
                return (
                    <Link to = {`/forum/${product.name}`} onClick = {() => {this.handleProductClick(product)}} >
                        <Card key = {product._id}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">{product.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                )
            })
        }
    }

    handle


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
    console.log(state.productState.currentProduct)
    return {
        currentProduct: state.productState.currentProduct,
        products: Object.values(state.productState.products)
    }
}

export default connect(mapStateToProps, { retrieveProducts, editProduct, 
    selectProduct })(Home);

