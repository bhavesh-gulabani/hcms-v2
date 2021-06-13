async function postPatient(patient) {
	// const url = 'http://localhost:9898/patients';
	const url = 'https://hcms-api.herokuapp.com/patients';
	
	const response = await fetch(url, {
		method: 'POST',
 		headers : {
      		'Content-Type': 'application/json'
      	},
      	body: JSON.stringify(patient)
	});
	if (response.ok)
		return response.json();
	else
		return null;
}


function registerPatient() {
	let name = `${document.getElementById('firstname').value} ${document.getElementById('lastname').value}`; 
	let email = document.getElementById('email').value;
	let dateOfBirth = document.getElementById('date').value;
	let age = document.getElementById('age').value;
	let gender = document.querySelector('input[name=gender]:checked').id;
	let address = document.getElementById('address').value;

	let patient = { name, email, dateOfBirth, age, gender, address};
	patient = JSON.stringify(patient);
	localStorage.setItem('patient', patient);
}


window.addEventListener('load', async () => {
	if (window.location.href.includes('?')) {
		
		const patient = JSON.parse(localStorage.getItem('patient'));
		// console.log(patient);
		localStorage.removeItem('patient');

		const response = await postPatient(patient);
		console.log(response);

		if (response !== null) {
			Swal.fire({
				title: 'Success',
				text: 'Patient registered',
				icon: 'success',
				showConfirmButton: false,
				timer: 1500,
				width: '400px',
			});
			setTimeout(() => window.location.href = '../index.html', 1000);
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Invalid input. Please re-check',
				icon: 'error',
				showConfirmButton: false,
				timer: 2000,
				width: '400px',
			});
		}
	}
});


