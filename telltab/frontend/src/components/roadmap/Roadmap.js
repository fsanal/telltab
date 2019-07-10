import React from 'react';
import { connect } from 'react-redux';
import { createRoadmap, selectRoadmap, editRoadmap,
        deleteRoadmap, retrieveRoadmaps } from '../../actions/roadmap_actions/RoadMap_Actions';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class Roadmap extends React.Component {
    componentDidMount() {
        const promise = this.props.getProductForum();
        promise.then(this.props.retrievePosts());
    }

    render() {
        return(
            <div>
                    <Link to = "/" >
                            <button>Create a Product</button>
                    </Link>
                    {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.roadmapState.currentRoadmap)
    return {
        currentRoadmap: state.roadmapState.currentRoadmap,
        products: Object.values(state.roadmapState.roadmaps)
    }
}

export default connect(mapStateToProps, { retrieveRoadmaps, editRoadmap, selectRoadmap })(Roadmap);

