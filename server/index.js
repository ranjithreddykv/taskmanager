import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan";
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js"



dotenv.config();

//database connection
dbConnection();


const PORT= process.env.PORT ||5000

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin : ["http://localhost:3000","http://localhost:5173"] ,
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))


app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1",routes);

app.use(routeNotFound);
app.use(errorHandler);


export default app;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT,()=>console.log(`Server is listening on ${PORT}`))
}