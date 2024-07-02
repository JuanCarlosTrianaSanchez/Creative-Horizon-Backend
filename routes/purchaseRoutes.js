import mongoose from "mongoose";

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      priceAtPurchase: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["tarjeta_de_credito", "tarjeta_debito", "nequi", "daviplata"],
  },
  status: {
    type: String,
    enum: ["pendiente", "completa", "cancelado"],
    default: "pendiente",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
