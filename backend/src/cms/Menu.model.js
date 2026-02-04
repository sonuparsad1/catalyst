import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },
    order: { type: Number, default: 0 },
    isExternal: { type: Boolean, default: false },
  },
  { _id: false }
);

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: {
      type: String,
      enum: ["header", "footer", "utility"],
      default: "header",
    },
    items: [menuItemSchema],
  },
  { timestamps: true }
);

menuSchema.index({ location: 1, name: 1 });

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
