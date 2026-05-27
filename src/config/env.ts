export function envExists(value: string | undefined, key: string) : string {

    if (!value || value.trim().length === 0) 
        throw new Error(`Environment variable missing: ${key}`);

    return value;
}

export const env = {
    PORT : envExists(process.env.PORT, "PORT"),
    JWT_SECRET : envExists(process.env.JWT_SECRET, "JWT_SECRET"),
    MONGODB_URI : envExists(process.env.MONGODB_URI, "MONGODB_URI"),
};