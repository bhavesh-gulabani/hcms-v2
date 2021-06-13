async function getDoctors() {
	const url = 'https://hcms-api.herokuapp.com/doctors';
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

async function displayDoctors() {
	let doctors = await getDoctors();
	console.log(doctors);

	const container = document.getElementById('table-body');

	for (doctor of doctors) {
		let row = document.createElement('tr');
			let colOne = document.createElement ('td');
			colOne.classList.add('px-6', 'py-4', 'whitespace-nowrap');

				let outerDiv = document.createElement('div');
				outerDiv.classList.add('flex', 'items-center');

					// Add image
					imageSrc = await getImage(doctor.gender);
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
						childOne.textContent = doctor.name;

						let childTwo = document.createElement('div');
						childTwo.classList.add('text-sm', 'text-gray-500');
						childTwo.textContent = `ID : ${doctor.id}`;

					innerDivTwo.appendChild(childOne);
					innerDivTwo.appendChild(childTwo);	

				outerDiv.appendChild(innerDivOne);	
				outerDiv.appendChild(innerDivTwo);	
			colOne.appendChild(outerDiv);

			colTwo = document.createElement('td');
			colTwo.classList.add('px-6', 'py-4', 'whitespace-nowrap');
				colChild = document.createElement('div');
				colChild.classList.add('text-sm', 'text-gray-900');
				colChild.textContent = doctor.specialization;
			colTwo.appendChild(colChild);


		row.appendChild(colOne);
		row.appendChild(colTwo);
		container.appendChild(row);
	}						
}


window.addEventListener('load', displayDoctors);
