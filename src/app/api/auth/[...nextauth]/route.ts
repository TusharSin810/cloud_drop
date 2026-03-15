import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prismaClient from "@/db/server";

const handler = NextAuth({

    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}){
            if(account?.provider == "google"){
                const email = user.email;
                const name = user.name;
                if(!email || !name){
                    return false;
                }
                const userDb = await prismaClient.user.upsert({
                    where:{
                        email: email,
                    },
                    update:{},
                    create:{
                        email:email,
                        name: name,
                    }
                })
            }    
            return true
        },
    }
})

export {handler as GET, handler as POST}