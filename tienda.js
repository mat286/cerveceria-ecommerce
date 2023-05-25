let excel = [
    {
        id: 1,
        name: 'Ales belgas',
        price: 100,
        image: 'img/pre-venta.jpg',
        stockVenta: 1,
        estilo: 'rubia',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptate unde sapiente illo, voluptatum fuga, delectus non iusto doloremque ducimus autem fugit distinctio debitis quo tenetur! Accusamus ex corporis voluptates saepe!',
        stockPre: 0,
        stockP2p: 0
    },
    {
        id: 2,
        name: 'Lager Pilsen',
        price: 200,
        image: 'img/venta.jpg',
        stockVenta: 1,
        estilo: 'negra',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptate unde sapiente illo, voluptatum fuga, delectus non iusto doloremque ducimus autem fugit distinctio debitis quo tenetur! Accusamus ex corporis voluptates saepe!',
        stockPre: 2,
        stockP2p: 0
    },
    {
        id: 3,
        name: 'Lager Especial.',
        price: 150,
        image: 'img/p2p.jpg',
        stockVenta: 1,
        estilo: 'negra',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptate unde sapiente illo, voluptatum fuga, delectus non iusto doloremque ducimus autem fugit distinctio debitis quo tenetu',
        stockPre: 1,
        stockP2p: 3
    }
];

const categorias = document.querySelectorAll('#categoriasT .categoriaT');
const contenedorPreguntas = document.querySelectorAll('.contenedor-preguntasT');
let categoriaActiva = null;

function tienda() {

    categorias.forEach((categoria) => {
        console.log(categoria);
        categoria.addEventListener('click', (e) => {
            categorias.forEach((elemento) => {
                console.log(categorias);
                elemento.classList.remove('activa');
            });

            e.currentTarget.classList.toggle('activa');
            categoriaActiva = categoria.dataset.categoria;


            // Activamos el contenedor de preguntas que corresponde
            contenedorPreguntas.forEach((contenedor) => {
                console.log(contenedorPreguntas);
                console.log(contenedor.dataset.categoria);
                if (contenedor.dataset.categoria === categoriaActiva) {
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
    let nadaPro = ` <h1>Por el momento no se encuentra ningun producto disponible</h1>`;
    excel.forEach(p => {
        if (p.stockVenta > 0) {
            buttonHTMLventa += `<div class="product-conteiner">
                <h3>${p.name}</h3>
                <img src="${p.image}" />
                <h3>${p.estilo}</h3>
                <div>
                    <p>${p.info}</p>
                    <h3>Detalles</h3>
                    <p>5.2% alcohol <br>192 calorías, 355 ml.</p>
                    <button class="button-add" onclick="add(${p.id}, ${p.price})">$${p.price}</button>                  
                </div>
            </div>`;
        }
        if (p.stockPre > 0) {
            buttonHTMLpre += `<div class="product-conteiner">
                <h3>${p.name}</h3>
                <img src="${p.image}" />
                <h3>${p.estilo}</h3>
                <div>
                    <p>${p.info}</p>
                    <h3>Detalles</h3>
                    <p>5.2% alcohol <br>192 calorías, 355 ml.</p>
                    <button class="button-add" onclick="add(${p.id}, ${p.price})">$${p.price}</button>                  
                </div>
            </div>`;
        }
        if (p.stockP2p > 0) {
            buttonHTMLp2p += `
            <div class="product-conteiner">
                <h3>${p.name}</h3>
                <img src="${p.image}" />
                <h3>${p.estilo}</h3>
                <div>
                    <p>${p.info}</p>
                    <h3>Detalles</h3>
                    <p>5.2% alcohol <br>192 calorías, 355 ml.</p>
                    <button class="button-add" onclick="add(${p.id}, ${p.price})">$${p.price}</button>                  
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

tienda();




categoriasT.forEach((categoria) => {

        // Activamos el contenedor de preguntas que corresponde
        contenedorPreguntas.forEach((contenedor) => {
            if (contenedor.dataset.categoria === categoriaActiva) {
                contenedor.classList.add('activo');
            } else {
                contenedor.classList.remove('activo');
            }
        });
});



/*
function add(productId, price) {
    const product = productList.find(p => p.id === productId);
    product.stock--;

    order.items.push(productList.find(p => p.id === productId));

    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `Carrito $${total}`;
    displayProducts();
}

async function showOrder() {
    document.getElementById("product-cards").style.display = "none";
    document.getElementById("order").style.display = "block";

    document.getElementById("order-total").innerHTML = `$${total}`;

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
}

async function pay() {
    try{
        const preference = await (await fetch("/api/pay",{
            method: "post",
            body: JSON.stringify(carrito),
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
        script.setAttribute("data-button-label", "Pagar con Mercado Pago");
        document.getElementById("order-actions").innerHTML = "";
        document.querySelector("#order-actions").appendChild(script);

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
*/

//<div class="categoriaT activa" data-categoria="metodos-pago"><p>venta</p></div>



