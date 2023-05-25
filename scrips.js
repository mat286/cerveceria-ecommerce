const nombrecomprovation = "mateo";
const contracomprovation = "1234test";
const nombrecomprovationE = "elal";
const cuenta = false;

const categoriasT = document.querySelectorAll('#categoriasT .categoriaT');
const contenedorPreguntasT = document.querySelectorAll('.contenedor-preguntasT');
let categoriaActivaT = null;

const categoriasC = document.querySelectorAll('#categoriasC .categoriaC');
const contenedorPreguntasC = document.querySelectorAll('.contenedor-preguntasC');
let categoriaActivaC = null;

let productList = [];
let carrito = [];
let total = 0;
let order = {
    items: []
};

const categorias = document.querySelectorAll('#categorias .categoria');
const contenedorPreguntas = document.querySelectorAll('.contenedor-preguntas');
const preguntas = document.querySelectorAll('.preguntas .contenedor-pregunta');
let categoriaActiva = null;
let excel = [
    {
        id: 1,
        name: 'Ales belgas',
        price: 100,
        image: 'https://r2.starryai.com/results/19740792/f195d655-63d3-4a7d-b1ff-72b9fc912601.webp',
        stockVenta: 10,
        estilo: 'rubia',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptate unde sapiente illo, voluptatum fuga, delectus non iusto doloremque ducimus autem fugit distinctio debitis quo tenetur! Accusamus ex corporis voluptates saepe!',
        stockPre: 0,
        stockP2p: 0
    },
    {
        id: 2,
        name: 'Lager Pilsen',
        price: 200,
        image: 'https://r2.starryai.com/results/350873473/bf0ddb1c-26d0-4db7-bf10-74a25514e821.webp',
        stockVenta: 10,
        estilo: 'negra',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptate unde sapiente illo, voluptatum fuga, delectus non iusto doloremque ducimus autem fugit distinctio debitis quo tenetur! Accusamus ex corporis voluptates saepe!',
        stockPre: 12,
        stockP2p: 0
    },
    {
        id: 3,
        name: 'Lager Especial.',
        price: 150,
        image: 'https://r2.starryai.com/results/19740792/1eb8fd21-ac57-4582-a08d-3e8ebdaac683.webp',
        stockVenta: 12,
        estilo: 'negra',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptate unde sapiente illo, voluptatum fuga, delectus non iusto doloremque ducimus autem fugit distinctio debitis quo tenetu',
        stockPre: 12,
        stockP2p: 12
    }
];

preguntas.forEach((pregunta) => {
    pregunta.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('activa');

        const respuesta = pregunta.querySelector('.respuesta');
        const alturaRealRespuesta = respuesta.scrollHeight;

        if (!respuesta.style.maxHeight) {
            // Si esta vacio el maxHeight entonces ponemos un valor.
            respuesta.style.maxHeight = alturaRealRespuesta + 'px';
        } else {
            respuesta.style.maxHeight = null;
        }

        // [Opcional] Reiniciamos las demas preguntas
        preguntas.forEach((elemento) => {
            // Solamente queremos ejecutar el codigo para las preguntas que no 
            // sean la pregunta a la que le dimos click.
            if (pregunta !== elemento) {
                elemento.classList.remove('activa');
                elemento.querySelector('.respuesta').style.maxHeight = null;
            }
        });


    });
});

categorias.forEach((categoria) => {
    categoria.addEventListener('click', (e) => {
        categorias.forEach((elemento) => {
            elemento.classList.remove('activa');
        });

        e.currentTarget.classList.toggle('activa');
        console.log(categoria.dataset.categoria);
        categoriaActiva = categoria.dataset.categoria;


        // Activamos el contenedor de preguntas que corresponde
        contenedorPreguntas.forEach((contenedor) => {
            if (contenedor.dataset.categoria === categoriaActiva) {
                contenedor.classList.add('activo');
            } else {
                contenedor.classList.remove('activo');
            }
        });
    });
});

