async function postReceipt(receipt, patientId) {
	const url = `https://hcms-api.herokuapp.com/billing-receipts/patients/${patientId}`;
	const response = await fetch(url, {
		method: 'POST',
 		headers : {
      		'Content-Type': 'application/json'
      	},
      	body: JSON.stringify(receipt)
	});
	if (response.ok) 
		return response.json();
	else
		return null;
}


async function generateReceipt() {
	let patientId = document.getElementById('patientid').value;
	let modeOfPayment = document.getElementById('Mode_of_payment').value;
	let amount = document.getElementById('Amount').value;
	let status = document.getElementById('Status').value;
	
	let receipt = { patientId, modeOfPayment, amount, status };
	receipt = JSON.stringify(receipt);
	localStorage.setItem('receipt', receipt);

	const response = await postReceipt(receipt, patientId);
	console.log(response);
}



window.addEventListener('load', async () => {
	if (window.location.href.includes('?')) {
		
		const receipt = JSON.parse(localStorage.getItem('receipt'));
		console.log(receipt);
		localStorage.removeItem('receipt');
		
		const patientId = receipt.patientId;

		delete receipt.patientId;

		const response = await postReceipt(receipt, patientId);
		console.log(response);
		if (response !== null) {
			Swal.fire({
				title: 'Success',
				text: 'Receipt generated',
				icon: 'success',
				showConfirmButton: false,
				timer: 1500,
				width: '400px',
			});
			setTimeout(() => window.location.href = './billing.html', 1000);
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
