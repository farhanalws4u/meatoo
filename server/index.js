import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);

const MONGO_URI =
  "mongodb+srv://admin:Admin@db@clusterone.apldt.mongodb.net/clusterOne?retryWrites=true&w=majority";

// "mongodb+srv://farhan:Farhan21@db@memoriesproject.v4pv3.mongodb.net/memoriesProject?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
