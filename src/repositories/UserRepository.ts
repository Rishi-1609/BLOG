import User from "../models/User";

export const UserRepository = {
    
    createUser : async function (data : any) : Promise<any> {
        const user = await User.create({...data});
        return user;
    },

    findUserByEmail : async function (email : string) : Promise<any> {
        const user = await User.findOne({ email });
        return user;
    },

    findUserById : async function (user_Id : string) : Promise<any> {
        const id = await User.findById({_id : user_Id});
        return id;
    }

};

export default UserRepository;