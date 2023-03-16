const Task = require("./task");

class Tasks {
    _list = {};

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push( task );
        })

        return list; 
    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '' ) {
        if ( this._list[id] ) {
            delete this._list[id];
        }
    }

    createTaskFromArray( tasks = [] ) {
        tasks.forEach( task => {
            this._list[task.id] = task;
        });
    }

    createTask( desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task; 
    }

    fullList() {
        console.log();
        this.listArr.forEach( (task, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completedIn } = task;
            const state = ( completedIn ) ? 'Compleated'.green : 'Pending'.red;

            console.log(`${ idx } ${ desc} :: ${ state }`);
        }); 
    }

    listCompletedPending( _completed = true ) {
        console.log();
        let aux = 0; 
        this.listArr.forEach( (task) => {
            const { desc, completedIn } = task;
            const state = ( completedIn ) ? 'Compleated'.green : 'Pending'.red;

            if( _completed ) {
                // Show completed
                if( completedIn ) {
                    aux += 1;
                    console.log(`${ (aux + '.').green } ${ desc} :: ${ completedIn.green }`);
                }
            } else {
                // Show pendings
                if( !completedIn ) {
                    aux += 1;
                    console.log(`${ (aux + '.').green } ${ desc} :: ${ state }`);
                }
            }

        }); 
    }

    toggleCompleted( ids = [] ) {
        ids.forEach( id => {
            const task = this._list[id];
            if ( !task.completedIn ) {
                task.completedIn = new Date().toISOString()
            }
        });

        this.listArr.forEach( task => {
            if ( !ids.includes(task.id) ) {
                this._list[task.id].completedIn = null;
            }
        });
    }
}

module.exports = Tasks;