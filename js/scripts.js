// Business Logic for AddressBook ---------
function AddressBook() {
	this.contacts = [],
	this.currentId = 0
}

AddressBook.prototype.addContact = function (contact) {
	contact.id = this.assignId();
	this.contacts.push(contact);
}

AddressBook.prototype.assignId = function () {
	this.currentId += 1;
	return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
	for (var i = 0; i < this.contacts.length; i++) {
		if (this.contacts[i]) {
			if (this.contacts[i].id == id) {
				return this.contacts[i];
			}
		}
	};
	return false;
}

AddressBook.prototype.deleteContact = function (id) {
	for (var i = 0; i < this.contacts.length; i++) {
		if (this.contacts[i]) {
			if (this.contacts[i].id == id) {
				delete this.contacts[i];
				return true;
			}
		}
	};
	return false;
}

// Business Logic for Contacts ---------



Contact.prototype.addAddress = function (address) {
	address.id = this.assignAddressId();
	this.addresses.push(address);
}

Contact.prototype.assignAddressId = function() {
	this.currentAddressId +=1;
	return this.currentAddressId;
}

Contact.prototype.findAddress = function (id) {
	for (var i = 0; i<this.addresses.length; i++) {
		if(this.addresses[i]) {
			if(this.addresses[i].id == id)	{
				return this.addresses[i];
			}
		}
	};
	return false;
}

Contact.prototype.deleteAddress = function (id) {
	for(var i = 0; i<this.addresses.length; i++) {
		if (this.addresses[i]) {
			if (this.addresses[i].id == id) {
				delete this.addresses[i];
				return true;
			}
		}
	};
	return false;
}

function Contact(firstName, lastName, phoneNumber) {
	this.firstName = firstName,
	this.lastName = lastName,
	this.phoneNumber = phoneNumber,
	this.addresses = [],
	this.currentAddressId = 0
}



Contact.prototype.fullName = function () {
	return this.firstName + " " + this.lastName;
}


//Business Logic for Addresses ------------


function Address(number, street, city, zipCode, state, country) {
this.number = number,
	this.street = street,
	this.city = city,
	this.zipCode = zipCode,
	this.state = state,
	this.country = country
}
// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
	var contactsList = $("ul#contacts");
	var htmlForContactInfo = "";
	addressBookToDisplay.contacts.forEach(function (contact) {
		htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
	});
	contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
	var contact = addressBook.findContact(contactId);
	var address = contact.findAddress();
	$("#show-contact").show();
	$(".first-name").html(contact.firstName);
	$(".last-name").html(contact.lastName);
	$(".phone-number").html(contact.phoneNumber);
	//$(".address").html(address.number + " " + address.street + "</n>" + addresss.city + ", " + address.state + address.zipCode + "</n>" + address.country);
	var buttons = $("#buttons");
	buttons.empty();
	buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}
function attachContactListeners() {
	$("ul#contacts").on("click", "li", function () {
		showContact(this.id);
		showAddress(this.id);
		console.log(this.id);
	});
	$("#buttons").on("click", ".deleteButton", function () {
		addressBook.deleteContact(this.id);
		$("#show-contact").hide();
		displayContactDetails(addressBook);
	});
};

$(document).ready(function () {
	attachContactListeners();
	$("form#new-contact").submit(function (event) {
		event.preventDefault();
		var inputtedFirstName = $("input#new-first-name").val();
		var inputtedLastName = $("input#new-last-name").val();
		var inputtedPhoneNumber = $("input#new-phone-number").val();
		$("input#new-first-name").val("");
		$("input#new-last-name").val("");
		$("input#new-phone-number").val("");
		var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
		console.log(newContact)
		var inputtedNumber = $("input#number").val();
		var inputtedStreet = $("input#street").val();
		var inputtedCity = $("input#city").val();
		var inputtedZipCode = $("input#zipCode").val();
		var inputtedState = $("input#state").val();
		var inputtedCountry = $("input#country").val();
		var newAddress = new Address(inputtedNumber, inputtedStreet, inputtedCity, inputtedZipCode, inputtedState, inputtedCountry);
		console.log(newAddress);
		newContact.addAddress(newAddress);
		console.log(newContact);
		addressBook.addContact(newContact);
		console.log(addressBook);
		displayContactDetails(addressBook);
	})
})