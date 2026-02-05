import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      set: (value) => (value ? value.replace(/^\\/+/, \"\") : value),
    },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", default: null },
  },
  { timestamps: true }
);

menuSchema.index({ parent: 1, order: 1 });
menuSchema.index({ slug: 1 });

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
