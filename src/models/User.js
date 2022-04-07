class User {
    constructor(data = {}) {
        this.id = null;
        this.email = null;
        this.token = null;
        Object.assign(this, data);
    }
}
export default User;