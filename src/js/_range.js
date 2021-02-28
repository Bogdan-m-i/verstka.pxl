export function range() {
	function setTrackWidth(item, divTrack) {
		let val = item.value
		let max = item.getAttribute('max')
		let min = item.getAttribute('min') || 0
		let res = ((val - min) / (max - min)) * 100;

		divTrack.style.width = `${res}%`
		sum.innerHTML = Number(item.value).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: '0' })
	}

	const sum = document.querySelector('#sum')

	document.querySelectorAll('.input-range').forEach((item) => {
		const divTrack = document.createElement('div')
		divTrack.classList.add('range-track')
		item.after(divTrack)

		setTrackWidth(item, divTrack)
		item.addEventListener('input', () => {
			setTrackWidth(item, divTrack)
		})
	})
}