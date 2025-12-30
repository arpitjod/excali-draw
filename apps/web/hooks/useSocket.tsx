"use client"
import {useState,useEffect} from "react";
import {WS_URL} from "../config"
const[loading,setLoading]=useState(false);
const[socket,setSocket]=useState<WebSocket>();

export function useSocket(){
    useEffect(()=>{
        const ws=new WebSocket(WS_URL);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }
    },[])
    return{
        socket,
        loading

    }
 }