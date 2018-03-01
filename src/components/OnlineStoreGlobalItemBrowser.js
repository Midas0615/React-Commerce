import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Image, Button, Icon } from 'semantic-ui-react'

import { retrieveAllItemsForSale, retrieveItemById, pushItemIntoShoppingCart } from '../actions/marketplaces'
import { showModal } from '../actions/modals'


import CartInvalidationAlert from './CartInvalidationAlert'
import TagFilterSearch from './TagFilterSearch'

function mapStateToProps(state) {
	const { token } = state.authReducer
	const { marketplaceItems, currentMarketplaceItem } = state.marketplaceItemsReducer
	
 
	return { token, marketplaceItems, currentMarketplaceItem }
}

class OnlineStoreGlobalItemBrowser extends Component {
	constructor(props) {
		super(props)
		this.renderMarketplaceItems = this.renderMarketplaceItems.bind(this)
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(retrieveAllItemsForSale())
	}


	renderMarketplaceItems() {
		// Placeholder function to mock styling for real data to be retrieved from API
		const { marketplaceItems } = this.props
		return marketplaceItems.map(item => {
			return (<div className="ui_card_mockup">
						<div className='ui_card_image'>
							<img src={item.imageURL} />
						</div>
						<div className='ui_card_content'>
							<h3 className="StoreItem-Header-Name"> {item.itemName} </h3>
							<p className="stock-count"> In Stock: {item.numberInStock} </p>
							<p className="store-pricing"> ${item.itemPrice} </p>
							<Button className="button_no_border_radius" fluid><Icon name='add to cart' /> Add To Cart </Button>
						</div>
					</div>
					)

		})
	}

	/*
	generateItemPreviews() {
		const { marketplaceItems } = this.props
		return marketplaceItems.map(item => {
			return(
				<div>
					<div 
						key={item._id}
						onClick={this.bringCurrentItemIntoFocus.bind(this, item._id)}>
							{item.itemName}
					</div>
					<button 
						onClick={this.confirmOrder.bind(this, item._id)}>
							Add Item To Cart
					</button>
				</div>
			)
		})
	}
	*/



	confirmOrder(itemId){
		const { dispatch } = this.props
		dispatch(retrieveItemById(itemId))
		dispatch(showModal('CONFIRM_CART_ADDITION', {}))
	}

	bringCurrentItemIntoFocus(itemId) {
		const { dispatch } = this.props
		dispatch(retrieveItemById(itemId))

	}

	render() {
		const { marketplaceItems } = this.props
		// If the modal backdrop is not wide enough, we will have to move this to the overview component and pass down an onclick thru props down to this to show the proper modal
		return(
			<div className='itemBrowserWrapper'>
				<div className='cardViewerWrapper'>
					{ marketplaceItems && this.renderMarketplaceItems() }
				</div>
			</div>

		)
	}
}

export default connect(mapStateToProps)(OnlineStoreGlobalItemBrowser)