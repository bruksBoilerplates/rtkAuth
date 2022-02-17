export const API_ROOT = 'http://localhost:4000/api/v1/';

export const NetworkImagePath = 'http://localhost:4000/img/'
export const LocalImagePath = "http://localhost:3000/images/"

export const LocalImage = (path, image)=>{
    return process.env.PUBLIC_URL+ path+ image
}
export const LocalImg=(img)=>{
    return LocalImagePath+img
}
export const NetworkImage=(path, image)=>{
    const pat= path||""
    return NetworkImagePath+ pat+ image
}

export const USER_TOKEN="USER_TOKEN"

export const LOG_g = (name, value) => ({
    type: `LOGGING-->>${name}`,
    name,
    value
});
export const PUBLIC_FOLDER = 'http://localhost:3000/assets/';