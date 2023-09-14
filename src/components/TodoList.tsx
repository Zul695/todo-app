import { Table } from "@mantine/core";
import styles from "@/styles/Home.module.css";
import { ITask } from "../../types/tasks";
import Task from "./Task";

export default function TodoList({ tasks }: { tasks: ITask[] }) {
  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Task</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{tasks && tasks.map((task) => <Task task={task} />)}</tbody>
    </Table>
  );
}
