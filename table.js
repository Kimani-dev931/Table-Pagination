
// document.addEventListener('DOMContentLoaded', function() {
//     const pageSizeElement = document.getElementById('page-size');
//     const firstButton = document.querySelector('.index_buttons button:nth-child(1)');
//     const previousButton = document.querySelector('.index_buttons button:nth-child(2)');
//     const nextButton = document.querySelector('.index_buttons button:nth-child(3)');
//     const lastButton = document.querySelector('.index_buttons button:nth-child(4)');

//     let currentPage = 1;
//     let pageSize = parseInt(pageSizeElement.value);
//     let totalRecords = 0;
//     let totalPages = 0;

//     function updatePaginationText(page, totalPages, totalRecords) {
//         const paginationText = document.querySelector('.footer span');
//         paginationText.textContent = `showing page ${page} of ${totalPages} pages in ${totalRecords} entries`;
//     }

//     function fetchData(pageNumber, pageSize) {
//         const baseURL = "http://localhost:4100/api/rest/teachers";
//         const url = `${baseURL}?page=${pageNumber}&pageSize=${pageSize}`;

//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 const { totalRecords: total, pages, page, data: teachers } = data;
//                 totalRecords = total;
//                 totalPages = pages;

//                 updatePaginationText(page, totalPages, totalRecords);

//                 const tableBody = document.querySelector('#tbody');
//                 tableBody.innerHTML = '';

//                 teachers.forEach(teacher => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                         <td>${teacher.first_name}</td>
//                         <td>${teacher.last_name}</td>
//                         <td>${teacher.tsc_number}</td>
//                         <td>${teacher.id_number}</td>
//                         <td>${teacher.username}</td>
//                         <td>${teacher.phone_number}</td>
//                         <td>${teacher.education_level}</td>
//                         <td>${teacher.email}</td>
//                     `;
//                     tableBody.appendChild(row);
//                 });
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }

//     firstButton.addEventListener('click', function() {
//         currentPage = 1;
//         fetchData(currentPage, pageSize);
//     });

//     previousButton.addEventListener('click', function() {
//         if (currentPage > 1) {
//             currentPage--;
//             fetchData(currentPage, pageSize);
//         }
//     });

//     nextButton.addEventListener('click', function() {
//         if (currentPage < totalPages) {
//             currentPage++;
//             fetchData(currentPage, pageSize);
//         }
//     });

//     lastButton.addEventListener('click', function() {
//         currentPage = Math.ceil(totalRecords / pageSize); 
//         fetchData(currentPage, pageSize);
//     });

//     pageSizeElement.addEventListener('change', function() {
//         pageSize = parseInt(this.value);
//         fetchData(1, pageSize);
//     });

    
//     fetchData(currentPage, pageSize);
// });

document.addEventListener('DOMContentLoaded', function() {
    const pageSizeElement = document.getElementById('page-size');
    const firstButton = document.querySelector('.index_buttons button:nth-child(1)');
    const previousButton = document.querySelector('.index_buttons button:nth-child(2)');
    const nextButton = document.querySelector('.index_buttons button:nth-child(3)');
    const lastButton = document.querySelector('.index_buttons button:nth-child(4)');
    const spinner = document.getElementById('spinner');
    const overlay = document.getElementById('overlay');
   

    let currentPage = 1;
    let pageSize = parseInt(pageSizeElement.value);
    fetchData(currentPage, pageSize);
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
        const baseURL = "http://localhost:4100/api/rest/teachers";
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

    firstButton.addEventListener('click', function() {
        if(currentPage = 1){
        fetchData(currentPage, pageSize);
        firstButton.disabled = true;
        lastButton.disabled = false;
        }
    });

    previousButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchData(currentPage, pageSize);
            nextButton.disabled = false;
            lastButton.disabled = false;
        }else if(currentPage == totalPages){
            lastButton.disabled = true;
        }else {
            previousButton.disabled = true;
            previousButton.removeClass('hover')
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) { 
            currentPage++;
            fetchData(currentPage, pageSize);
            previousButton.disabled = false;
            firstButton.disabled = false;
        }else{
            nextButton.disabled = true;
            
        }
    });

    lastButton.addEventListener('click', function() {
        lastButton.disabled = true;
        firstButton.disabled = false;
        currentPage = Math.ceil(totalRecords / pageSize);
        fetchData(currentPage, pageSize);
     
    });

    pageSizeElement.addEventListener('change', function() {
        pageSize = parseInt(this.value);
        currentPage = 1;
        fetchData(currentPage, pageSize);
    });

    fetchData(currentPage, pageSize);
});












