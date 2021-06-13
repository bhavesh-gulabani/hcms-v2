async function postMedicalRecord(record, patientId, doctorId) {
	// const url = `http://localhost:9898/medical-records/patients/${patientId}/doctors/${doctorId}`;
	const url = `https://hcms-api.herokuapp.com/medical-records/patients/${patientId}/doctors/${doctorId}`;
	const response = await fetch(url, {
		method: 'POST',
 		headers : {
      		'Content-Type': 'application/json'
      	},
      	body: JSON.stringify(record)
	});
	if (response.ok)
		return response.json();
	else
		return null;
}


async function addMedicalRecord() {
	let patientId = document.getElementById('patientid').value;
	let doctorId = document.getElementById('doc_id').value;
	let dateOfAdmission = document.getElementById('admission_date').value;
	let dateOfDischarge = document.getElementById('discharge_date').value;
	let diagnosis = document.getElementById('Diagnosis').value;
	
	let medicalRecord = { patientId, doctorId, dateOfAdmission, dateOfDischarge, diagnosis };
	medicalRecord = JSON.stringify(medicalRecord);
	localStorage.setItem('medicalRecord', medicalRecord);
}

window.addEventListener('load', async () => {
	if (window.location.href.includes('?')) {
		
		const medicalRecord = JSON.parse(localStorage.getItem('medicalRecord'));
		console.log(medicalRecord);
		localStorage.removeItem('medicalRecord');
		
		const patientId = medicalRecord.patientId;
		const doctorId = medicalRecord.doctorId;

		delete medicalRecord.patientId;
		delete medicalRecord.doctorId;
		
		const response = await postMedicalRecord(medicalRecord, patientId, doctorId);
		console.log(response);
		
		if (response !== null) {
			Swal.fire({
				title: 'Success',
				text: 'Record created',
				icon: 'success',
				showConfirmButton: false,
				timer: 1500,
				width: '400px',
			});	
			setTimeout(() => window.location.href = './medical_record.html', 1000);
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
