const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
   constructor() {
      this.products = [];
      this.generate();
   }

   generate() {
      const limit = 100;

      // Usamos la libreria fake para crear 100 productos falsos
      for (let index = 0; index < limit; index++) {
         this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            image: faker.image.imageUrl(),
            isBlock: faker.datatype.boolean(),
         });
      }
   }

   find() {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(this.products);
         }, 3000);
      });
   }

   async findOne(id) {
      const product = this.products.find((item) => item.id === id);
      if (!product) {
         throw boom.notFound('Product not found');
      }

      if (product.isBlock) {
         throw boom.conflict('Product is block');
      }

      return product;
   }

   async create(data) {
      const newProduct = {
         id: faker.datatype.uuid(),
         ...data,
      };

      this.products.push(newProduct);
      return newProduct;
   }

   async update(id, changes) {
      const index = this.products.findIndex((item) => item.id === id);
      if (index === -1) {
         throw boom.notFound('Product not found');
      }

      const product = this.products[index];

      this.products[index] = { ...product, ...changes };
      return this.products[index];
   }

   async delete(id) {
      const index = this.products.findIndex((item) => item.id === id);
      if (index === -1) {
         throw boom.notFound('Product not found');
      }

      this.products.splice(index, 1);
      return { message: true, id };
   }
}

module.exports = ProductsService;
