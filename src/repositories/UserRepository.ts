import User from "../models/User";

export const UserRepository = {
    
    createUser : async function (data : any) : Promise<any> {
        const user = await User.create({...data});
        return user;
    },

    findUserByEmail : async function (email : string) : Promise<any> {
        const user = await User.findOne({ email });
        return user;
    }

};

export default UserRepository;