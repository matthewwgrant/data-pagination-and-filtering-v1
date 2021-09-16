/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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
			img.src = list[i].picture.medium;
			divStudent.appendChild(img);
			console.log(li)
			const h3 = document.createElement('h3');
			h3.textContent = `${list[i].name.first} ${list[i].name.last}`;
			divStudent.appendChild(h3);
			const divJoined = document.createElement('div');
			divJoined.className = 'joined-details';
			li.appendChild(divJoined);
			const span = document.createElement('span');
			span.className = 'date';
			span.innerHTML = `Joined ${list[i].registered.date}`;
			divJoined.appendChild(span);

		}
	}
}


 

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
 


// Call functions
showPage(data, 1);
