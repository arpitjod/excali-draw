"use client";

export function AuthPage({isSignin}:{
    isSignin:boolean;
}){
    return <div className="h-screen w-screen justify-center items-center">
        <div className="p-2 m-2 bg-white rounded-sm">
            <input type="text" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
        </div>
        <button onClick={()=>{

        }}>{isSignin?"Signin":"Signup"}</button>
    </div>
}