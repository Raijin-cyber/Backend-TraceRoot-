import mongoose from "mongoose";

const connectDB = async (retries,baseTimeout) => {
    try {
        mongoose.connection.on("connecting", () => console.log("Server is starting... \nTrying to connect to the database..."))
        mongoose.connection.on("reconnected", () => console.log("Database reconnected with the server successfully."));
        const connectionRef = await mongoose.connect(process.env.MONGODB_URI) 
        console.log("Database connected !!" , connectionRef.connection.host , connectionRef.connection.name)
    } catch (error) {
        if(retries === 0) {
            console.log("Server is Shutting Down !!");
            process.exit(1);
        }
        if(retries > 0){
            setTimeout(() => {
                console.error("Database failed to connect: ",error);
                console.log(`Trying to reconnect again with the database in ${baseTimeout} seconds.`, error);
                connectDB(retries - 1, baseTimeout + 10000); // try to reconnect 
            }, baseTimeout);
        }
    }
}

export default connectDB;

