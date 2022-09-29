
// Exercise 6
function validate() {
	let error = 0;
	// Get the input fields
	let fName = document.getElementById("fName");
	let fLastN = document.getElementById("fLastN");
	let fEmail = document.getElementById("fEmail");
	let fPassword = document.getElementById("fPassword");
	let fAddress = document.getElementById("fAddress");
	let fPhone = document.getElementById("fPhone"); 
	
	// Validate fields entered by the user: name, phone, password, and email
	if(fName.value == "" || fName.value.length < 3 || !/^[A-Za-z]+$/.test(fName.value)){
		error++;
		fName.classList.add("is-invalid");
	} else{
		fName.classList.remove("is-invalid");
	}

	if(fLastN.value == "" || fLastN.value.length < 3 || !/^[A-Za-z]+$/.test(fLastN.value)){
		error++;
		fLastN.classList.add("is-invalid");
	} else{
		fLastN.classList.remove("is-invalid");
	}

	if(fEmail.value == "" || fEmail.value.length < 3 || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(fEmail.value)){
		error++;
		fEmail.classList.add("is-invalid");
	} else{
		fEmail.classList.remove("is-invalid");
	}

	if(fPassword.value == "" || fPassword.value.length < 3 || !/^[a-zA-Z0-9]+$/.test(fPassword.value)){
		error++;
		fPassword.classList.add("is-invalid");
	} else{
		fPassword.classList.remove("is-invalid");
	}

	if(fPhone.value == "" || fPhone.value.length < 9 || !/^[0-9]+$/.test(fPhone.value)){
		error++;
		fPhone.classList.add("is-invalid");
	} else{
		fPhone.classList.remove("is-invalid");
	}

	if(fAddress.value == "" || fAddress.value.length < 3){
		error++;
		fAddress.classList.add("is-invalid");
	} else{
		fAddress.classList.remove("is-invalid");
	}
	
	 
	if(error>0){
		alert("Error");
	}else{
		alert("OK");
	}

}
