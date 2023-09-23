import mongoose from "mongoose";
const url =
  "mongodb+srv://amritkuikel5689:FR7Xwp7Sjvk5c5jb@cluster0.3haxfsv.mongodb.net/?retryWrites=true&w=majority";
export default function mongooseConnect() {
  mongoose.connect(url).then(() => {
    console.log("db connected");
  });
}
