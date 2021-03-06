import React, { Component } from 'react'
import { connect } from 'react-redux'

import { showModal } from '../../../actions/modals'

const mapStateToProps = state => {

	const { token } = state.authReducer
	return { token }

}

const mapDispatchToProps = dispatch => ({

	showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),

})

class EmployeeManagement extends Component {
	state = {
		workerSearch: '',
		myEmployees: []
	}

	async componentDidMount() {
		const { token } = this.props
		const getEmployeesFunctionReturn = await this.findMyEmployees(token)
		this.setState({
			myEmployees: getEmployeesFunctionReturn
		})
	}

	findMyEmployees = (token) => {
		return fetch('/employees/find_all', {
				headers:{
					'Content-Type': 'application/json',
					'x-access-token': token,
				},
				method: 'GET',
			})
			.then(response => response.ok ? response.json() : Promise.reject(response.statusText))
			.then(json => {
				return json
			})
			.catch(err => console.log(err))
	}

	renderEmployeeTableToDOM = () => {
		const { myEmployees } = this.state

		return myEmployees.map(employee => {
			const fullName = `${employee.firstName} ${employee.lastName}`
			if (employee.accountType === 'Terminal') return
			if (!this.state.workerSearch) {
				return(
					<tr onClick={() => this.props.showModal('OMNI_EMPLOYEE_MANAGEMENT_MODAL', {profileData: employee})}>
							<td> <img className='employee-avatar-image' src={employee.avatarURL}/> </td>
							<td> {fullName} </td>
							<td> {employee.phone} </td>
							<td> {employee.email} </td>
							<td> <img style={{height: 24, width: 24, cursor: 'pointer'}}  src={'/assets/icons/close.svg'} /> </td>
					</tr>
				)
			} else if (this.state.workerSearch) {
				if (fullName.toLowerCase().includes(this.state.workerSearch.toLowerCase())) {
					return(
						<tr onClick={() => this.props.showModal('OMNI_EMPLOYEE_MANAGEMENT_MODAL', {profileData: employee})}>
							<td> <img className='employee-avatar-image' src={employee.avatarURL}/> </td>
							<td> {fullName} </td>
							<td> {employee.phone} </td>
							<td> {employee.email} </td>
							<td> <img style={{height: 24, width: 24, cursor: 'pointer'}}  src={'/assets/icons/close.svg'} /> </td>
						</tr>
					)
				}
			}
		})
	}

	handleChange = (key, value) => {
		this.setState({
			[key]: value
		})
	}

	render() {
		return(
				<div className='action-column'>
					<div className='employee-actions-bar'>
						<div className='add-employee-button' onClick={() => this.props.showModal('AUTH_FORM_MODAL', {regpathOmniChild: true})}>
							<img className='admin-menu-icon' src='./assets/icons/add-user.svg' />
							Add Employee
						</div>
						<div className='admin-employee-search-bar-container'>
							<img className='admin-menu-icon' src='./assets/icons/worker.svg' />
							<input style={{flexGrow: 1}}type='text' value={this.state.workerSearch} onChange={(e) => this.handleChange('workerSearch', e.target.value)}/>
						</div>
					</div>
					<div className='employee-table-container'>
						<table className='employee-table'>
							<thead className='employee-table-head'>
								<tr>
									<td> Photo </td>
									<td> Name </td>
									<td> Phone </td>
									<td> Email </td>
									<td> Remove </td>
								</tr>
							</thead>
							<tbody className='omni-table-body'>
								{ this.state.myEmployees && this.renderEmployeeTableToDOM() }
							</tbody>
						</table>
					</div>
				</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeManagement)
