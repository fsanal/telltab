import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Field } from 'redux-form';

class SingleField extends React.Component {

    render() {
        return (
            <Form onSubmit={this.props.onSubmit}>
                <Form.Group controlId="formGeneralInput">
                    <Form.Label>{this.props.title}</Form.Label>
                    <Field name={this.props.name} component={this.props.renderInput} placeholder={this.props.description}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {this.props.submitText}
                </Button>
            </Form>
        );
    }
}

export default SingleField;