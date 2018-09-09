export const modalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};
export const modalStyleanim = {
	content: {
			top: '55%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			animation: 'topfade 1s ease',
			animationFillMode: 'forwards',
		}
};
export const modalStyle2 = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundImage: 'radial-gradient(circle at center, rgb(105, 61, 65), rgb(69, 27, 54) 60%, rgb(32, 4, 22))'
	},
};
export const modalStyleRound = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		/* backgroundImage: 'radial-gradient(circle at center, rgb(105, 61, 65), rgb(69, 27, 54) 60%, rgb(32, 4, 22))', */
		backgroundColor: 'rgba(82, 59, 112, 0.89)',
		borderRadius: '50px',
		border: 'none',
		boxShadow: '5px 5px 16px 2px rgba(0, 0, 0, .85)'
	},
	overlay: {
		backgroundColor: 'rgba(255,255,255,0.75)'
	}
}
export const modalStyle3 = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		border: '2px solid white',
		zIndex: 1000,
		borderRadius: 5,
		padding: 0,
	},
};

export const stockAvvys = [
	'/assets/avatars/sa1.svg',
	'/assets/avatars/sa1a.svg',
	'/assets/avatars/sa1b.svg',
	'/assets/avatars/sa2.svg',
	'/assets/avatars/sa2a.svg',
	'/assets/avatars/sa2b.svg',
	'/assets/avatars/sa3.svg',
	'/assets/avatars/sa3a.svg',
	'/assets/avatars/sa3b.svg',
	'/assets/avatars/sa3c.svg',
	'/assets/avatars/sa4.svg',
	'/assets/avatars/sa4a.svg',
	'/assets/avatars/sa4b.svg',
	'/assets/avatars/sa5.svg',
	'/assets/avatars/sa6.svg',
	'/assets/avatars/sa6a.svg',
]

export const TagMap = {
	"Shoes - Men's": '/assets/icons/shoem.svg',
	"Shoes - Women's": '/assets/icons/shoew.svg',
	"Clothing - Men's":'/assets/icons/shirt.svg',
	"Clothing - Women's":'/assets/icons/dress.svg',
	"Accessories":'/assets/icons/accnec.svg',
	"Watches":'/assets/icons/cat-watch.svg',
	"Beauty":'/assets/icons/cosmetics.svg',
	"Make-Up":'/assets/icons/make-up.svg',
	"Grooming":'/assets/icons/salon.svg',
	"Fragrance & Perfume":'/assets/icons/fragrance.svg',
}