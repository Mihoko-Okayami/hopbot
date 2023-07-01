module.exports = class Logger {
    constructor() {
        this.timestamp = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
    }
    info(message) {
        console.log(`[${this.timestamp}] (INFO) ${message}`);
    }
    warn(message) {
        console.log(`[${this.timestamp}] (WARN) ${message}`);
    }
    error(message) {
        console.log(`[${this.timestamp}] (ERROR) ${message}`);
    }
    server(message) {
        console.log(`[${this.timestamp}] (SERVER) ${message}`);
    }
    dm(message, user) {
        console.log(`[${this.timestamp}] (DM) <${user}> : ${message}`);
    }
};