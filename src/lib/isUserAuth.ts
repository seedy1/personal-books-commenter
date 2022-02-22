// import { FastifyReply, FastifyRequest } from "fastify";

// // import Request
// export async function isUserAuthenticated(request: FastifyRequest, reply: FastifyReply){ //  request.session.user = {userId: user.id, isUserAuthenticated: true}

//     const { userId, isUserAuthenticated } = request.session.user;
//     if(isUserAuthenticated){
//         request.user = userId;
//     }

// }

export async function isUserAuthenticated(request: any, reply: any){
    //  request.session.user = {userId: user.id, isUserAuthenticated: true}
    
    // if (request.session.user !== undefined){
        try{
        const { userId, isUserAuthenticated } = request.session.user;
        if(isUserAuthenticated){
            request.user = userId;
        }
    }catch(err){
        throw new Error("Must be signed in.");
    }   
}

// export async function isAuthorized(request:any, reply:any){
//     try{

//     }catch(err){

//     }
    
// }