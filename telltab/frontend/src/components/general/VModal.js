import React from 'react';
import { Modal } from 'react-bootstrap';

class VModal extends React.Component {

	render() {
		return (
			<Modal
				id={this.props.ModalId}
				onHide={this.props.onHide}
				show={this.props.show}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						{this.props.title}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					{this.props.renderForm}
				</Modal.Body>

				<Modal.Footer>
					{this.props.renderFooter}
				</Modal.Footer>
			</Modal>
		);
	}
}

export default VModal;