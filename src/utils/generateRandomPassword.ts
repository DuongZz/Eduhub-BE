import crypto from "crypto"
import bcrypt from 'bcrypt';

export const generateRandomPassword = async (length = 12) => {
    const password = crypto.randomBytes(length).toString('hex').slice(0, length);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword
}