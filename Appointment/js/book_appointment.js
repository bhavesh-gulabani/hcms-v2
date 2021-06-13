async function postAppointment(appointment, patientId, doctorId, receptionistId) {
	const url = `https://hcms-api.herokuapp.com/appointments/patients/${patientId}/doctors/${doctorId}/receptionists/${receptionistId}`;
	
	const response = await fetch(url, {
		method: 'POST',
 		headers : {
      		'Content-Type': 'application/json'
      	},
      	body: JSON.stringify(appointment)
	});
	if (response.ok)
		return response.json();
	else 
		return null
}


async function bookAppointment() {
	let patientId = document.getElementById('patientid').value;
	let doctorId = document.getElementById('doc_id').value;
	let receptionistId = document.getElementById('receiptionist_id').value;
	let dateOfAppointment = document.getElementById('Date').value;
	let time = document.getElementById('Time').value;

	let appointment = { patientId, doctorId, receptionistId, dateOfAppointment, time };
	appointment = JSON.stringify(appointment);
	localStorage.setItem('appointment', appointment);
}



window.addEventListener('load', async () => {
	if (window.location.href.includes('?')) {
		
		const appointment = JSON.parse(localStorage.getItem('appointment'));
		console.log(appointment);
		localStorage.removeItem('appointment');
		
		const patientId = appointment.patientId;
		const doctorId = appointment.doctorId;
		const receptionistId = appointment.receptionistId;

		delete appointment.patientId;
		delete appointment.doctorId;
		delete appointment.receptionistId;

		const response = await postAppointment(appointment, patientId, doctorId, receptionistId);
		console.log(response);
		if (response !== null) {
			Swal.fire({
				title: 'Success',
				text: 'Appointment booked',
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
