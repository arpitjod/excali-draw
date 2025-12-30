import axios from "axios"
import {BACKEND_URL} from "../config"

export async function getChats({roomId}:{roomId:string}){
    const respose=await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.await;
}
export async function ChatRoom({id}:{id:string}){
    const messages=await getChats(id);
}

