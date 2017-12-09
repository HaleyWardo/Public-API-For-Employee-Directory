

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

const formatName = function(name) {
    return name[0].toUpperCase() + name.slice(1);
};

$.ajax({
    url: 'https://randomuser.me/api/?results=12&inc=name,picture,email,location',
    dataType: 'json',
    success: function(response) {
        const employees = response.results;

        for (let i = 0; i < employees.length; i++) {
            const employeeEmail = employees[i].email;
            const employeeCity = formatName(employees[i].location.city);
            const employeeFirstName = formatName(employees[i].name.first);
            const employeeLastName = formatName(employees[i].name.last);
            const employeeFullName = `${employeeFirstName} ${employeeLastName}`;
            const employeeImage = employees[i].picture.medium;
            
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
        }
    }
});