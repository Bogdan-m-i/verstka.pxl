export function textarea() {
	
	let textarea = document.querySelectorAll('.textarea').forEach((item) => {
		item.setAttribute('placeholder', ' ');
		item.setAttribute('rows', '1');


		item.addEventListener('input', (e) => {
			if (item.scrollHeight > item.clientHeight) {

				item.setAttribute('rows', Number(item.getAttribute('rows')) + 1);

			} else if (item.scrollHeight === item.clientHeight && Number(item.getAttribute('rows')) > 1) {

				item.setAttribute('rows', Number(item.getAttribute('rows')) - 1);
				if (item.scrollHeight > item.clientHeight) {
					item.setAttribute('rows', Number(item.getAttribute('rows')) + 1);
				}

			}
		})
	})

};