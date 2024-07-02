import mongoose from "../config/mongoose.config.js";
import Product from "../models/product.js";

const generateDescription = (product) => {
  return `Dejate cautivar por nuestros productos, ${product.name} de la marca ${product.brand}, es un producto de alta calidad, pensado para el artista bohemio y de buen gusto, en este momento, contamos con unidades disponibles en color ${product.colour}, y en nuestra prresentacion ${product.size}, encontrara que se adapta de manera util a cualquier espacio, esta presentacion contiene ${product.material}, un material de primera categoria, que lo lleva a tener un gran desempeño, un producto, ideal para ti`;
};

const updateDescriptions = async () => {
  try {
    const products = await Product.find();
    for (let product of products) {
      product.description = generateDescription(product);
      await product.save();
    }
    console.log("Descripciones actualizadas correctamente.");
  } catch (error) {
    console.error("Error al actualizar descripciones:", error);
  } finally {
    mongoose.connection.close();
  }
};

updateDescriptions();
