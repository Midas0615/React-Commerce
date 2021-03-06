import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import MediaQuery from 'react-responsive'

import { routeToNode } from '../../actions/routing'
import { fetchMenuItems } from '../../actions/terminalItems'
import { fetchTickets, fetchCurrentTicketDetails } from '../../actions/tickets-transactions'
import { fetchLoggedUsers } from '../../actions/employees'
import { showModal } from '../../actions/modals'

import ModalRoot from '../ModalRoot'

import  '../styles/OmniTerminal.css'

const mapStateToProps = (state) => {
	const { isAuthenticated, token } = state.authReducer;
	const { menuItems, visibleCategory } = state.terminalItemsReducer;
	const { tickets, activeTicket } = state.ticketTrackingReducer; 
	const { loggedInUsers } = state.employeeReducer

	return { isAuthenticated, token, menuItems, visibleCategory, tickets, activeTicket, loggedInUsers }
}


const mapDispatchToProps = (dispatch) => ({
	fetchMenuItems: (token) => dispatch(fetchMenuItems(token)),
	fetchTickets: (token) => dispatch(fetchTickets(token)),
	fetchLoggedUsers: (token) => dispatch(fetchLoggedUsers(token)),
	showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
	routeToNode: (node) => dispatch(routeToNode(node))
})

class OmniTerminal extends Component {

	componentDidMount() {
		const { token } = this.props;

		this.props.fetchMenuItems(token);
		this.props.fetchTickets(token);
		this.props.fetchLoggedUsers(token);
	}

	mapTicketsToDOMByStatus = ticketStatus => {
		const { tickets, token } = this.props
		return tickets[ticketStatus].map(ticket => {
			return(
				<tr 
					key={ticket._id} 
					onClick={() => {
						fetchCurrentTicketDetails(token, ticket._id)}
					}
				>
					<td> {ticket.status} </td>
					<td> {ticket.createdBy} </td>
					<td> {moment(ticket.createdAt).format('h:mm:ss a')} </td>
					<td> $ {ticket.total} </td>
				</tr>
			)
		})
	}

	generateTicketStatusMappings = () => {
		const { tickets } = this.props
		return(Object.keys(tickets).map(ticketStatus => {
			return( this.mapTicketsToDOMByStatus(ticketStatus) )
		}))
	}

	calculateGross = (tickets) => {
		return `$${tickets.map(ticket => ticket.subTotalReal)
		.reduce((acc, cur) => acc + cur)}`
	}
	render() {
		const { tickets } = this.props
		return(
		<React.Fragment>
			<MediaQuery minWidth={2} maxWidth={798}>
				<div className='mobile-terminal-wrapper'>
					<ModalRoot />
					<div className='mobile-terminal__header'>
						<h6> Mobile Terminal Wireframe </h6>
					</div>
					<div className='mobile-terminal__body'>
						<div className='mobile-terminal__button-row-container'>
							<button className='button' onClick={() => this.props.showModal('EMPLOYEE_PUNCH_CLOCK_FORM_MODAL', {formSelector: "Clock In"})}> Clock In </button>
							<button className='button' onClick={() => this.props.showModal('EMPLOYEE_PUNCH_CLOCK_FORM_MODAL', {formSelector: "Clock Out"})}> Clock Out </button>
						</div>
						<div className='mobile-terminal__button-row-container'>
							<button className='button' onClick={() => this.props.showModal('DISPLAY_ALL_TRANSACTIONS', {})}> See All Transactions </button>
							<button className='button' onClick={() => this.props.routeToNode('/omni/terminal/modifyItems')}> Modify Items </button>
						</div>
						<div className='mobile-terminal__button-row-container'>
							<button className='button' onClick={() => this.props.showModal('SELECT_EMPLOYEE_OPENING_TICKET', {})}> New Ticket </button>
							<button className='button' onClick={() => this.props.showModal('CONFIRM_END_OF_BUSINESS_DAY', {})}> Close Out </button>
						</div>
					</div>
				</div>
			</MediaQuery> 
			<MediaQuery minWidth={799}>
				<div className='page-wrapper'>
					<ModalRoot />
					<div className='omni-terminal__centered-rectangle' >
						<div className='row-1-big'>
							<div className='mainframe-container'>
								<div className='graph' >
											<table style={{width: '100%'}}>
												<thead className='terminal-table-display__header'>
													<tr>
														<th> Ticket Status </th>
														<th> Created By </th>
														<th> Time Created </th>
														<th> Total Charge </th>
													</tr>
												</thead>
												<tbody>
													{ tickets && this.generateTicketStatusMappings() }
												</tbody>
											</table>
								</div>
								{ (tickets) &&
									<div className='row__statistics'>
										<div className='terminal-statistics-box'>
											<h5> Open Tickets </h5>
											{ (tickets['Open']) && <h3> {tickets['Open'].length} </h3> }
										</div>
										<div className='terminal-statistics-box'>
											<h5> Voids </h5>
											{ (tickets['Void']) && <h3> {tickets['Void'].length} </h3> }
										</div>
										<div className='terminal-statistics-box'>
											<h5> Paid Tickets </h5>
											{ (tickets['Paid']) && <h3> {tickets['Paid'].length} </h3> }
										</div>
										<div className='terminal-statistics-box'>
											<h5> Gross Sales </h5>
											{ (tickets['Paid']) && <h3> { this.calculateGross(tickets['Paid']) } </h3> } 
										</div>
									</div>
								}
							</div> 
							<div className='foursquare-container'>
								<div className='row__buttons'>
									<div className='button' onClick={() => this.props.showModal('EMPLOYEE_PUNCH_CLOCK_FORM_MODAL', {formSelector: "Clock In"})}>
										Clock In
									</div>
									<div className='button' onClick={() => this.props.showModal('EMPLOYEE_PUNCH_CLOCK_FORM_MODAL', {formSelector: "Clock Out"})}>
										Clock Out
									</div>
								</div>
								<div className='row__buttons'>
									<div className='button' onClick={() => this.props.showModal('DATABASE_INTERFACE_MODAL', { module:'Omni', action: 'upload' })}>
										Add New Item
									</div>
									<div className='button' onClick={() => this.props.routeToNode('/omni/terminal/modifyItems')} >
										Modify Items
									</div>
								</div>
							</div>
						</div>
						<div className='row-2'>
							<div className='button__lower' onClick={() => this.props.showModal('SELECT_EMPLOYEE_OPENING_TICKET', {})}>
								New Transaction
							</div>
							<div className='button__lower' onClick={() => this.props.showModal('DISPLAY_ALL_TRANSACTIONS', {})}>
								View Transactions
							</div>
							<div className='button__lower' onClick={() => this.props.showModal('CONFIRM_END_OF_BUSINESS_DAY', {})}>
								Generate Sales Report
							</div>
						</div>
					</div>
				</div>
			</MediaQuery>
		</React.Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OmniTerminal)