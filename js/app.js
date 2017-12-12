/////////////////
/// FUNCTIONS ///
/////////////////

/**
 * Creates an element.
 * @param {object} parentElement 
 * @param {string} tagName 
 * @param {string} className 
 * @param {string} innerHTML
 * @returns the created element
 */
const createChildElement = (parentElement, tagName, className, innerHTML) => {
    const createdElement = document.createElement(tagName);
    parentElement.appendChild(createdElement);
    if (className) {
        createdElement.className = className;
    }
    if (innerHTML) {
        createdElement.innerHTML = innerHTML;
    }
    return createdElement;
};

/**
 * Capitalizes the first letter in a string.  Handles spaced strings.
 * @param {string} name 
 * @returns a capitalized string
 */
const formatName = function(name) {
    const splitName = name.split(' ');
    let result = [];
    for (let i = 0; i < splitName.length; i++) {
        const word = splitName[i];
        result.push(word[0].toUpperCase() + word.slice(1));
    }
    return result.join(' ');
};

/////////////////
//AJAX REQUEST///
/////////////////
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob',
    dataType: 'json',
    success: function(response) {
        const employees = response.results;

        //MAIN EMPLOYEE DIRECTORY
        for (let i = 0; i < employees.length; i++) {
            const employeeEmail = employees[i].email;
            const employeeCity = formatName(employees[i].location.city);
            const employeeFirstName = formatName(employees[i].name.first);
            const employeeLastName = formatName(employees[i].name.last);
            const employeeFullName = `${employeeFirstName} ${employeeLastName}`;
            const employeeImage = employees[i].picture.medium;
            const employeeImageLarge = employees[i].picture.large;

            const employeePhone = employees[i].cell;
            const employeeBirthday = employees[i].dob;

            const employeeStreet = formatName(employees[i].location.street);
            const employeeState = formatName(employees[i].location.state);
            const employeeZip = employees[i].location.postcode;
            const employeeAddress = `${employeeStreet} ${employeeCity}, ${employeeState} ${employeeZip}`;
            
            const mainContainer = document.querySelector('.main-container');
            const memberContainer = createChildElement(mainContainer, 'div', 'grid__item');  

            //Container for each member
            let memberContent = 
                `<div class="member__img">
                    <img src="${employeeImage}">
                </div>
                <div class="member__info">
                    <ul class="member__item">
                        <li id="name">${employeeFullName}</li>
                        <li id="email">${employeeEmail}</li>
                        <li id="city">${employeeCity}</li>
                    </ul>
                </div>`;
            memberContainer.innerHTML = memberContent;
           
            // MODAL POP-UP            
            memberContainer.addEventListener('click', (e) => {
                const modalOverlay = document.querySelector('.modal__overlay');
                modalOverlay.style = 'display: inline-block';

                let modalContent = 
                `<div class="modal__container">
                    <div>
                        <span class="modal--close">&times;</span>
                        <ul class="modal__list">
                            <img src="${employeeImageLarge}" id="modal--image">
                            <li id="modal__name">${employeeFullName}</li>
                            <li>${employeeEmail}</li>
                            <li>${employeeCity}</li>
                        </ul>
                    </div>
                    <div>
                        <ul class="modal__list2">
                            <li>${employeePhone}</li>
                            <li>${employeeAddress}</li>
                            <li>Birthday: ${new Date(employeeBirthday).toLocaleDateString('en-US')}</li>
                        </ul>
                        <img class="arrowLeft" src="images/arrow-left.png">
                        <img class="arrowRight" src="images/arrow-right.png">
                    </div>
                </div>`;
                modalOverlay.innerHTML = modalContent;

                modalOverlay.addEventListener('click', (e) => {
                    if (e.target.className === "arrowLeft"){
                        console.log('left')
                    }
                    if (e.target.className === "arrowRight"){
                        console.log('right')
                    }
                });

                //Event listener for closing modal
                const modalClose = document.querySelector('.modal--close');
                modalClose.addEventListener('click', () => {
                    modalOverlay.style = 'display: none';
                    $('.modal__container').remove();
                });
            });  

            //Employee search with auto complete feature
            const datalist = document.querySelector('#searchableEmployees');
            const employeeSearch = document.querySelector('.employee__search');
            createChildElement(datalist, 'option', null, employeeFullName); 

            employeeSearch.addEventListener('keyup', () => {
                if (employeeFullName.toUpperCase().startsWith(employeeSearch.value.toUpperCase())) {
                    memberContainer.style = 'display: ""';
                }
                else {
                    memberContainer.style = 'display: none';
                }
            });
        }
    }
});