
import axios, {CanceledError} from "axios";


//default headers can be added in this config 
//headers: {"api-key": <some value>}
export default axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

export { CanceledError };