function filtroBotones(listaDeExcel) {
    let productsHTML = '';
    listaDeExcel.forEach(p => {

        let buttonHTMLpre = `<input type="button" value="pre-venta" class="botonn" onclick="botonAtienda('pre')">`;
        let buttonHTMLp2p = `<input type="button" value="p2p" class="botonn" onclick="botonAtienda('p2p')">`;
        let buttonHTMLventa = `<input type="button" value="venta" class="botonn" onclick="botonAtienda('venta')">`;
        let tituloh3 = `<h3>disponible en:</h3>`;

        if (p.stockVenta <= 0) {
            buttonHTMLventa = ``;
        }
        if (p.stockPre <= 0) {
            buttonHTMLpre = ``;
        }
        if (p.stockP2p <= 0) {
            buttonHTMLp2p = ``;
        }
        if (p.stockVenta <= 0 && p.stockPre <= 0 && p.stockP2p <= 0) {
            tituloh3 = `<h3>Por el momento no se encuentra disponible</h3>`;
        }
        //si queres agregar las estrellas de puntacion pega esto en el div de classe iz: <img src="https://static.wixstatic.com/media/10a324_36438106eb20454584c1b440bb654e61~mv2.png/v1/crop/x_6,y_13,w_760,h_215/fill/w_120,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/10a324_36438106eb20454584c1b440bb654e61~mv2.png" alt="">
        productsHTML += `
        <div class="product-list" data-aos="fade-right">
            <div class="iz">
                <h3>${p.name}</h3>
                <img src="${p.image}">                
            </div>
            <div class="dere">
                <h3>${p.estilo}</h3>
                <p>${p.info}</p>
                <h3>Detalles</h3>
                <p>5.2% alcohol <br>192 calorías, 355 ml.</p>
                ${tituloh3}
                ${buttonHTMLpre}
                ${buttonHTMLp2p}
                ${buttonHTMLventa}
            </div>
        </div>`;
    });
    if (document.getElementById('todo') !== null) {
        document.getElementById('todo').innerHTML = productsHTML;
    }
}

filtroBotones(excel);
productList = excel;
//let botoneAtienda = "p2p";//no anda cuando se conecte a node.js terminalo bien

function botonAtienda(parametro) {
    //botoneAtienda = parametro;//no anda cuando se conecte a node.js terminalo bien
    //console.log(botoneAtienda);//no anda cuando se conecte a node.js terminalo bien
    location.href = "tienda.html";
    categoriasT.forEach((categoria) => {
        if (categoria.dataset.categoria == "p2p") {
            HTMLElement.click(categoria);
        }
    });
}


function botonAtiendaCategori(parametro) { //no anda cuando se conecte a node.js terminalo bien
    //const ct = categoriasT.find(p => p.dataset.categoria === "p2p");
    console.log(botoneAtienda);

    if (parametro == "p2p") {

        botoneAtienda = "p2p";
    } else if (parametro == "venta") {

        botoneAtienda = "venta";
    } else if (parametro == "pre") {

        botoneAtienda = "preVenta";
    }
    categoriasT.forEach((categoria) => {
        if (categoria.dataset.categoria == botoneAtienda) {
            console.log("es igual");
        } else {
            const cat = categoriasT.find(p => p.dataset.categoria === botoneAtienda);
            categoriasT.forEach((elemento) => {
                //console.log(categoriasT);
                elemento.classList.remove('activa');
                cat.currentTarget.classList.toggle('activa');
                console.log(categoria.dataset.categoria);
                categoriaActivaT = categoria.dataset.categoria;
            });
            contenedorPreguntasT.forEach((contenedor) => {
                //console.log(contenedorPreguntasT);
                //console.log(contenedor.dataset.categoria);
                if (contenedor.dataset.categoria === categoriaActivaT) {
                    contenedor.classList.add('activo');
                } else {
                    contenedor.classList.remove('activo');
                }
            });

        }
    });
}



