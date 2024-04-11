document.addEventListener('DOMContentLoaded', function() {
    const pageSizeElement = document.getElementById('page-size');
    const firstButton = document.querySelector('.index_buttons button:nth-child(1)');
    const previousButton = document.querySelector('.index_buttons button:nth-child(2)');
    const nextButton = document.querySelector('.index_buttons button:nth-child(3)');
    const lastButton = document.querySelector('.index_buttons button:nth-child(4)');
    const spinner = document.getElementById('spinner');
    const overlay = document.getElementById('overlay');
    const pageInput = document.getElementById('page-input');
    

    let currentPage = 1;
    let pageSize = parseInt(pageSizeElement.value);
    let totalRecords = 0;
    let totalPages = 0;

    function showSpinner() {
        spinner.style.display = 'block';
        overlay.style.display = 'block';
    }

    function hideSpinner() {
        spinner.style.display = 'none';
        overlay.style.display = 'none';
    }

    function updatePaginationText(page, totalPages, totalRecords) {
        const paginationText = document.querySelector('.footer span');
        paginationText.textContent = `showing page ${page} of ${totalPages} pages in ${totalRecords} entries`;
    }

    function fetchData(pageNumber, pageSize) {
        showSpinner();
        const baseURL = "http://172.20.94.28:4100/api/rest/teachers";
        const url = `${baseURL}?page=${pageNumber}&pageSize=${pageSize}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { totalRecords: total, pages, page, data: teachers } = data;
                totalRecords = total;
                totalPages = pages;

                updatePaginationText(page, totalPages, totalRecords);

                const tableBody = document.querySelector('#tbody');
                tableBody.innerHTML = '';

                teachers.forEach(teacher => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${teacher.first_name}</td>
                        <td>${teacher.last_name}</td>
                        <td>${teacher.tsc_number}</td>
                        <td>${teacher.id_number}</td>
                        <td>${teacher.username}</td>
                        <td>${teacher.phone_number}</td>
                        <td>${teacher.education_level}</td>
                        <td>${teacher.email}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => {
                hideSpinner();
            });
    }

    

    function jumpToPage() {
        const page = parseInt(pageInput.value);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            currentPage = page;
            fetchData(currentPage, pageSize);
        } else {
            alert('Please enter a valid page number.');
        }
    }

    
    pageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            jumpToPage();
        }
    });




    firstButton.addEventListener('click', function() {
        currentPage = 1;
        fetchData(currentPage, pageSize);
    });

    previousButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchData(currentPage, pageSize);
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            fetchData(currentPage, pageSize);
        }
    });

    lastButton.addEventListener('click', function() {
        currentPage = totalPages;
        fetchData(currentPage, pageSize);
    });

    pageSizeElement.addEventListener('change', function() {
        pageSize = parseInt(this.value);
        currentPage = 1;
        fetchData(currentPage, pageSize);
    });

    fetchData(currentPage, pageSize);

    // document.querySelector('.searchbtn').addEventListener('click', function() {
    //     var columnValue = document.querySelector('.column-select').value;
    //     var relationValue = document.querySelector('.relations-select').value;
    //     var searchItemValue = document.querySelector('.btn').value;

    //     var filter = `${columnValue}${relationValue}${searchItemValue}`;

    //     const baseURL = "http://localhost:4100/api/rest/teachers";
    //     const page = 1; 
    //     const pageSize = parseInt(document.getElementById('page-size').value);
    //     const url = `${baseURL}?page=${page}&pageSize=${pageSize}&filter=${filter}`;

    //     showSpinner();

    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => {
    //             const { totalRecords: total, pages, page, data: teachers } = data;
    //             totalRecords = total;
    //             totalPages = pages;

    //             updatePaginationText(page, totalPages, totalRecords);

    //             const tableBody = document.querySelector('#tbody');
    //             tableBody.innerHTML = '';

    //             teachers.forEach(teacher => {
    //                 const row = document.createElement('tr');
    //                 row.innerHTML = `
    //                     <td>${teacher.first_name}</td>
    //                     <td>${teacher.last_name}</td>
    //                     <td>${teacher.tsc_number}</td>
    //                     <td>${teacher.id_number}</td>
    //                     <td>${teacher.username}</td>
    //                     <td>${teacher.phone_number}</td>
    //                     <td>${teacher.education_level}</td>
    //                     <td>${teacher.email}</td>
    //                 `;
    //                 tableBody.appendChild(row);
    //             });
    //         })
    //         .catch(error => console.error('Error fetching data:', error))
    //         .finally(() => {
    //             hideSpinner();
    //         });
    // });
    document.querySelector('.searchbtn').addEventListener('click', function() {
    var columnValue = document.querySelector('.column-select').value;
    var relationValue = document.querySelector('.relations-select').value;
    var searchItemValue = document.querySelector('.btn').value;

    var filter = `${columnValue}${relationValue}${searchItemValue}`;

    const baseURL = "http://172.20.94.28:4100/api/rest/teachers";
    const page = 1; 
    const pageSize = parseInt(document.getElementById('page-size').value);
    const url = `${baseURL}?page=${page}&pageSize=${pageSize}&filter=${filter}`;

    showSpinner();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { totalRecords: total, pages, page } = data;
            totalRecords = total;
            totalPages = pages;

            updatePaginationText(page, totalPages, totalRecords);

            
            let teachersData = data.data; 
            let teachers = Array.isArray(teachersData) ? teachersData : [teachersData];

            const tableBody = document.querySelector('#tbody');
            tableBody.innerHTML = '';

            teachers.forEach(teacher => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${teacher.first_name}</td>
                    <td>${teacher.last_name}</td>
                    <td>${teacher.tsc_number}</td>
                    <td>${teacher.id_number}</td>
                    <td>${teacher.username}</td>
                    <td>${teacher.phone_number}</td>
                    <td>${teacher.education_level}</td>
                    <td>${teacher.email}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data');
        })
        .finally(() => {
            hideSpinner();
        });
});
   

});



