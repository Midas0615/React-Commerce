import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import { modalStyle } from '../config';
import { hideModal } from '../../actions/modals';
 
import { pushItemIntoShoppingCart } from '../../actions/shopping-cart'

import '../styles/ProductPage.css'

const mapDispatchToProps = dispatch => ({
	hideModal: () => dispatch(hideModal()),
	pushItemIntoShoppingCart: (token, itemID, requestedAmount, existingCountInCart) => dispatch(pushItemIntoShoppingCart(token, itemID, requestedAmount, existingCountInCart)),
})

const mapStateToProps = state => {
	const { token } = state.authReducer
	const { modalType, modalProps } = state.modalReducer
	const { shoppingCart } = state.shoppingCartReducer
	return { token, modalType, modalProps, shoppingCart }
}

class ConfirmCartModal extends Component {
	state = {
		requestedAmount: 1
	}
	
	handleChange = (input, value) => {
		if (value > 0) {
			this.setState({
				[input]: value
			})
		}
	}

	addItemToCart = (itemID) => {
		const { token, shoppingCart } = this.props
		let existingCountInCart = 0
		// WARNING: If we don't have a cached shopping cart, this check will fail and we will add too much to the cart. Could return a dispatch to fetch or just let failsafes take care of it
		if (shoppingCart.itemsBought.find(element => element.itemRef_id == itemID)) { 
			
			const itemIndex = shoppingCart.itemsBought.findIndex(element => element.itemRef_id == itemID)
			existingCountInCart = shoppingCart.itemsBought[itemIndex].numberRequested
			console.log(existingCountInCart);
		}
		return this.props.pushItemIntoShoppingCart(token, itemID, this.state.requestedAmount, existingCountInCart)
	}

	render() {
		const { item } = this.props
		return(
			<div>
				<Modal
					isOpen={this.props.modalType === 'CONFIRM_CART_ADDITION'}
					style={modalStyle}
					contentLabel="Example Modal"
					overlayClassName="Overlay"
					>
					<div className='item-preview-container'>
						<div className='product-image-container'>
							<img src={item.imageURL} />
						</div>

						<div className='item-details-container'>
							<h3> Confirm your Order! </h3>
							<h4> Confirm your purchase of {item.itemName} </h4>
							<input type='number' value={this.state.requestedAmount} onChange={e => this.handleChange('requestedAmount', e.target.value)} />
							<button onClick={() => this.addItemToCart(item._id)}>Add To Cart</button>

							<button onClick={() => this.props.hideModal()}> Cancel </button>
						</div>
					</div>

				</Modal>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCartModal)
