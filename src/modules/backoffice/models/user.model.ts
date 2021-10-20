export class User {
    constructor(
        public email:string,
        public username: string,
        public password: string,
        public roles: string[],
        public active: boolean,
    ) {

        
    }

    _id: string
}
