import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TagMap } from '../config';

import '../styles/UploadItemForm.css'

import { modifyOmniTerminalItem, createNewMenuItem } from '../../actions/terminalItems'
import { updateMarketplaceItem, postEssosItem } from '../../actions/marketplace'
import { showModal } from '../../actions/modals'



const initialState = {
	itemName: '',
	itemPrice: '',
	imageSource: null,
	imageRAWFILE: null,
	description: '',
	category: '',
	tags: [],
	newImageFlag: false,
	// options: [],
}

const mapStateToProps = state => {
	const { token } = state.authReducer
	return { token }
}
const mapDispatchToProps = dispatch => ({
	showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
	modifyOmniItem: (token, itemID, data, imageHandler) => {
		dispatch(modifyOmniTerminalItem(token, itemID, data, imageHandler))
	},
	modifyEssosItem: (token, itemID, data, imageHandler) => {
		dispatch(updateMarketplaceItem(token, itemID, data, imageHandler))
	},
	uploadOmniItem: (token, data, imageFile) => {
		dispatch(createNewMenuItem(token, data, imageFile))
	},
	uploadEssosItem: (token, data, imageFile) => {
		dispatch(postEssosItem(token, data, imageFile))
	},
})

class UploadItemForm extends Component {
	state = initialState

	componentDidMount() {
		//const { itemName, itemPrice, category, imageURL, numberInStock, tags } = this.props.modifyItemAttributes
		console.log(this.props)
		console.log(this.state)
		if (this.props.action === 'modify') {
			switch(this.props.module) {
				case('Omni'):
					return this.setState({
						itemName: this.props.modifyItemAttributes.itemName,
						itemPrice: this.props.modifyItemAttributes.itemPrice,
						category: this.props.modifyItemAttributes.category,
						imageSource: this.props.modifyItemAttributes.imageURL, 
					})
				case('Essos'):
					return this.setState({
						itemName: this.props.modifyItemAttributes.itemName,
						itemPrice: this.props.modifyItemAttributes. itemPrice,
						numberInStock: this.props.modifyItemAttributes.numberInStock,
						imageSource: this.props.modifyItemAttributes.imageURL,
						description: this.props.modifyItemAttributes.description,
						tags: this.props.modifyItemAttributes.tags
					})
			}
		}
	}
	
	handleChange = (key, value) => {
		console.log("Trying to Set key to value", key, value)
		this.setState({
			[key]: value
		})
	}

	/*
	addOption = () => {
		if (this.state.options.length < 2) {
			return this.setState({
				options: [...this.state.options, {
					optionType: ''
					optionChoices: [{
						choiceName: '',
						choiceStock: 0,
					}],
				}]
			})
		}
	}


	renderOptionConfiguration = () => {
		if (this.state.options.length > 0) return this.state.options.map((option, index) => {
			return(
				<div>
					<input 
						type='text'
						value={this.state.options}
						onChange={(event) => this.handleChange(``)}
						/>
				</div>
			)
		})
	}

	*/

	handleTagChange(tagName){
		if (!this.state.tags.includes(tagName)) {
			this.setState({
				tags: this.state.tags.concat([tagName])	
			})
		}
		if (this.state.tags.includes(tagName)) {
			this.setState({
				tags: this.state.tags.filter(item => item !== tagName)
			})
		}
	}

	imageSelectedHandler = (event) => {
		const blobURL = URL.createObjectURL(event.target.files[0])
		this.setState({
			imageSource: blobURL,
			imageRAWFILE: event.target.files[0],
			newImageFlag: true
		})
	}


	handleSubmit = (event) => {
		event.preventDefault()
		const { token } = this.props
		switch(this.props.module) {
			case('Omni'): {
				switch(this.props.action){
					case('modify'):
						return this.handleOmniModification(token)
					case('upload'):
						return this.handleOmniUpload(token)
				}
			}
			case('Essos'): {
				switch(this.props.action) {
					case('modify'):
						return this.handleEssosModification(token)
					case('upload'):
						return this.handleEssosUpload(token)
				}
			}
		}

	}



	handleOmniModification = (token) => {
		const { itemName, itemPrice, category, imageSource, newImageFlag, imageRAWFILE } = this.state
		const { _id } = this.props.modifyItemAttributes
		const data = {
			itemName,
			itemPrice,
			category
		}
		const imageHandler = {
			newImageFlag,
			imageSource: imageRAWFILE
		}
		this.props.modifyOmniItem(token, _id, data, imageHandler)
	}

	handleOmniUpload = (token) => {
		if (this.state.imageSource === null) return console.log("Please upload an image.")
		const { itemName, itemPrice, category, imageSource, imageRAWFILE } = this.state
		const data = {
			itemName,
			itemPrice,
			category
		}
		this.props.uploadOmniItem(token, data, imageRAWFILE)
	}

