let listaNombresGastos = [];
let listaValoresGastos = [];
let editIndex = -1; // Variable para almacenar el índice del gasto que se va a editar

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;

    if (nombreGasto === "") {
        alert("Por favor, seleccione un tipo de gasto.");
        return;
    }

    if (editIndex >= 0) {
        // Actualizar gasto existente
        listaNombresGastos[editIndex] = nombreGasto;
        listaValoresGastos[editIndex] = valorGasto;
        editIndex = -1; // Resetear el índice de edición
    } else {
        // Agregar nuevo gasto
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
    }

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)}
                      <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                      <button onclick="editarGasto(${posicion});">Editar</button>
                      </li>`;
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);

    // Mostrar alertas según el total de gastos
    if (totalGastos > 2000000) {
        alert('¡Peligro! Tus gastos mensuales han excedido 2 millones de pesos.');
    } else {
        alert('¡Felicitaciones! Estás dentro del límite de gastos mensuales.');
    }

    limpiarCampos();
}

function limpiarCampos() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function editarGasto(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    editIndex = posicion; // Guardar el índice del gasto que se está editando
}
