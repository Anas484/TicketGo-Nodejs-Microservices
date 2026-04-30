


export interface Signup {
    firstName: string;
    lastName :string;
    email: string;
    password: string;
    role : string
}


export interface Login {
    email: string;
    password: string;
}


export interface LoginResponse {
    id : number;
    token: string;
}
