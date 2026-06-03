export function envExists(value: string | undefined, key: string) : string {

    if (!value || value.trim().length === 0) {
        console.log(`${key} does not exist in env file`);
        throw new Error(`Environment variable missing: ${key}`);
    }
    
    return value;
}

export const env = {
    PORT : envExists(process.env.PORT, "PORT"),
    JWT_SECRET : envExists(process.env.JWT_SECRET, "JWT_SECRET"),
    MONGODB_URI : envExists(process.env.MONGODB_URI, "MONGODB_URI"),
    CLIENT_URL : envExists(process.env.CLIENT_URL, "CLIENT_URL"),
};