var fieldIndex = 1; 

function openNav() {
    var sidenav = document.getElementById("mySidenav");
    
    if (sidenav.style.width === "650px") {
        sidenav.style.width = "0";
    } else {
        sidenav.style.width = "650px";
        adjustSideNavHeight(); 
    }
}

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
     
  }

  function addField() {
    fieldIndex++;
    var container = document.getElementById("fieldsContainer");
    var fieldDiv = document.createElement("div");
    fieldDiv.classList.add("field-group"); 
    fieldDiv.innerHTML = `
      <select name="select${fieldIndex}">
        <option value="">columns</option>
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
        <option value="tsc_number">TSC Number</option>
        <option value="id_number">ID Number</option>
        <option value="username">UserName</option>
        <option value="phone_number">Phone Number</option>
        <option value="education_level">Education Level</option>
        <option value="email">Email</option>
      </select>
      
      <select name="select${fieldIndex}">
        <option value="">relation</option>
        <option value=":in:">In</option>
        <option value=":inn:">Is not null</option>
        <option value=":eq:">Equal to</option>
        <option value=":nq:">Not equal</option>
        <option value=":gt:">Greater than</option>
        <option value=":gte:">Greater than or equal to</option>
        <option value=":lt:">Lass than</option>
        <option value=":lte:">Less than or equal</option>
        <option value=":bt:">between</option>
        <option value=":sw:">startwith</option>
        <option value=":ew:">endswith</option>
        <option value=":lm:">contains</option>
      </select>

      <input type="text" name="textfield${fieldIndex}" placeholder="enter search value">

      <select name="select${fieldIndex+1}">
        <option value="">Joiner</option>
        <option value="%7CAND%7C">AND</option>
        <option value="%7COR%7C">OR</option>
        <option value="NULL">NULL</option>
      </select>
    `;
    container.appendChild(fieldDiv);

  
    adjustSideNavHeight();
  }

  function deleteFields() {
    var container = document.getElementById("fieldsContainer");
    container.removeChild(container.lastChild);
    fieldIndex--;

    
    adjustSideNavHeight();
  }

  function adjustSideNavHeight() {
    var sidenav = document.getElementById("mySidenav");
    var fieldsContainer = document.getElementById("fieldsContainer");
    var height = fieldsContainer.clientHeight + 120; 
    sidenav.style.height = height + "px";
  }


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const baseURL = "http://172.20.94.28:4100/api/rest/teachers";
    const pageSizeElement = document.getElementById('page-size');
    let pageSize = parseInt(pageSizeElement.value);

    function showSpinner() {
        const spinner = document.getElementById('spinner');
        const overlay = document.getElementById('overlay');
        spinner.style.display = 'block';
        overlay.style.display = 'block';
    }

    function hideSpinner() {
        const spinner = document.getElementById('spinner');
        const overlay = document.getElementById('overlay');
        spinner.style.display = 'none';
        overlay.style.display = 'none';
    }

    function updatePaginationText(page, totalPages, totalRecords) {
        const paginationText = document.querySelector('.footer span');
        paginationText.textContent = `showing page ${page} of ${totalPages} pages in ${totalRecords} entries`;
    }

    function updateTableBody(teachersData) {
    const tableBody = document.querySelector('#tbody');
    tableBody.innerHTML = '';
    
    
    let teachers = Array.isArray(teachersData) ? teachersData : [teachersData];
    
    teachers.forEach(teacher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.first_name || ''}</td>
            <td>${teacher.last_name || ''}</td>
            <td>${teacher.tsc_number || ''}</td>
            <td>${teacher.id_number || ''}</td>
            <td>${teacher.username || ''}</td>
            <td>${teacher.phone_number || ''}</td>
            <td>${teacher.education_level || ''}</td>
            <td>${teacher.email || ''}</td>
        `;
        tableBody.appendChild(row);
    });
}



    function fetchTeachers(filter) {
        console.log("Filter string:", filter);
        showSpinner();
        const page = 1;
        const url = `${baseURL}?page=${page}&pageSize=${pageSize}&filter=${filter}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { totalRecords: total, pages, page, data: teachers } = data;

                if (teachers.length === 0) {
                    alert('No record found');
                } else {
                    updatePaginationText(page, pages, total);
                    updateTableBody(teachers);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Data not found');
            })
            .finally(() => {
                hideSpinner();
            });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const fieldGroups = document.querySelectorAll('.field-group');
        let filter = '';
        
        fieldGroups.forEach((group, index) => {
            const selects = group.querySelectorAll('select');
            const textField = group.querySelector('input[type="text"]');

            if (selects[0].value && selects[1].value && textField.value) {
                filter += `${selects[0].value}${selects[1].value}${textField.value}`;
                
                if (index < fieldGroups.length - 1 && selects[2] && selects[2].value) {
                    filter += `${selects[2].value}`;
                }
            }
        });

        if (filter !== '') {
            fetchTeachers(filter);
        } else {
            alert('Please provide search criteria.');
        }
    });
});

