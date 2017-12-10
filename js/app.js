
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
    // Split by spaces '1234 fake street' => [ '1234', 'fake', 'street' ];
    const splitName = name.split(' ');

    // Create a new array to store our capitalized strings
    let result = [];
    for (let i = 0; i < splitName.length; i++) {
        // Get the i-indexed word from the string
        const word = splitName[i];

        // Capitalize the first letter + the remaining text and push it to our result array
        result.push(word[0].toUpperCase() + word.slice(1));
    }

    // Join the result strings back together with spaces as the separator
    return result.join(' ');
};

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

            const employeePhone = employees[i].cell;
            const employeeBirthday = employees[i].dob;

            const employeeStreet = formatName(employees[i].location.street);
            const employeeState = formatName(employees[i].location.state);
            const employeeZip = employees[i].location.postcode;
            const employeeAddress = `${employeeStreet} ${employeeCity}, ${employeeState} ${employeeZip}`;
            
            const mainContainer = document.querySelector('.main-container');
            
            //Member container for each member
            const memberContainer = createChildElement(mainContainer, 'div', 'grid__item');  

            const memberImgContainer = createChildElement(memberContainer, 'div');   //container for picture
            const memberImg = createChildElement(memberImgContainer, 'img');
            memberImg.src = employeeImage;
            
            const memberInfoContainer = createChildElement(memberContainer, 'div');   //container for member info
            const memberInfoUl = createChildElement(memberInfoContainer, 'ul');  //list for member info
            createChildElement(memberInfoUl, 'li', 'name', employeeFullName);
            createChildElement(memberInfoUl, 'li', 'email', employeeEmail);
            createChildElement(memberInfoUl, 'li', 'city', employeeCity);
            
            //MODAL POP-UP
            memberContainer.addEventListener('click', (e) => {
                const modalOverlay = document.querySelector('.modal__overlay');
                modalOverlay.style = 'display: inline-block';

                const modalContainer = createChildElement(modalOverlay, 'div', 'modal__container');
                const modalContent1 = createChildElement(modalContainer, 'div');

                createChildElement(modalContent1, 'span', 'modal__close', '&times;');

                const modalContent1Ul = createChildElement(modalContent1, 'ul', 'modal__list');
                const modalImg = createChildElement(modalContent1Ul, 'img', 'modal--image', employeeImage);
                modalImg.src = employees[i].picture.large;

                createChildElement(modalContent1Ul, 'li', 'modal__name', employeeFullName);
                createChildElement(modalContent1Ul, 'li', null, employeeEmail);
                createChildElement(modalContent1Ul, 'li', null, employeeCity);

                const modalContent2 = createChildElement(modalContainer, 'div');
                const modalContent2Ul = createChildElement(modalContent2, 'ul');
                createChildElement(modalContent2Ul, 'li', null, employeePhone);
                createChildElement(modalContent2Ul, 'li', null, employeeAddress);
                createChildElement(modalContent2Ul, 'li', null, 'Birthday: ' + new Date(employeeBirthday).toLocaleDateString('en-US'));


                //Event listener for closing modal
                const modalClose = document.querySelector('.modal__close');
                modalClose.addEventListener('click', () => {
                    modalOverlay.style = 'display: none';
                    modalContainer.remove();
                });
            });  
        }
    }
});