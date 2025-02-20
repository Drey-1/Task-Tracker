const fs = require("fs");
const filePath = "tasks.json"

//-------------------- Verify wathever "tasks.jason" exist
function ensureFileExists() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        console.log("You didn't have the Storage file ,then it was created now.\n")
    }
}

//-------------------- Creates a new task in JASON file
function add(descripton){
    ensureFileExists();
    let tasks = JSON.parse(fs.readFileSync(filePath,"utf-8"));
    let newTask = {
        id:tasks.length + 1,
        description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    tasks.push(newTask);
    fs.writeFileSync(filePath,JSON.stringify(tasks,null,2));
    console.log("Task Created :)");
}

//-------------------- Delete the selected task
function deleter(id){
    ensureFileExists();
    let tasks = JSON.parse(fs.readFileSync(filePath,"utf-8"));
    if(tasks.length <= id){console.log("This task ID doesn't exist");return}
    tasks.splice(id -1,1);
    for(let i = id - 1; i < tasks.length; i++){
        tasks[i].id = tasks[i].id -1
    }
    fs.writeFileSync(filePath,JSON.stringify(tasks,null,2))
    console.log("Task deleted :)")
}

//-------------------- Update the description in the selected task
function update(id,newDescription){
    ensureFileExists();
    let tasks = JSON.parse(fs.readFileSync(filePath,"utf-8"));
    if(newDescription.length < 0){console.log("No description detected");return}
    if(tasks.length <= id){console.log("This task ID doesn't exist");return}
    tasks[id -1].description = newDescription;
    tasks[id -1].updatedAt = new Date().toISOString()

    fs.writeFileSync(filePath,JSON.stringify(tasks,null,2));
    console.log("Task Updated :)");
}

//-------------------- Update the status in the selected task
function mark(newStatus,id){
    ensureFileExists();
    let tasks = JSON.parse(fs.readFileSync(filePath,"utf-8"));
    if(tasks.length <= id){console.log("This task ID doesn't exist");return}
    if(newStatus === "in-progress" || newStatus === "done"){
        tasks[id -1].status = newStatus;
        fs.writeFileSync(filePath,JSON.stringify(tasks,null,2));
        console.log("Task status updated :)");
    }else{
        console.log("This status is not compatible. Use 'in-progress' or 'done'")
    }
}

//-------------------- List all (all,done,todo,in-progress) tasks
function list(len){
    ensureFileExists();
    let tasks = JSON.parse(fs.readFileSync(filePath,"utf-8"));
    if (tasks.length === 0) {
        console.log("There are no tasks.");
        return;
    }
    if(len.length > 0){
        let preferenceTasks = tasks.filter(task => {return task.status === len;})
        if(preferenceTasks.length === 0) {
            console.log("There are no tasks in this status.");
            return;
        }
        preferenceTasks.forEach(task => {
            console.log(`Id:[${task.id}] \n Description:${task.description}. \n Status:${task.status}`);
        })
    } else {
        tasks.forEach(task => {
            console.log(`Id:[${task.id}] \n Description:${task.description}. \n Status:${task.status}`);
        });
    }

}

//-------------------- Shows the list of comands
function info(){
    console.log(`
        Use: npm task-cli <method> [arguments]\n\n
        Commands:\n
           add "Description of task"     Add a new task\n\n
           update 1 "New description"    Modify the description of the task with id 1\n\n
           list                          List all tasks\n
           list done                     List only tasks with done status\n
           list todo                     List only tasks with todo status\n
           list in-progress              List only tasks with in-progress status\n\n
           delete 1                      Delete the task with id 1\n\n
           mark done 1                   Change the status to done for the task with id 1\n
           mark todo 1                   Change the status to todo for the task with id 1\n
           mark in-progress 1            Change the status to in-progress for the task with id 1\n\n
`);
}

//-------------------- Calls the method selected
function main() {
    const args = process.argv.slice(2);
    const method = args[0];

    if (args.length === 0) {
        showHelp();
        return;
    }

    switch (method.toLowerCase()) {
        case "add":
            add(args.slice(1).join(" "));
            break;
        case "update":
            update(Number(args[1]),String(args[2]));
            break;
        case "delete":
            deleter(Number(args[1]))
            break;        
        case "list":
            list(args.slice(1).join(" "));
            break;
        case "mark":
            mark(String(args[1]),Number(args[2]));
            break;
        case "info":
            info();
            break

        default:
            console.log("Comand invalid. Use 'task-cli info' for help.");
    }
}

main();