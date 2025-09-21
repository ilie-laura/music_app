import {User} from "../models/userModel.js";


const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        const user = await User.findOne({ clerkID: id });

        if (!user) {
            await User.create({
                clerkID: id,
                name: `${firstName} ${lastName}`,
                imageUrl
            });
        }

        res.status(200).json({ message: "User authenticated successfully", success: true });
    } catch (error) {
        console.error(error);
       next(error);
    }
};

export default authCallback;
