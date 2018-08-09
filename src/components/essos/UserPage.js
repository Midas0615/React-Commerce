import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/UserPage.css'

const filterItemsBySeller = (items, sellerID) => {
	// This fails if we do not ensure that the entire DB is loaded. If we refresh the page while the state is cleared (reset app and go straight to page without ladoing main essos splash) - it is empty
	return items.filter(item => item.sellerRef_id == sellerID)
}

const mapStateToProps = (state, ownprops) => {
	const { marketplaceItems } = state.marketplaceItemsReducer
	console.log("Listing OwnProps in MapState of UserPage: ", ownprops)
	return {
		sellerItems: filterItemsBySeller(marketplaceItems, ownprops.match.params.id)
	}
}

class UserPage extends Component {
	state = {
		loading: true,
		userFullName: '',
		userAvatarURL: '',
	}

	generateItemDOM = () => {
		
		const { sellerItems } = this.props

		return sellerItems.map(item => {
			return (
				<div className="ui_card_mockup">
					<div className='ui_card_image'>
						<img src={item.imageURL} />
					</div>
					<div className='ui_card_content'>
						<h3 className="StoreItem-Header-Name"> {item.itemName} </h3>
						<p className="store-link" onClick={() => this.props.routeToMarketplace(`/essos/user/${item._sellerRef_id}`)}> Posted By: {item.postedBy} </p>
						<p className="store-pricing"> ${item.itemPrice} </p>
						<button className="button_no_border_radius" ><span> Add To Cart Icon </span> </button>
					</div>
				</div>
			)
		})
	}
	
	render() {
		const { sellerItems } = this.props
		console.log(this.props)
		return (
			<div className='user-page-wrapper'>
				<div className='main-user-header'>
					<div className='user-social-container' >
						<div className='user-avatar'>
						</div>
						<div className='user-name-blurb' />
						<div className='user-social-stats' />
					</div>
					<div className='user-menu-control-panel'>
					</div>
				</div>
				<div className='user-content-wrapper'>
					{ sellerItems && this.generateItemDOM() }
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(UserPage)