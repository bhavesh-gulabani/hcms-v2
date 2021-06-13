async function getAppointments() {
	const url = 'https://hcms-api.herokuapp.com/appointments';
	const response = await fetch(url, {
 		headers : {
      		'Content-Type': 'application/json'
      	}
	});
	return response.json();
}

async function getImage(gender) {
	const response = await fetch(`https://randomuser.me/api/?gender=${gender}`);
	const data = await response.json();
	// console.log(data.results[0].picture.large)
	return data.results[0].picture.large;
}


async function displayAppointments() {
	let appointments = await getAppointments();
	console.log(appointments);

	const container = document.getElementById('table-body');

	for (appointment of appointments) {
		let row = document.createElement('tr');
			let colOne = document.createElement ('td');
			colOne.classList.add('px-6', 'py-4', 'whitespace-nowrap');

				let outerDiv = document.createElement('div');
				outerDiv.classList.add('flex', 'items-center');

					// Add image
					imageSrc = await getImage(appointment.patient.gender);
					let innerDivOne = document.createElement('div');
					innerDivOne.classList.add('flex-shrink-0', 'h-10', 'w-10');

						let img = document.createElement('img');
						img.classList.add('h-10', 'w-10', 'rounded-full');
						img.setAttribute('src', imageSrc);

					innerDivOne.appendChild(img);

					// Add name and ID
					let innerDivTwo = document.createElement('div');
					innerDivTwo.classList.add('ml-4');

						let childOne = document.createElement('div');
						childOne.classList.add('text-sm', 'font-medium', 'text-gray-900');
						childOne.textContent = appointment.patient.name;

						let childTwo = document.createElement('div');
						childTwo.classList.add('text-sm', 'text-gray-500');
						childTwo.textContent = `ID : ${appointment.patient.id}`;

					innerDivTwo.appendChild(childOne);
					innerDivTwo.appendChild(childTwo);	

				outerDiv.appendChild(innerDivOne);	
				outerDiv.appendChild(innerDivTwo);	
			colOne.appendChild(outerDiv);

			colTwo = document.createElement('td');
			colTwo.classList.add('px-6', 'py-4', 'whitespace-nowrap');
				colChild = document.createElement('div');
				colChild.classList.add('text-sm', 'text-gray-900');
				colChild.textContent = appointment.id;
			colTwo.appendChild(colChild);

			colThree = document.createElement('td');
			colThree.classList.add('px-6', 'py-4', 'whitespace-nowrap');	
			colThree.textContent = appointment.doctor.id;

			colFour = document.createElement('td');
			colFour.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-500');
			colFour.textContent = appointment.receptionist.id;

			colFive = document.createElement('td');
			colFive.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-500');
			colFive.textContent = appointment.time;

			colSix = document.createElement('td');
			colSix.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-500');
			colSix.textContent = appointment.dateOfAppointment;

		row.appendChild(colOne);
		row.appendChild(colTwo);
		row.appendChild(colThree);
		row.appendChild(colFour);
		row.appendChild(colFive);
		row.appendChild(colSix);
		container.appendChild(row);
	}
}

window.addEventListener('load', displayAppointments);