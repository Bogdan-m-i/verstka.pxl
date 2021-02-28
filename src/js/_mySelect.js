const getTemplate = (data = []) => {
	let items = data.map((item, key) => {
		return `<li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>`
	})
	
	return `
		<div class="select__icon" data-type="arrow">
			<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L6 6L11 1" stroke="white"/>
			</svg>
		</div>
		<div class="select__dropdown">
			<ul class="select__list">
				${items.join('')}
			</ul>
			
		</div>
	`
}

export class MySelect {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.options = options
		this.selectedId = options.selectedId

		if (this.$el) {
			this.render()
			this.setup()
		}
	}

	render() {
		const {data} = this.options
		this.$el.classList.add('select')
		this.$el.insertAdjacentHTML('beforeEnd', getTemplate(data))
	}

	setup() {
		this.clickHandler = this.clickHandler.bind(this)
		this.$el.addEventListener('mousedown', this.clickHandler)

		this.$arrow = this.$el.querySelector('[data-type="arrow"]')
		this.$value = this.$el.querySelector('input')
		this.$dropDown = this.$el.querySelector('.select__dropdown')
		this.$itemList = this.$el.querySelectorAll('.select__item')
		this.$input = this.$el.querySelector('.input')

		if (this.selectedId) {
			this.select(this.selectedId)
		}

		this.$input.addEventListener('focus', () => {
			if (!this.isOpen) {
				this.open()
			}
		})
		this.$input.addEventListener('focusout', () => {
			this.close()
		})
	}

	clickHandler(event) {
		if (this.$el.contains(event.target) && !this.$dropDown.contains(event.target)) {
				this.toggle()
		} else if (event.target.dataset.type === 'item') {
			const id = event.target.dataset.id
			this.select(id)
		}
	}

	//Функция определяет что клик был вне селекта и закрывает дропдавн, отключенна, т.к. сейчас закрытие по событию mauseout
	// clickHandler2(event) {
	// 	if (!this.$el.contains(event.target)) {
	// 		this.close()
	// 	}
	// }

	select(id) {
		this.selectedId = id
		this.$value.setAttribute('value', this.current.value)

		this.$el.querySelectorAll(`[data-id]`).forEach((el) => {
			el.classList.remove('selected', 'focus')
		});
		this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected', 'focus')

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
		
		this.setFocus = this.setFocus.bind(this)
		document.addEventListener('keydown', this.setFocus)

		//Сейчас закрытие по событию focusout, нет смысла отлавливать клик вне области селекта
		// this.clickHandler2 = this.clickHandler2.bind(this)
		// document.addEventListener('click', this.clickHandler2)
	}

	close() {
		this.$el.classList.remove('open')
		this.$arrow.style.transform = `rotateZ(0deg)`

		document.removeEventListener('click', this.clickHandler2)
		document.removeEventListener('keydown', this.setFocus)
		this.$itemList.forEach((el) => {
			el.classList.remove('focus')
		});
	}

	destroy() {
		this.$el.removeEventListener('click', this.clickHandler)
		document.removeEventListener('click', this.clickHandler2)
		this.$el.innerHTML = ''
	}

	get currentFocusKey() {
		let res = -1
		this.$itemList.forEach((item, key) => {
			if (item.classList.contains('focus')) {
				res = key
			}
		})

		console.log('res: ', res);

		return res
	}

	setFocus(event) {
		console.log(event.code)

		let current = this.currentFocusKey
		if (event.code === 'ArrowDown') {
			event.preventDefault()

			if (this.$itemList[current + 1]) {
				this.$itemList[current + 1].classList.add('focus')
				if (this.$itemList[current]) { this.$itemList[current].classList.remove('focus') }
			} else {
				this.$itemList[current].classList.remove('focus')
				this.$itemList[0].classList.add('focus')
			}
		} else if (event.code === 'ArrowUp') {
			console.log('up')
			event.preventDefault()

			if (current - 1 < 0) {

				this.$itemList[0].classList.remove('focus')
				this.$itemList[this.$itemList.length - 1].classList.add('focus')

			} else {

				this.$itemList[current].classList.remove('focus')
				this.$itemList[current - 1].classList.add('focus')

			}
		} else if (event.code === 'Space') {
			event.preventDefault()
			
			this.select(this.$itemList[this.currentFocusKey].getAttribute('data-id'))
		}
	}

}