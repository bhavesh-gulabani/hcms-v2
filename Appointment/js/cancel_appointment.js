async function deleteAppointment(id) {
	const url = `https://hcms-api.herokuapp.com/appointments/${id}`;
	const response = await fetch(url, {
		method: 'DELETE',
 		headers : {
      		'Content-Type': 'application/json'
      	}
	});
	if (response.ok)
		return response.json();
	else
		return null;
}


async function cancelAppointment() {
	const id = document.getElementById('appointment_id').value;
	localStorage.setItem('id', id);
}


window.addEventListener('load', async () => {
	if (window.location.href.includes('?')) {
		
		const id = localStorage.getItem('id');
		console.log(id);
		localStorage.removeItem('id');

		const response = await deleteAppointment(id);
		console.log(response);
		
		if (response !== null) {
			Swal.fire({
				title: 'Success',
				text: 'Appointment canceled',
				icon: 'success',
				showConfirmButton: false,
				timer: 1500,
				width: '400px',
			});
			setTimeout(() => window.location.href = './appointment.html', 1000);
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Invalid input. Please re-check',
				icon: 'error',
				showConfirmButton: false,
				timer: 1500,
				width: '400px',
			});
		}	
	}
});
