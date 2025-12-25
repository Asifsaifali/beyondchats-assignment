import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const getLatestArticles = async()=>{
    try {
  const res = await axios.get(`${process.env.BASE_URL}/articles`);
  return res.data
} catch (err) {
  console.log("MESSAGE:", err.message);
}

}

const createArticles = async(articleData)=>{
    try {
        const res = await axios.post(`${process.env.BASE_URL}/articles`,articleData);
            return res.data
    } catch (err) { 
        console.log("MESSAGE:", err.message);       
    }   
    
}


export {getLatestArticles, createArticles};