document.addEventListener('DOMContentLoaded', () => { 
    /* Espera que la página HTML se cargue antes de ejecutar el bloque de código siguiente */
    const loader = document.getElementById('loader'); 
    const dataContainer = document.getElementById('cont-dt'); 
    const dataTableBody = document.getElementById('tabla-bd');
    const loadUsersBtn = document.getElementById('users-btn');

    /* Función para que al dar clic al botón se lea la tabla */
    loadUsersBtn.addEventListener('click', () => { /* Al hacer click */
        loader.classList.remove('d-none'); /* Muestra el spinner de carga */
        dataContainer.classList.add('d-none'); /* Oculta la tabla anterior */
        dataTableBody.innerHTML = ''; // Limpia el contenido HTML anterior

        /* Función para realizar una solicitud HTTP */
        fetch("https://reqres.in/api/users?delay=3") /* Solicitud del tipo GET */
            .then(response => response.json()) /* Método para función asincrónica que recibe la respuesta de fetch y la convierte de JSON a objeto JS */
            .then(data => {
                const users = data.data; /* Accede a los los datos obtenidos de la API y los guarda en la variable users */
                users.forEach(element => { /* Se itera sobre cada elemento del arreglo users */
                    const row = document.createElement('tr'); /* Se crea una fila de la tabla y se inserta el contenido en el HTML dinámicamente */
                    /* Crear celdas para cada elemento */
                    row.innerHTML = `
                    <td> ${element.id} </td>
                    <td> ${element.first_name} </td>
                    <td> ${element.last_name} </td>
                    <td> ${element.email} </td>
                    <td class="text-center"> <img src="${element.avatar}" class="img-fluid rounded-circle"></td>
                    `;
                    dataTableBody.appendChild(row); /* Añade el contenido al final del body de la tabla */
                });
                loader.classList.add('d-none'); /* Oculta el spinner de carga */
                dataContainer.classList.remove('d-none'); /* Muestra la tabla actual */
            })
            .catch(error => {
                console.error('Error fetching the data', error);
                loader.innerHTML = `<p>Error loading data</p>`;
            });
    });
});
