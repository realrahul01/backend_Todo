import { connectDB } from "./data/dataBase.js";
import {app} from './app.js'


connectDB();


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });