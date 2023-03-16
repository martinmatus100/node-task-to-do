require('colors');
const { 
    inquirerMenu, 
    pause,
    readInput,
    listTasksDelete,
    confirm,
    showListCheckList
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Task = require('./models/task');
const Tasks = require('./models/tasks');


const main = async() => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if( tasksDB ) {
        tasks.createTaskFromArray( tasksDB );
    }

    do {
        opt = await inquirerMenu();
        
        switch ( opt ) {
            case '1':
                const desc = await readInput('Description:');
                tasks.createTask( desc );
            break;
            
            case '2':
                tasks.fullList();
            break;

            case '3':
                tasks.listCompletedPending(true);
            break;

            case '4':
                tasks.listCompletedPending(false);
            break;

            case '5':
                const ids = await showListCheckList( tasks.listArr );
                tasks.toggleCompleted( ids );
            break;

            case '6':
                const id = await listTasksDelete( tasks.listArr );
                if ( id !== '0' ) {
                    const ok = await confirm('Are you sure?');
                    if ( ok ) {
                        tasks.deleteTask( id );
                        console.log('Task deleted');
                    }
                }
            break;
        }

        saveDB( tasks.listArr );

        await pause();
        
    } while ( opt !== '0');

}

main();