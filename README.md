# Task CLI
https://roadmap.sh/projects/task-tracker
**Task CLI** is a command-line tool for managing tasks simply and efficiently.

## 🚀 Usage

Run the `task-cli` command followed by a method and arguments:

```sh
npm run task-cli <method> [arguments]
```

### Available Commands

- **Add a task**  
  ```sh
  task-cli add "Task description"
  ```

- **Update a task**  
  ```sh
  task-cli update <id> "New description"
  ```

- **List tasks**  
  ```sh
  task-cli list
  task-cli list done
  task-cli list todo
  task-cli list in-progress
  ```

- **Delete a task**  
  ```sh
  task-cli delete <id>
  ```

- **Change the status of a task**  
  ```sh
  task-cli mark done <id>
  task-cli mark todo <id>
  task-cli mark in-progress <id>
  ```

## 🛠 Technologies Used

- Node.js
- JSON for data storage

## 📜 License

This project is licensed under the [MIT License](LICENSE).
