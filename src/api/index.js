import axios from "axios";

export const unsplashApi = axios.create({
    baseURL: "https://api.unsplash.com/photos",
    headers: {
        Authorization: "Client-ID EvX7JrWobDuOj1tCat5pRKwsarl3qpbpYbvSl7i63cI"
    }
});
