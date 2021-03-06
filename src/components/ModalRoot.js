/*

The approach towards this component was derived from a post by Redux Author Dan Abramov on StackOverflow seen here:

By abstracting the state of which Modal Type needs to be displayed away from conditional rendering from JSX into redux, programatically managing
a modal-heavy application becomes trivial. The approach is seen here:

https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions

An even more involved approach can be seen here, authored by Redux maintainer Mark Erikson:

https://blog.isquaredsoftware.com/2017/07/practical-redux-part-10-managing-modals/

*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

import RegistrationPickerModal from './modals/RegistrationPickerModal'
import AuthModal from './modals/AuthModal'
import RegistrationConfirmationModal from './modals/RegistrationConfirmationModal'
import ImagePreviewModal from './modals/ImagePreviewModal'

import EmployeePunchClockFormModal from './modals/EmployeePunchClockFormModal'
import WaiterCallScreenModal from './modals/WaiterCallScreenModal'

import AddTerminalItemModal from './modals/AddTerminalItemModal'
import TransactionHistoryModal  from './modals/TransactionHistoryModal'

import EssosCardPaymentModal from './modals/EssosCardPaymentModal'
import CashPaymentModal  from './modals/CashPaymentModal'
import CardPaymentModal from './modals/CardPaymentModal'

import CustomAddonModal from './modals/CustomAddonModal'

import ConfirmCartModal from './modals/ConfirmCartModal'
import CartSuccessModal from './modals/CartSuccessModal'
import CartInvalidationModal from './modals/CartInvalidationModal'

import ConfirmSalesReportAggregationModal from './modals/ConfirmSalesReportAggregationModal'
import SalesAggregationSuccessModal from './modals/SalesAggregationSuccessModal'

import PaymentTypeSelectionModal from './modals/PaymentTypeSelectionModal'

import DatabaseInterfaceModal from './modals/DatabaseInterfaceModal'
import UploadSuccessModal from './modals/UploadSuccessModal'

import AddReviewModal from './modals/AddReviewModal'
import ReviewSuccessModal from './modals/ReviewSuccessModal'
import SocialUserListModal from './modals/SocialUserListModal'
import UserWishlistPreviewPreview from './modals/UserWishlistPreviewPreview'
import ReviewListModal from './modals/ReviewListModal'

import AuthenticationForm from './forms/registration/AuthenticationForm'

import ConfirmDeletionModal from './modals/ConfirmDeletionModal'

import EssosProfileModificationModal from './modals/EssosProfileModificationModal'

import OmniProfileModificationModal from './modals/OmniProfileModificationModal'

const MODAL_COMPONENTS = {
	'REGISTRATION_MODULE_PICKER': RegistrationPickerModal,
	'AUTH_FORM_MODAL': AuthModal,
	'REGISTRATION_CONFIRMATION_MODAL': RegistrationConfirmationModal,
	'IMAGE_PREVIEW_MODAL': ImagePreviewModal,
	'EMPLOYEE_PUNCH_CLOCK_FORM_MODAL': EmployeePunchClockFormModal,
	'ADD_POINT_SALE_ITEM': AddTerminalItemModal,
	'DISPLAY_ALL_TRANSACTIONS': TransactionHistoryModal, 
	'SELECT_EMPLOYEE_OPENING_TICKET': WaiterCallScreenModal, 


	'CASH_PAYMENT_MODAL': CashPaymentModal, // Gets CashPaymentForm
	'CARD_PAYMENT_MODAL': CardPaymentModal, // Gets Checkout
	'CUSTOM_ADDON_MODAL': CustomAddonModal,

	'ADD_EMPLOYEE_MODAL': AuthenticationForm, // Deprecated

	
	'CONFIRM_END_OF_BUSINESS_DAY': ConfirmSalesReportAggregationModal,
	'END_OF_BUSINESS_DAY_SUCCESS': SalesAggregationSuccessModal,

	'MODIFY_ESSOS_PROFILE_SETTINGS': EssosProfileModificationModal,
	'OMNI_EMPLOYEE_MANAGEMENT_MODAL': OmniProfileModificationModal,

	'CONFIRM_CART_ADDITION': ConfirmCartModal,
	'CART_ADDITION_SUCCESS_MODAL': CartSuccessModal,
	'CART_INVALIDATION_MODAL': CartInvalidationModal,
	'ONLINE_STORE_STRIPE_CHECKOUT': EssosCardPaymentModal,

	'VIEW_USER_SOCIAL_DETAILS': SocialUserListModal,
	'VIEW_USER_WISHLIST': UserWishlistPreviewPreview,

	'ADD_REVIEW_MODAL': AddReviewModal,
	'ADD_REVIEW_SUCCESS_MODAL': ReviewSuccessModal,
	'VIEW_REVIEWS_MODAL':ReviewListModal,
	
	'CASH_OR_CARD_MODAL': PaymentTypeSelectionModal,

	'DATABASE_INTERFACE_MODAL': DatabaseInterfaceModal,
	'SHOW_ITEM_UPLOAD_SUCCESS_MODAL': UploadSuccessModal,

	'CONFIRM_DELETE_MODAL': ConfirmDeletionModal,
}


const mapStateToProps = (state) => {
	const { modalType, modalProps } = state.modalReducer
	return { modalType, modalProps}
}

class ModalRoot extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	render() {
		const { modalType, modalProps } = this.props
		
		if (!modalType) return null
		
		const SpecificModal = MODAL_COMPONENTS[modalType]
		
		return(
			<SpecificModal {...modalProps} />
		) 
	}

}

export default connect(mapStateToProps)(ModalRoot)