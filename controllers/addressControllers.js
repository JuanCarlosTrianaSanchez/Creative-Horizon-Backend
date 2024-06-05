import Address from "../models/address.js";

async function list(req, res) {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al listar direcciones", error: err.message });
  }
}

async function find(req, res) {
  try {
    const addressId = req.params.id;
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json("Address no found");
    }
    res.status(200).json(address);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al buscar dirección", error: err.message });
  }
}

async function create(req, res) {
  try {
    const newAddress = await Address.create({
      direccion: req.body.direccion,
      barrio: req.body.barrio,
      ciudad: req.body.ciudad,
      pais: req.body.pais,
    });
    res.json(newAddress);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear dirección", error: err.message });
  }
}
async function update(req, res) {
  try {
    const addressFound = await Address.findById(req.params.id);
    if (!addressFound) {
      return res.status(404).json("Address no found");
    }
    addressFound.direccion = req.body.direccion || addressFound.direccion;
    addressFound.barrio = req.body.barrio || addressFound.barrio;
    addressFound.ciudad = req.body.ciudad || addressFound.ciudad;
    addressFound.pais = req.body.pais || addressFound.pais;

    await addressFound.save();

    res.json(addressFound);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar dirección", error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const addressDelete = await Address.findByIdAndDelete(req.params.id);
    if (!addressDelete) {
      return res.json.status(404).json("Address no fonud");
    }
    res.json("Direccion Eliminada");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar dirección", error: err.message });
  }
}

export default {
  list,
  find,
  create,
  update,
  destroy,
};
