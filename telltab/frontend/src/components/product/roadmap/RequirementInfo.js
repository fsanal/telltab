import React from 'react';
import { connect } from 'react-redux';
import history from '../../../history';
import Modal from '../../general/Modal';
import { editRequirement, getRequirement, deleteRequirementTag } from '../../../actions/roadmap_actions/Requirement_Actions';
import { deleteTag } from '../../../actions/global_actions/Tag_Actions';
import styled from "styled-components";
import Comments from '../../Comment';

class RequirementInfo extends React.Component {
    constructor(){
        super();
        /*
        this.state = {
            requirement: null
        }
        */
        this.titleInput = React.createRef();
        this.bodyInput = React.createRef();
    }

    componentDidMount() {
        this.props.getRequirement(this.props.match.params.requirementID)
        /*
        .then(result => {
            this.setState({requirement: result})
        })
        */
    }

    handleDeleteTag = (tag) => {
        this.props.deleteRequirementTag(this.props.requirement._id, tag._id);
    }

    renderTags = (tags) => {
        return tags.map(tag => {
            return (
                <TagSubContainer>
                    <Tag key = {tag._id}>{tag.name}</Tag>
                    <Button width = "2.3rem" height = "2.3rem" onClick = {() => this.handleDeleteTag(tag)}>X</Button>
                </TagSubContainer>
            )
        })
    }

    editTitle(e) {
        if (e.target.value != this.props.requirement.title) {
            console.log(e.target.value);
            this.props.editRequirement(this.props.requirement._id, {title: e.target.value})
        }
    }

    editBody(e) {
        if (e.target.value != this.props.requirement.body) {
            this.props.editRequirement(this.props.requirement._id, {body: e.target.value})
        }
    }

    renderReqInfo() {
        const {title, body, author, tags} = this.props.requirement;
        return (
            <>
                <Container>
                    <InputContainer marginTop = "2rem">
                        <StyledInput ref={this.titleInput} onKeyPress = {(e) => {if (e.key === 'Enter') this.titleInput.current.blur();}} onBlur = {e => this.editTitle(e)}
                        spellCheck = "false" defaultValue = {title}/>
                    </InputContainer>
                    <SplitContainer>
                        <LeftContainer>
                            <AuthorContainer>
                                <i class="fas fa-user-circle"></i>
                                <Author>Faraz Sanal</Author>
                            </AuthorContainer>
                            <CreateHeader>Description:</CreateHeader>
                            <InputContainer marginTop = "0.5rem">
                                <StyledInput2 ref={this.bodyInput} onKeyPress = {(e) => {if (e.key === 'Enter') this.bodyInput.current.blur();}} onBlur = {e => this.editBody(e)} 
                                spellCheck = "false" type= "textarea" rows="1" cols="50" defaultValue = {body}/>
                            </InputContainer>
                        </LeftContainer>
                        <RightContainer>
                            {this.renderTags(tags)}
                        </RightContainer>
                    </SplitContainer>
                </Container>
            </>
        )
    }

    goBackToRoadmap() {
        history.push(window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/') - 2))
    }

    render(){
        if (!this.props.requirement) {
            return(
                <div>

                </div>
            )
        }
        return(
            <>
                <Modal show = {true} onDismiss = {this.goBackToRoadmap}
                height = "60rem" width = "100rem" renderContent = {this.renderReqInfo()}/>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        requirement: state.requirementState.requirements[ownProps.match.params.requirementID],
    }
}


export default connect(mapStateToProps, { editRequirement, getRequirement, deleteRequirementTag })(RequirementInfo)


const CreateHeader = styled.div`
    font-size: 2.5rem;
    margin-top: 5rem;
    color:  #172B4D;
    font-weight: 600;
    padding-left: 1.35rem;
`

const StyledInput = styled.input`
    font-size: 4rem;
    width: 92rem;
    height: 6rem;
    border: none;
    padding: 2rem;
    padding-left: 1rem;
    border-radius: 0.5rem;
    color: #172B4D;
    :focus {
        border: solid 0.2rem #3c40c6;
        background-color: white;
        outline: none;
    }

    :hover {
        background-color: #F4F5F7;
    }

    :focus:hover {
        background-color:white;
    }
    word-wrap: break-word;
`

const StyledInput2 = styled.textarea`
    spellcheck="false";
    font-size: 2rem;
    width: 60rem;
    height: 10rem;
    border: none;
    padding: 1rem;
    margin-left: 0.4rem;
    border-radius: 0.5rem;
    color: #172B4D;
    resize: none;
    background-color: #F4F5F7;

    :focus {
        border: solid 0.2rem #3c40c6;
        outline: none;
        background-color: white;
    }

    :focus:hover {
        background-color:white;
    }
`

const InputHeader = styled.div`
    font-size: 2rem;
    font-weight: 600;
`
const InputContainer = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-top: ${props => props.marginTop};
`
//   <Button width = "10rem" >
   // <Button width = "8rem">
const Button = styled.button`
    background-color:#3c40c6;
    color: white;
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: 2rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    :hover {
        background-color:#575fcf;
    }
    :focus {
        outline: 0;
        box-shadow: none!important;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 3rem;
    margin-right: 3rem;
`

const LeftContainer = styled.div`
    width: 65rem;
    margin-top: 2rem;
`
const RightContainer = styled.div`
    margin-left: 3rem;
    width: 40rem;
`

const SplitContainer = styled.div`
    display: flex;
`

const AuthorContainer = styled.div`
    margin-left: 1rem;
    font-size: 2.5rem;
    height: 4rem;

    
`

const Author = styled.span`
    vertical-align: middle;
    line-height: 4rem;
    margin-left: 1rem;
    color: #172B4D;
`

const TagContainer = styled.div`
    margin-top: 1rem;
`

const TagSubContainer = styled.div`
    border: #DADCE0 1px solid;
    margin-right: 0.5rem;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 3rem;
    height: 3rem;
    margin-top: 1rem;
`

const Tag = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    
    display: inline-block;
    font-size: 2rem;
    text-align: center;
`
