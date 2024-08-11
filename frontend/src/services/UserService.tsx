import axios from '../api/axios';
import { LOGIN_URL } from '../api/endpoints';
import { LoginResponse } from '../api/interface';
import { setCredentials, logout } from '../features/auth/authSlice';
import { AppDispatch } from '../redux/store';


class UserService {

    static async login(email: string, password: string, dispatch: AppDispatch): Promise<LoginResponse> {
        try {
            const response = await axios.post<LoginResponse>(LOGIN_URL, { email, password });
            const { token, role } = response.data;
            if (token) {
                dispatch(setCredentials({ token, role }));
            }
            return response.data;
        } catch (err: any) {
            throw err;
        }
    }

    static logout(dispatch: AppDispatch) {
        dispatch(logout());
    }

    static isAuthenticated(){
        const token = sessionStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = sessionStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = sessionStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService;