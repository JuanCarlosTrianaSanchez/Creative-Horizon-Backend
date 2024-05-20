import Purchase from "../models/purchase.js";

async function list(req, res) {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function find(req, res) {
  try {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.status(404).json("Product not found");
    }
    res.status(200).json(purchase);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function create(req, res) {
  try {
    const newPurchase = await Purchase.create({
      purchaseId: req.body.purchaseId,
      purchase: req.body.purchase,
      total: req.body.total,
      paymentMethod: req.body.paymentMethod,
    });
    res.json(newPurchase);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function update(req, res) {
  try {
    const purchaseFound = await Purchase.findById(req.params.id);
    if (!purchaseFound) {
      return res.status(404).json("Purchase not found");
    }

    purchaseFound.purchaseId = req.body.purchaseId || purchaseFound.purchaseId;
    purchaseFound.ref = req.body.ref || purchaseFound.ref;
    purchaseFound.products = req.body.products || purchaseFound.products;
    purchaseFound.total = req.body.total || purchaseFound.total;
    purchaseFound.paymentMethod =
      req.body.paymentMethod || purchaseFound.paymentMethod;

    await purchaseFound.save();
    res.json(purchaseFound);
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

async function destroy(req, res) {
  try {
    const purchaseDeleted = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchaseDeleted) {
      return res.status(404).json("Purchase not found");
    }
    res.json("Purchase deleted");
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

export default {
  list,
  find,
  create,
  update,
  destroy,
};
