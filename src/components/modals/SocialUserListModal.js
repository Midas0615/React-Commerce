import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import { modalStyle, modalStyleanim } from '../config';
import { hideModal } from '../../actions/modals';


const mapStateToProps = state => {
	const { modalType, modalProps } = state.modalReducer
		return { modalType, modalProps }
}

const mapDispatchToProps = dispatch => ({
	hideModal: () => dispatch(hideModal()),
})

const SocialUserListModal = props => {
	const { userArray, arrayUserType } = props
	const renderUsersToDOM = () => {
		if (userArray.length === 0) return <h5> This user has no {arrayUserType} </h5>
		return userArray.map(user => {
			return(
				<div className='user-social__user-container'>
					<div className='user-social__avatar-container'>
						<img style={{borderRadius:50}} src={user.avatarURL} />
					</div>
					<div className='user-social__name-container'>
						<h6> {user.name} </h6>
					</div>
				</div>
			)
		})
	}
	return(
		<div>
			<Modal
				isOpen={props.modalType === 'VIEW_USER_SOCIAL_DETAILS'}
				style={modalStyleanim}
				contentLabel="Example Modal"
				overlayClassName="Overlay"
				htmlOpenClassName='ReactModal__Html--open'
				shouldCloseOnOverlayClick={true}
				onRequestClose={() => props.hideModal()}
				>
				<React.Fragment>
				<div style={{textAlign: 'center', height: 'auto', padding: 25, maxHeight: 500, overflow: 'auto', maxWidth: 600}}>
					<div>
					<h4> {arrayUserType} </h4>
					{ renderUsersToDOM() }
					</div>
				</div>
				<button onClick={() => props.hideModal()}> Cancel </button>
				</React.Fragment>

			</Modal>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialUserListModal)