import Product from "../models/product.js";
import User from "../models/user.js";

export const addFavorite = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).send({
      message: "Producto agregado a favoritos",
      favorites: user.favorites,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al agregar a favoritos", error: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== productId
    );
    await user.save();

    res.status(200).send({
      message: "Producto eliminado de favoritos",
      favorites: user.favorites,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al remover de favoritos", error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    res
      .status(200)
      .send({ message: "Lista de favoritos", favorites: user.favorites });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al obtener favoritos", error: error.message });
  }
};

export const isFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const isFavorite = user.favorites.includes(productId);

    res.status(200).send({
      message: isFavorite ? "Es favorito" : "No es favorito",
      isFavorite,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al verificar favorito", error: error.message });
  }
};
