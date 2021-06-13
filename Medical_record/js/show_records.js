async function getMedicalRecords() {
	const url = 'https://hcms-api.herokuapp.com/medical-records';
	const response = await fetch(url, {
 		headers : {
      		'Content-Type': 'application/json'
      	}
	});
	return response.json();
}


async function displayMedicalRecords() {
	let records = await getMedicalRecords();
	console.log(records);

	const container = document.getElementById('table-body');

	for (record of records) {
		let row = document.createElement('tr');
			let colOne = document.createElement ('td');
			colOne.classList.add('px-6', 'py-4', 'whitespace-nowrap');

				let outerDiv = document.createElement('div');
				outerDiv.classList.add('flex', 'items-center');

					let innerDiv = document.createElement('div');
					innerDiv.classList.add('ml-4');

						let childOne = document.createElement('div');
						childOne.classList.add('text-sm', 'font-medium', 'text-gray-900');
						childOne.textContent = record.id;
					
					innerDiv.appendChild(childOne);	
				outerDiv.appendChild(innerDiv);	
			colOne.appendChild(outerDiv);

			colTwo = document.createElement('td');
			colTwo.classList.add('px-6', 'py-4', 'whitespace-nowrap');
				colChild = document.createElement('div');
				colChild.classList.add('text-sm', 'text-gray-900');
				colChild.textContent = record.patient.id;
			colTwo.appendChild(colChild);

			colThree = document.createElement('td');
			colThree.classList.add('px-6', 'py-4', 'whitespace-nowrap');	
			colThree.textContent = record.doctor.id;

			colFour = document.createElement('td');
			colFour.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-500');
			colFour.textContent = record.dateOfAdmission;

			colFive = document.createElement('td');
			colFive.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-500');
			colFive.textContent = record.dateOfDischarge;

			colSix = document.createElement('td');
			colSix.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-500');
			colSix.textContent = record.diagnosis;

		row.appendChild(colOne);
		row.appendChild(colTwo);
		row.appendChild(colThree);
		row.appendChild(colFour);
		row.appendChild(colFive);
		row.appendChild(colSix);
		container.appendChild(row);
	}
}

window.addEventListener('load', displayMedicalRecords);