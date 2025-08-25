import {User} from "../models/userModel.js";


const authCallback = async (req, res) => {
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
        return res.status(500).json({ message: "Internal server error(callback)", error, success: false });
    }
};

export default authCallback;
