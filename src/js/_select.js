
    // const select = new Select('#select-1', {
    //     placeholder: 'wow',
    //     selectedId: '4',
    //     data: [
    //         {id: '1', value: '111111'},
    //         {id: '2', value: '22222'},
    //         {id: '3', value: '3333'},
    //         {id: '4', value: '44444444'}
    //     ],
    //     onSelect(item) {
    //         console.log('select ', item)
    //     }
    // })


const getTemplate = (data = [], placeholder = ' ') => {
	let items = data.map((item) => {
		return `<li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>`
	})
	
	return `
		<div class="select__input" data-type="input">
			<div class="select__text" data-type="value">
				${placeholder}
			</div>
			<div class="select__icon" data-type="arrow">
				<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1L6 6L11 1" stroke="white"/>
				</svg>
			</div>
		</div>
		<div class="select__dropdown">
			<ul class="select__list">
				${items.join('')}
			</ul>
			
		</div>
	`
}

export class Select {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.options = options
		this.selectedId = options.selectedId

		this.render()
		this.setup()
	}

	render() {
		const {placeholder, data} = this.options
		this.$el.classList.add('select')
		this.$el.innerHTML = getTemplate(data, placeholder)
	}

	setup() {
		this.clickHandler = this.clickHandler.bind(this)
		this.$el.addEventListener('click', this.clickHandler)

		this.$arrow = this.$el.querySelector('[data-type="arrow"]')
		this.$value = this.$el.querySelector('[data-type="value"]')
		this.$input = this.$el.querySelector('[data-type="input"]')

		if (this.selectedId) {
			this.select(this.selectedId)
		}
	}

	clickHandler2(event) {
		if (!this.$el.contains(event.target)) {
			this.close()
		}
	}

	clickHandler(event) {
		const {type} = event.target.dataset

		if (type === 'input' || this.$input.contains(event.target)) {
			this.toggle()
		} else if (type === 'item') {
			const id = event.target.dataset.id
			this.select(id)
		}
	}

	select(id) {
		this.selectedId = id
		this.$value.textContent = this.current.value

		this.$el.querySelectorAll(`[data-id]`).forEach((el) => {
			el.classList.remove('selected')
		});
		this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

		this.options.onSelect ? this.options.onSelect(this.current) : null

		this.close()
	}

	get current() {
		return this.options.data.find((item) => item.id === this.selectedId)
	}

	get isOpen() {
		return this.$el.classList.contains('open')
	}

	toggle() {
		this.isOpen ? this.close() : this.open()
	}

	open() {
		this.$el.classList.add('open')
		this.$arrow.style.transform = `rotateZ(180deg)`

		this.clickHandler2 = this.clickHandler2.bind(this)
		document.addEventListener('click', this.clickHandler2)
	}

	close() {
		this.$el.classList.remove('open')
		this.$arrow.style.transform = `rotateZ(0deg)`

		document.removeEventListener('click', this.clickHandler2)
	}

	destroy() {
		this.$el.removeEventListener('click', this.clickHandler)
		this.$el.innerHTML = ''
	}
}



const css = `

.select {
	$height: 46px;
	width: 100%;
	position: relative;

	&.open {
		.select__dropdown {
			display: block;
		}
		.select__input {
			border-bottom: none;
		}
	}

	&__input {
		height: $height;
		padding: 16px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}

	&__dropdown {
		display: none;
		position: absolute;
		border-radius: 8px;
		background-color: rgba(12, 11, 49, .3);
		top: $height;
		left: 0;
		right: 0;
		max-height: 200px;
		overflow-y: auto;
		
		scrollbar-color: #458245 #714826;
		&::-webkit-scrollbar {
			width: 3px;
			background-color: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background-color: $black;
			border-radius: 5px;
		}
	}

	&__list {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	&__item {
		padding: 1rem;

		&.selected {
			background-color: rgba(12, 11, 49, .6);
		}

		&:hover {
			color: $white;
			cursor: pointer;
		}
	}
}

`