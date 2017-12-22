export interface User {
    $key?: number;
    email: string;
    name: string;
    password: string;
    picURL: string;
    provider: string;
}