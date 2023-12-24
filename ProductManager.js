const fs = require("fs")

class ProductManager {
    constructor(filePath) {
        this.products = []
        this.path = filePath
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("falta credenciales")
            return;
        }

        const validacion = this.products.some((el) => el.code === code)

        if (validacion) {
            return console.log(`se repitio el code ${code}`)
        }

        const producto = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        this.products.push(producto)

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))

    }

    getProducts = async () => {



        const array = await fs.promises.readFile(this.path, "utf-8")

        if (array.length === 0) {
            console.log(this.products)
        } else {
            console.log(JSON.parse(array))
        }
    }

    getProductById = async (id) => {

        try {

            const data = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(data)

            const foundProduct = products.find((product) => product.id === id)

            if (foundProduct) {
                console.log(foundProduct)
            } else if (!id) {
                console.log("Por favor ingrese un id")
            } else {
                console.log(`No se encontro el producto con el id: ${id}`)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (id) => {
        try {

            const data = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(data)

            const filteredProducts = products.filter((el) => el.id !== id)


            if (filteredProducts.length < products.length) {
                const udpdateId = filteredProducts.map((product, index) => {
                    product.id = index + 1;
                    return product;
                });

                await fs.promises.writeFile(this.path, JSON.stringify(udpdateId))

                console.log(`Producto con ID: ${id} eliminado`)

            } else if (!id) {
                console.log("Por favor ingrese un id")
            } else {
                console.log(`No existe ningún producto con ese ID`)
            }
        }
        catch {
            console.log(err => console.log(err))
        }
    }


    updateProduct = async (id, campoActualizar, nuevoValor) => {

        try {


            const data = await fs.promises.readFile(this.path, "utf-8")
            const product = JSON.parse(data)

            const foundProduct = product.find((product) => product.id === id)

            if (!foundProduct) {
                return console.log(`No se encontro ningun producto con ese id`)
            }


            if (!foundProduct[campoActualizar]) {
                return console.log(`Debe agregar un campo valido para actualizar`)
            }

            if (!nuevoValor) {
                return console.log("Debe agregar un valor")
            }

            console.log("Producto actualizado")

            foundProduct[campoActualizar] = nuevoValor;

            await fs.promises.writeFile(this.path, JSON.stringify(product))
        }
        catch (error) {
            console.log(error)
        }



    }

}

const codigo = new ProductManager("products.txt")

codigo.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)









