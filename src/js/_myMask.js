export class MyMask {

	constructor(selector) {
		this.$el = document.querySelector('input' + selector)
		if (this.$el) {
			this.setup()
		}
	}

	setup() {
		this.$el.addEventListener('keypress', (e) => {
			if (e.keyCode < 48 || e.keyCode > 57) {
				e.preventDefault();
			}
		})

		this.$el.addEventListener('focus', () => {
			if (this.$el.value.length === 0) {
				this.$el.value = '+7 ';
			}
		})

		this.$el.addEventListener('keydown', (e) => {
			if (e.key === 'Backspace' && this.$el.value.length <= 3) {
				e.preventDefault();
			}

			if (this.$el.value.substr(0, 3) !== '+7 ') {
				this.$el.value = '+7 ' + this.$el.value
			}

			// console.log(this.$el.value.slice(0, 6))
			// console.log(this.$el.value.slice(6, 9))
			// console.log(this.$el.value.slice(9, 11))
			// console.log(this.$el.value.slice(11, 13))

			//this.$el.value = this.$el.value.slice(0, 6) + ' ' + this.$el.value.slice(6, 9) + '-' + this.$el.value.slice(9, 11) + '-' + this.$el.value.slice(11, 13)
			
			if (this.$el.value.length === 6 && e.key !== 'Backspace') {
				this.$el.value = this.$el.value.slice(0, 7) + ' '
			}
			if (this.$el.value.length === 10 && e.key !== 'Backspace') {
				this.$el.value = this.$el.value.slice(0, 10) + '-'
			}
			if (this.$el.value.length === 13 && e.key !== 'Backspace') {
				this.$el.value = this.$el.value.slice(0, 13) + '-'
			}
			if (this.$el.value.length > 15 && e.key !== 'Backspace' && e.key !== 'Tab') {
				e.preventDefault();
			}
		})

		this.$el.addEventListener('focusout', (e) => {
			if (this.$el.value === '+7 ') {
				this.$el.value = null
			}
		})
	}

}