	handleEssosModification = (token) => {
		const { itemName, itemPrice, numberInStock, description, tags, imageSource, newImageFlag, imageRAWFILE } = this.state
		const { _id } = this.props.modifyItemAttributes
		const data = {
			itemName,
			itemPrice,
			numberInStock,
			description,
			tags,
		}
		const imageHandler = {
			newImageFlag,
			imageSource: imageRAWFILE
		}
		this.props.modifyEssosItem(token, _id, data, imageHandler)
	}

	handleEssosUpload = (token) => {
		const { itemName, itemPrice, numberInStock, description, tags, imageSource, newImageFlag, imageRAWFILE } = this.state
		const data = {
			itemName,
			itemPrice,
			numberInStock,
			description,
			tags,
		}
		console.log(imageRAWFILE)
		console.log(imageRAWFILE.type)
		this.props.uploadEssosItem(token, data, imageRAWFILE)
	}

	renderTagSelectionMenu = () => {
		// Export tags array to config
		const tags = Object.keys(TagMap)
		return tags.map(tag => {
			if (!this.state.tags.includes(tag)) return (
				<div 
					className='essos-category-tag-label' 
					onClick={ () => this.handleTagChange(tag) }
				> 
					<div className='tag-icon-container' >
						<img src={TagMap[tag]} />
					</div>
					<div className='tag-label-container'>
						{tag}
					</div>
				</div>
			)
			else if (this.state.tags.includes(tag)) return (
				<div 
					className='essos-category-tag-label' 
					style={{border: '2px solid red'}}
					onClick={ () => this.handleTagChange(tag) }
				> 
					<div className='tag-icon-container' >
						<img src={TagMap[tag]} />
					</div>
					<div className='tag-label-container'>
						{tag}
					</div>
				</div>
			)
		})
	}

	render() {
		return(
			(this.props.module === 'Omni') ? (
				<form className='omni-item-form-wrapper' onSubmit={(event) => this.handleSubmit(event)}>
					<div className='omni-image-preview-container' >
						<img src={this.state.imageSource} />
					</div>
					<div>
						<input 
							type='file'
							name='menuItems'
							onChange={(event) => this.imageSelectedHandler(event)}
						/>
					</div>
					<div>
						<label> Name </label>
						<input 
							type='text'
							value={this.state.itemName}
							onChange={(event) => this.handleChange('itemName', event.target.value)}
						/>
					</div>
					<div>
						<label> Price </label>
						<input
							type='text'
							value={this.state.itemPrice}
							onChange={(event) => this.handleChange('itemPrice', event.target.value)}
						/>
					</div>
					<div>
						<label> Category </label>
						<input 
							type='text'
							value={this.state.category}
							onChange={(event) => this.handleChange('category', event.target.value)}
						/>
					</div>
					<div>
						<input type='submit' />
					</div>
					{ this.props.action === 'modify' &&
						<div>
							<button className='essos-delete-icon-container' onClick={() => this.props.showModal('CONFIRM_DELETE_MODAL', { module: 'Omni', itemData: this.props.modifyItemAttributes })}> Delete Item </button>
						</div>
					}
				</form>
			) : (
				<form className='essos-item-form-wrapper' onSubmit={(event) => this.handleSubmit(event)}>
					<div className='essos-image-upload-column'>
						<div className='essos-image-preview-container'>
							<img src={this.state.imageSource} />
						</div>
						<div>
							<input 
								type='file'
								name='marketplaceItems'
								onChange={(event) => this.imageSelectedHandler(event)}
							/>
						</div>
					</div>
					<div className='essos-product-details-modify-column'>
						<div>
							<div className='tag-selection-input-container'>
								{ this.renderTagSelectionMenu() }
							</div>
							<label> Name </label>
							<input 
								type='text'
								value={this.state.itemName}
								onChange={(event) => this.handleChange('itemName', event.target.value)}
							/>
						</div>
						<div>
							<label> Price </label>
							<input 
								type='text'
								value={this.state.itemPrice}
								onChange={(event) => this.handleChange('itemPrice', event.target.value)}
							/>
						</div>
						<div>
							<label> SKU (# Stock Available for Purchase) </label>
							<input 
								type='text'
								value={this.state.numberInStock}
								onChange={(event) => this.handleChange('numberInStock', event.target.value)}
							/>
						</div>
						<div>
							<label> Description </label>
							<textarea 
								value={this.state.description}
								onChange={(event) => this.handleChange('description', event.target.value)}
							/>
						</div>
						<div>
							<input type='submit' />
						</div>
					</div>
				</form>

			)
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadItemForm)