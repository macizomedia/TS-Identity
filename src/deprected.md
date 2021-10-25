```typesecript
class activateUserInstance {
    protected connection!: httpGet;
    protected user!: any;
    constructor(public uri: string, public id: string) {}

    connect() {
        this.connection = new httpGet(this.uri, this.id, {});
        this.connection.init();
    }

    getUserConection() {
        return this.connection;
    }
    getDetails() {
        return new activeUser(this.connection.response);
    }
}

function instanceOfUser(id: string) {
    let user = new activateUserInstance(BASE_URL, id);
    user.connect();

    return user;