function tienda() {

    document.getElementById("product-cards").style.display = "block";
    document.getElementById("order").style.display = "none";

    categoriasT.forEach((categoria) => {
        //console.log(categoria);
        categoria.addEventListener('click', (e) => {
            categoriasT.forEach((elemento) => {
                //console.log(elemento.classList);
                elemento.classList.remove('activa');
            });

            e.currentTarget.classList.toggle('activa');
            //console.log(categoria.dataset.categoria);
            categoriaActivaT = categoria.dataset.categoria;


            // Activamos el contenedor de preguntas que corresponde
            contenedorPreguntasT.forEach((contenedor) => {
                //console.log(contenedorPreguntasT);
                //console.log(contenedor.dataset.categoria);
                if (contenedor.dataset.categoria === categoriaActivaT) {
                    contenedor.classList.add('activo');
                } else {
                    contenedor.classList.remove('activo');
                }
            });
        });
    });
    let buttonHTMLventa = ``;
    let buttonHTMLpre = ``;
    let buttonHTMLp2p = ``;
    let nadaPro = ` <h1>Lamentamos informarte que por el momento no se encuentra ningun producto disponible</h1>`;
    excel.forEach(p => {
        if (p.stockVenta > 0) {
            buttonHTMLventa += `<div class="product-conteiner" data-aos="flip-right">
                <h3>${p.name}</h3>
                <img src="${p.image}" />
                <h3>${p.estilo}</h3>
                <div>
                    <p>${p.info}</p>
                    <h3>Detalles</h3>
                    <p>5.2% alcohol <br>192 calorías, 355 ml.</p>
                    <button class="button-add" onclick="add(${p.id}, ${p.price}, 'venta')">$${p.price}</button>                  
                </div>
            </div>`;
        }
        if (p.stockPre > 0) {
            buttonHTMLpre += `<div class="product-conteiner" data-aos="flip-right">
                <h3>${p.name}</h3>
                <img src="${p.image}" />
                <h3>${p.estilo}</h3>
                <div>
                    <p>${p.info}</p>
                    <h3>Detalles</h3>
                    <p>5.2% alcohol <br>192 calorías, 355 ml.</p>
                    <button class="button-add" onclick="add(${p.id}, ${p.price}, 'pre')">$${p.price}</button>                  
                </div>
            </div>`;
        }
        if (p.stockP2p > 0) {
            buttonHTMLp2p += `
            <div class="product-conteiner" data-aos="flip-right"">
                <h3>${p.name}</h3>
                <img src="${p.image}" />
                <h3>${p.estilo}</h3>
                <div>
                    <p>${p.info}</p>
                    <h3>Detalles</h3>
                    <p>5.2% alcohol <br>192 calorías, 355 ml.</p>
                    <button class="button-add" onclick="add(${p.id}, ${p.price}, 'p2p')">$${p.price}</button>                  
                </div>  
            </div>`;
        }
    });

    if (buttonHTMLp2p === ``) buttonHTMLp2p += nadaPro;
    if (buttonHTMLpre === ``) buttonHTMLpre += nadaPro;
    if (buttonHTMLventa === ``) buttonHTMLventa += nadaPro;

    document.getElementById('medio-pre').innerHTML = buttonHTMLpre;
    document.getElementById('medio-venta').innerHTML = buttonHTMLventa;
    document.getElementById('medio-p2p').innerHTML = buttonHTMLp2p;

}

if (document.getElementById('medio-pre') !== null) {
    tienda();
    //botonAtiendaCategori(botoneAtienda);
}

function add(productId, price, cualTienda) {
    const product = productList.find(p => p.id === productId);
    if (cualTienda === "p2p") {
        product.stockP2p--;
    } else if (cualTienda === "venta") {
        product.stockVenta--;
    } else if (cualTienda === "pre") {
        product.stockPre--;
    }
    order.items.push(productList.find(p => p.id === productId));

    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `<script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
    <lord-icon src="https://cdn.lordicon.com/udbbfuld.json" trigger="hover" colors="primary:#848484"
        style="width:50px;height:50px">
    </lord-icon>Carrito $${total}`;
    tienda();
}

