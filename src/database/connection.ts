import mongoose, { Error } from "mongoose";
import { config } from "../config";

mongoose.connect(config.dbUrl)
    .then(() => "connection established")
    .catch((e) => console.log((e as Error).message));