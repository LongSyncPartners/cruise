import axios from "@/api/axios";

export function login(data) {
    navigate("/forecast");
    return axios.post("/auth/login", data);
}