async function showOrder() {
    document.getElementById("product-cards").style.display = "none";
    document.getElementById("order").style.display = "block";
    document.getElementById("order-total").innerHTML = ` Total: $${total}`;

    let productsHTML = `
    <tr>
        <th>Cantidad</th>
        <th>Detalle</th>
        <th>Subtotal</th>
    </tr>`
        ;
    order.items.forEach(p => {

        productsHTML +=
            `<tr>
            <td>1</td>
            <td>${p.name}</td>
            <td>$${p.price}</td>
        </tr>`
    });
    document.getElementById('order-table').innerHTML = productsHTML;
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function algo(){
    let oscure =document.getElementById("oscure");
    oscure.classList.add("active");
}
function cerrar(){
    let oscure =document.getElementById("oscure");
    oscure.classList.remove("active");
}


async function pay() {
    if (!cuenta) return window.alert("necesitas tener una cuenta perdon"); //---------agregado momenteneo-------------- 
    if (carrito.length == 0) {
        window.alert("Tu carrito no tiene ningun producto");
    } else {
        try {

            order.shipping = {
                nombre: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                city: document.getElementById("city").value,
                addressLine2: document.getElementById("addressLine2").value,
                state: document.getElementById("dep2").value,
            };

            const preference = await (await fetch("/api/pay", {
                method: "post",
                body: JSON.stringify(order),
                headers: {
                    "Content-Type": "application/json"
                }
            })).json();

            var script = document.createElement("script");

            // The source domain must be completed according to the site for which you are integrating.
            // For example: for Argentina ".com.ar" or for Brazil ".com.br".
            script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
            script.type = "text/javascript";
            script.dataset.preferenceId = preference.preferenceId;
            document.getElementById("order-actions").innerHTML = "";
            document.querySelector("#order-actions").appendChild(script);


            document.getElementById("name").disabled = true;
            document.getElementById("phone").disabled = true;
            document.getElementById("city").disabled = true;
            document.getElementById("addressLine2").disabled = true;
            document.getElementById("dep2").disabled = true;

            conssole.log(shipping);

        }
        catch {
            window.alert("Sin stock");
        }

        carrito = [];
        total = 0;
        order = {
            items: []
        };
        //await fetchProducts();
        document.getElementById("checkout").innerHTML = `Carrito $${total}`
    }

}

function butonAri() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


//-----------------------------------------------cuenta-------------------------------------------------------------



if (document.getElementById("cuentaExiste") !== null && cuenta) {
    miCuenta();
} else if (document.getElementById("cuentaExiste") !== null) {
    cuentaExiste();
}

function cuentaExiste() {
    document.getElementById("cuentaExiste").style.display = "block";
    document.getElementById("cuentaCreate").style.display = "none";
    document.getElementById("miCuenta").style.display = "none";
    document.getElementById("miCuentaLateral").style.display = "none";

}
function cuentaCreate() {
    document.getElementById("cuentaCreate").style.display = "block";
    document.getElementById("cuentaExiste").style.display = "none";
    document.getElementById("miCuenta").style.display = "none";
    document.getElementById("miCuentaLateral").style.display = "none";

}
function miCuenta(nombre, contra) {
    document.getElementById("miCuenta").style.display = "block";
    document.getElementById("miCuentaLateral").style.display = "block";
    document.getElementById("cuentaExiste").style.display = "none";
    document.getElementById("cuentaCreate").style.display = "none";
    document.getElementById("cuenta1").style.display = "block";
    document.getElementById("cuenta2").style.display = "none";
    document.getElementById("cuenta3").style.display = "none";
    document.getElementById("cuenta4").style.display = "none";
    //console.log(nombre +" "+ contra);
    let MiCuentaContenido =`<h1>bienvenido ${nombre}</h1>
    <p>Queremos contarte ${nombre} que podes cambiar los datos de tu cuenta</p>
    <p>Quiero cambiar mi nombre ${nombre} a <input type="text"></p>
    <p>Quiero cambiar mi contraseña "${contra}" a <input type="password"></p>`;

    document.getElementById('MiCuentaContenido').innerHTML = MiCuentaContenido;
}
function botonCuentaTodo(pepe,n) {

    document.getElementById(pepe+"1").style.display = "none";
    document.getElementById(pepe+"2").style.display = "none";
    document.getElementById(pepe+"3").style.display = "none";
    document.getElementById(pepe+"4").style.display = "none";
    document.getElementById(pepe+n).style.display = "block";
}

function botone() {
    const nombre = document.getElementById("nombrei").value
    const contraseña = document.getElementById("contraseñai").value

    if (nombre === nombrecomprovation && contraseña === contracomprovation || nombre === nombrecomprovationE && contraseña === contracomprovation) {
        miCuenta(nombre, contraseña);
    }else {
        alert("nombre o contraseña incorrecta")
    }
}


function botoneParabusqueda(pepe) {
    categorias.forEach((categoria) => {

        if (categoria.dataset.categoria == "cuenta") {
            categoria.click();
        }

    });
    let contador = 0;
    preguntas.forEach((pregunta) => {
        console.log(contador);
        if (contador === pepe) {
            console.log(pregunta);
            pregunta.click();
            callback();
        }else {
            contador += 1;
        }

        
    });
}





/*


categorias.forEach((categoria) => {

    if (categoria.dataset.categoria=="cuenta"){
        HTMLElement.click(categoria);
    }
});

*/

