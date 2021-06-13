async function getMedicalRecord(id) {
	const url = `https://hcms-api.herokuapp.com/medical-records/${id}`;
	const response = await fetch(url, {
 		headers : {
      		'Content-Type': 'application/json'
      	}
	})
	if (response.ok)
		return response.json();	
	else
		return null;
}

async function checkIfRecordExists() {
	const id = document.getElementById('record_id').value;
	localStorage.setItem('id', id);
}


window.addEventListener('load', async () => {
	if (window.location.href.includes('?')) {
		
		const id = localStorage.getItem('id');
		localStorage.removeItem('id');

		const record = await getMedicalRecord(id);
		console.log(record);

		if (record !== null) {
			window.location.href = `./update_record_execute.html?id=${record.id}`;
		} else {
			Swal.fire({
				title: 'Record not found!',
				text: 'Please check',
				icon: 'error',
				showConfirmButton: false,
				timer: 1500,
				width: '400px',
			});
		}
	}
});
