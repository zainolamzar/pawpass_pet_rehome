import { Schema, models, model } from "mongoose";

const DogInfoSchema = new Schema({
  breed: { type: String, required: true },
  location: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String, required: true },
  age: { type: String, required: true },
  phone_number: { type: String, required: true },
  owner_name: { type: String, required: true },
  animal: { type: String, default: "dog" }, // always "dog"
  isActive: { type: Boolean, default: false }, // default false
  isApproved: { type: Boolean, default: false }, // default false
  images: [String],
  approvedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const DogInfo = models.DogInfo || model("dogInfo", DogInfoSchema);

export default DogInfo;