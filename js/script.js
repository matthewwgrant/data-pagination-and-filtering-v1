
// global variables

const div = document.querySelector('.pagination');
const header = document.querySelector('.header');


/*
	The showPage function uses a start and end index, based
	off of the page number and users displayed per page
	to dynamically create the html elements and display
	the user information
*/

function showPage(list, page) {
	startIndex = (page * 9) - 9;
	endIndex = (page * 9) - 1;
	const ul = document.querySelector('.student-list');
	ul.innerHTML = '';

	for ( let i = 0; i < list.length; i++ ) {
		if ( i >= startIndex && i <= endIndex ) {
			const li = document.createElement('li');
			li.className = 'student-item cf';
			ul.appendChild(li);
			const divStudent = document.createElement('div');
			divStudent.className = 'student-details';
			li.appendChild(divStudent);
			const img = document.createElement('img');
			img.className = 'avatar';
			img.src = list[i].picture.large;
			divStudent.appendChild(img);
			const h3 = document.createElement('h3');
			h3.textContent = `${list[i].name.first} ${list[i].name.last}`;
			divStudent.appendChild(h3);
			const email = document.createElement('span');
			email.className = 'email';
			email.textContent = `${list[i].email}`;
			divStudent.appendChild(email);
			const divJoined = document.createElement('div');
			divJoined.className = 'joined-details';
			li.appendChild(divJoined);
			const joined = document.createElement('span');
			joined.className = 'date';
			joined.innerHTML = `Joined ${list[i].registered.date}`;
			divJoined.appendChild(joined);

		}
	}
}


/*
	This function creates the buttons based upon 
	the number of pages that are needed to display
	all users with 9 per page
*/

function addPagination(list) {
	const numOfButtons = Math.ceil(list.length / 9);
	const ul = document.querySelector('.link-list');
	ul.innerHTML = '';

	for ( let i = 0; i < numOfButtons; i++ ) {
		let display = i + 1;
		if ( display === 1 ) {
			const li = document.createElement('li');
			ul.insertAdjacentElement('beforeend', li);
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'active';
			btn.textContent = display;
			li.appendChild(btn);
		} else {
			const li = document.createElement('li');
			ul.insertAdjacentElement('beforeend', li);
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = '';
			btn.textContent = display;
			li.appendChild(btn);
		}
	}
}


/*
	createSearch function dynamically creates a 
	search bar and appends it to the page
*/

function createSearch() {
	const label = document.createElement('label');
	label.setAttribute('for', 'search');
	label.className = 'student-search';
	header.insertAdjacentElement('beforeend', label);
	const span = document.createElement('span');
	span.textContent = 'Search by name';
	label.appendChild(span);
	const input = document.createElement('input');
	input.id = 'search';
	input.placeholder = 'Search by name...';
	label.appendChild(input);
	const btn = document.createElement('button');
	btn.type = 'button';
	label.appendChild(btn);
	const img = document.createElement('img');
	img.src = 'img/icn-search.svg';
	img.alt = 'Search icon';
	btn.appendChild(img);
}

/*
	runSearch functions searches through all names in the
	data object and returns any matches based off of the
	value of the search input field
*/
function runSearch(searchInput, list) {
	let results = [];
	const ul = document.querySelectorAll
	for ( let i = 0; i < list.length; i++ ) {
		const fullName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
		if ( searchInput.value.length !== 0 && fullName.includes(searchInput.value.toLowerCase()) ) {
			// console.log(fullName);
			results.push(list[i]);
		}
	}
	// if ( results.length === 0 ) {
	// 	ul.innerHTML = `<h3>Sorry, there were no matching results</h3>`;
	// 	console.log(results.length);
	// } else {
		return results;
	// }
	
}

	

/*
	Event listener checks to loops over all of the buttons
	with the type of button. It then sets the className of
	the target to active and all other buttons to no className
*/
div.addEventListener('click', (e) => {
	const buttons = document.querySelectorAll('button[type="button"]');
	for ( let i = 0; i < buttons.length; i++ ) {
		if ( e.target === buttons[i] ) {
				buttons[i].className = 'active';
				showPage( data, buttons[i].textContent )
		} else{
			buttons[i].className = '';
		}
	}
});


/*
	Event listener searches as soon as the input
	field is typed into. It shows students and 
	paginates properly using the event listener
	above with a new array (from runSearch) passed 
	into it. It remove pagination is no results
	are found and displays the original array if
	the field is empty.
*/

header.addEventListener('keyup', (e) => {
	const searchInfo = document.querySelector('input');
	const searchResults = runSearch(searchInfo, data);

	if ( searchResults.length === 0 && searchInfo.value.length !== 0 ) {
		document.querySelector('ul.student-list').innerHTML = `<h2>Sorry, no results found</h2>`;
		document.querySelector('.pagination').style.display = 'none'; 

	} else if ( searchResults.length > 0 ) {
		showPage(searchResults, 1);
		addPagination(searchResults);
		document.querySelector('.pagination').style.display = 'block'; 
		
		div.addEventListener('click', (e) => {
			const buttons = document.querySelectorAll('button[type="button"]');
			for ( let i = 0; i < buttons.length; i++ ) {
				if ( e.target === buttons[i] ) {
						buttons[i].className = 'active';
						showPage( searchResults, buttons[i].textContent )
				} else{
					buttons[i].className = '';
				}
			}
		});

	} else if (e.keyCode === 8 && searchInfo.value.length === 0 ) {
		showPage(data, 1);
		addPagination(data);
		document.querySelector('.pagination').style.display = 'block'; 

		div.addEventListener('click', (e) => {
			const buttons = document.querySelectorAll('button[type="button"]');
			for ( let i = 0; i < buttons.length; i++ ) {
				if ( e.target === buttons[i] ) {
						buttons[i].className = 'active';
						showPage( data, buttons[i].textContent )
				} else{
					buttons[i].className = '';
				}
			}
		});
	}
})


// function calls

showPage(data, 1);
addPagination(data);
createSearch();



