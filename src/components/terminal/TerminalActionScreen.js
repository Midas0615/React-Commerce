import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/TerminalActionScreen.css'

import { showModal } from '../../actions/modals'

import { 
	setVisibleCategory, 
	updateTransactionWithMenuItem, 
	updateTicketStatus, 
	updateTransactionWithSubdocRemoval 
} from '../../actions/tickets-transactions'

const mapStateToProps = state => {

	const { token, isAuthenticated } = state.authReducer
	const { menuItems, visibleCategory } = state.terminalItemsReducer 
	const { activeTicket } = state.ticketTrackingReducer

	return { token, menuItems, visibleCategory, isAuthenticated, activeTicket }

}

const mapDispatchToProps = dispatch => ({
	showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
	setVisibleCategory: (category) => dispatch(setVisibleCategory(category)),
	updateTransactionWithMenuItem: (token, itemId, ticketId) => dispatch(updateTransactionWithMenuItem(token, itemId, ticketId)),
	updateTicketStatus: (token, ticketId, status) => dispatch(updateTicketStatus(token, ticketId, status)),
	removeItemFromTicket: (token, subdocId, ticketId) => dispatch(updateTransactionWithSubdocRemoval(token, subdocId, ticketId)),
})

class TerminalActionScreen extends Component {
	state = {

	}

	// Category Selection Screen

	generateItemCategoryVisibilityMenu = () => {
		const { menuItems } = this.props

		return Object.keys(menuItems).map(category => {

			return <button key={category} onClick={() => this.props.setVisibleCategory(category)}> {category} </button>

		})
	}

	// Button Containers - Set to be Hidden or Visible by CSS Class

	generateCategoryContainersByVisibility = () => {
		const { menuItems, visibleCategory } = this.props

		return Object.keys(menuItems).map(category => {
			
			const classCheck = (visibleCategory == category) ? 'Show' : 'Hide'

			return <div key={category} className={`${classCheck} ${category}`}> {this.mapTerminalItemsToDOM()} </div> 
		
		})
	}

	// Menu Buttons

	mapTerminalItemsToDOM = category => {
		const { token, menuItems, activeTicket } = this.props

		menuItems[category].map(item => {
			return(
  				<div className="ui-pos-item" key={item._id} onClick={() => this.props.updateTransactionWithMenuItem(token, item._id, activeTicket._id)}>
  					<div className="ui-pos-item_image">
  						<img src={item.imageURL} />
  					</div>
  					<div className="ui-pos-item_content">
  						<div className="ui-pos-item-name">
							{item.itemName}
  						</div>
  						<div className="ui-pos-item-price">
  							{item.itemPrice}
  						</div>
  					</div>
				</div>				
			)
		})
	}

	// Ledger Rendering

	generateLedgerFromActiveTicket = () => {
		const { activeTicket, token } = this.props

		return activeTicket.items.map((item, index, array) => {
			if (index == array.length - 1) {
				return (
					<tr key={item._id}>
					 <td><button  color="black" onClick={() => this.props.removeItemFromTicket(token, item._id, activeTicket._id)}>Remove</button></td>
					 <td><button  color="black" onClick={() => this.props.showModal('CUSTOM_ADDON_MODAL', {})}>AddOn</button></td>
					 <td>{item.itemName}</td>
					 <td>${item.itemPrice}</td>
					</tr>
					)
			}
			return(
				<tr key={item._id}>
				 <td><button color="black" onClick={() => this.props.removeItemFromTicket(token, item._id, activeTicket._id)}>Remove</button></td>
				 <td></td>
				 <td>{item.itemName}</td>
				 <td>${item.itemPrice}</td>
				</tr>
			)
		})
	}

	displayPricingFromActiveTicket = () => {
		const { activeTicket, menuItems } = this.prop

		return(
			<div>
			<div> {`SubTotal: ${activeTicket.subTotal}`} </div>
			<div> {`Tax: ${activeTicket.tax}`} </div>
			<div> {`Total: ${activeTicket.total}`} </div>
			</div>
		)
	}

	render() {
		const { token, isAuthenticated, menuItems, visibleCategory, activeTicket } = this.props

		return(
			<div className='action-page-wrapper' >
					
				<div className='app-header__terminal-action'>
				</div>
					
				<div className='main-action-wrapper'>
					
					<div className='picker-column' >
						
						<div className='touchpad' >
								{ menuItems && activeTicket && this.generateCategoryContainersByVisibility() }
								{/* 
								<div className='action-buttons'>
									<button onClick={() => this.props.updateTicketStatus(token, activeTicket._id, "Active")}>Fire Ticket</button>
									<button onClick={() => this.props.updateTicketStatus(token, activeTicket._id, "Void")}>Void Ticket</button>
								<button onClick={() => this.props.updateTicketStatus(token, activeTicket._id, "Delivered")}>Order Delivered</button>
								<button onClick={() => this.props.showModal('CASH_PAYMENT_FORM', {})}>Pay With Cash</button>
								<button onClick={() => this.props.showModal('CARD_PAYMENT_FORM', {})}>Pay With Stripe</button>
									</div>
								*/}
						</div>

						<div className='category-selection-buttons' >
							{ menuItems && this.generateItemCategoryVisibilityMenu() }
						</div>
					</div>

								{ /* Need to switch classNames from DIVS to the Table elements */ }
						<div className='ledger'>
							<div className='table-container'>
								<table className='ledger-table'>
									<thead className='ledger-table__header'>
										<tr>
											<td> Item Name </td>
											<td> Price </td>
											<td> Remove </td>
											<td> Add-On </td>
										</tr>
									</thead>
									<tbody>
										{ activeTicket && this.generateLedgerFromActiveTicket() }
									</tbody>
								</table>
							</div>
							<div className='ledger-footer'>
								{ activeTicket && this.displayPricingFromActiveTicket() }
								<div className='footer-buttons-pricing'>
									<div className='action-button-container'>
										<div style={{ backgroundColor: 'blue', marginBottom: 10 }}className='action-button'> Fire Order </div>
										<div style={{ backgroundColor: 'red' }} className='action-button'> Void Ticket </div>
									</div>
									<div className='pricing-container'>
										<div> SubTotal </div>
										<div> Tax </div>
										<div> Total </div>
									</div>
								</div>

								<div className='checkout-button'>
									Payment
								</div>
							</div>
						</div>
				</div>

			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalActionScreen)