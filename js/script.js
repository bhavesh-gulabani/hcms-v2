const loader = document.getElementById('loader');

async function initialGetRequest() {
	const url = 'https://hcms-api.herokuapp.com/patients/initiate';
	const response = await fetch(url, {
 		headers : {
      		'Content-Type': 'application/json'
      	}
	});
	return response.json();
}

async function toggleSpinner() {
    let response = await initialGetRequest();    
    if (response) {
        loader.hidden = true;
    }
}

window.addEventListener('load', toggleSpinner);