import React from 'react';
import { connect } from 'react-redux';
import { retrieveProducts, editProduct, selectProduct, createProduct } from '../../actions/Product_Actions';
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
        console.log("Entered Here")
        this.props.retrieveProducts();
    }
/*
    renderList() {
        const { products } = this.props.productState;
        return products.map(product => {
            return (
                <div>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{product.name}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            )
        })
    }
*/
    render() {
        return <div></div>
    }



}

const mapStateToProps = (state) => {
    return {
        productState: Object.values(state.productState)
    }
}

export default connect(mapStateToProps, { retrieveProducts, editProduct, 
    selectProduct, createProduct })(Home);

