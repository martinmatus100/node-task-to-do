const { v4: uuid4 } = require('uuid');

class Task {
    id = '';
    desc= '';
    completed= null;

    constructor( desc ) {
        this.id = uuid4();
        this.desc = desc;
        this.completedIn = null;
    }
}

module.exports = Task;