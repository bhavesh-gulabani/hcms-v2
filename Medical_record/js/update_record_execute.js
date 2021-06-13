async function getMedicalRecord(id) {
	const url = `https://hcms-api.herokuapp.com/medical-records/${id}`;
	const response = await fetch(url, {
 		headers : {
      		'Content-Type': 'application/json'
      	}
	});
	return response.json();	
}

async function putMedicalRecord(record, patientId, doctorId) {
	const url = `https://hcms-api.herokuapp.com/medical-records/patients/${patientId}/doctors/${doctorId}`;
	const response = await fetch(url, {
		method: 'PUT',
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

const recordId = Number(window.location.href.split('?')[1].split('=')[1]);

async function populateForm() {
	// const id = Number(window.location.href.split('?')[1].split('=')[1]);
	const record = await getMedicalRecord(recordId);
	document.getElementById('patientid').value = record.patient.id;
	document.getElementById('doc_id').value = record.doctor.id;
	document.getElementById('admission_date').value = record.dateOfAdmission;
	document.getElementById('discharge_date').value = record.dateOfDischarge;
	document.getElementById('Diagnosis').value = record.diagnosis;
}

async function updateMedicalRecord() {
	let patientId = document.getElementById('patientid').value;
	let doctorId = document.getElementById('doc_id').value;
	let dateOfAdmission = document.getElementById('admission_date').value;
	let dateOfDischarge = document.getElementById('discharge_date').value;
	let diagnosis = document.getElementById('Diagnosis').value;

	let medicalRecord = { id:recordId, patientId, doctorId, dateOfAdmission, dateOfDischarge, diagnosis };
	medicalRecord = JSON.stringify(medicalRecord);
	localStorage.setItem('medicalRecord', medicalRecord);
	console.log(medicalRecord)
}


window.addEventListener('load', async () => {
	if (window.location.href.includes('&')) {
		const medicalRecord = JSON.parse(localStorage.getItem('medicalRecord'));
		console.log(medicalRecord);
		localStorage.removeItem('medicalRecord');
		
		const patientId = Number(medicalRecord.patientId);
		const doctorId = Number(medicalRecord.doctorId);

		delete medicalRecord.patientId;
		delete medicalRecord.doctorId;

		const response = await putMedicalRecord(medicalRecord, patientId, doctorId);
		console.log(response);

		if (response !== null) {
			Swal.fire({
				title: 'Success',
				text: 'Record updated',
				icon: 'success',
				showConfirmButton: false,
				timer: 1500,
				width: '400px',
			});
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
		setTimeout(() => window.location.href = './medical_record.html', 1000);
	} else {
		populateForm();
	}
});
