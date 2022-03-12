/** This method checks if the current user is authenticated 
 * @param request fastify request 
*/
export async function isUserAuthenticated(request: any, reply: any){
    
    try{
        const { userId, isUserAuthenticated } = request.session.user;
        if(isUserAuthenticated){
            request.user = userId;
        }
    }catch(err){
        throw new Error("Must be signed in.");
    }   
}

