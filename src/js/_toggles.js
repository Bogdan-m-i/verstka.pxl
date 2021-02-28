export function toggles() {
	document.querySelectorAll('.label-toggle').forEach((item) => {
		const input = item.querySelector('.input-toggle')
		const on = item.querySelector('.on')
		const off = item.querySelector('.off')

		function setActive() {
			if (input.checked) {
				on.classList.add('active')
				off.classList.remove('active')
			} else {
				on.classList.remove('active')
				off.classList.add('active')
			}
		}
		setActive()

		input.addEventListener('input', () => {
			setActive()
		})
	})

	const toggleActive = (el) => {
		el.checked ? el.parentNode.classList.add('active') : el.parentNode.classList.remove('active')
	}
	document.querySelectorAll('.input-check').forEach((el) => {
		toggleActive(el)
		el.addEventListener('change', () => {toggleActive(el)})
	})


	document.querySelectorAll('.input-radio').forEach((el) => {
		toggleActive(el)
		el.addEventListener('change', (e) => {
			
			document.querySelectorAll(`[name=${e.target.getAttribute('name')}]`).forEach((el) => { toggleActive(el) })
		})
	})
}