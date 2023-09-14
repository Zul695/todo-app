import { ITask } from "../../types/tasks";
import React, { FormEventHandler, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}

export default function Task({ task }: TaskProps) {
  const router = useRouter();

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.text);
  const handleEditSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: task.id, text: editTask }),
    });
    setOpenEdit(false);
    router.refresh();
  };

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const handleDeleteSubmit = async (id: string) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });
    setOpenDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.text}</td>
      <td className={styles.actions}>
        <button onClick={() => setOpenEdit(true)}>
          <Image
            alt="edit icon"
            src={"/edit.svg"}
            width={20}
            height={20}
          ></Image>
        </button>
        <Modal
          open={openEdit}
          setOpen={setOpenEdit}
          title="Edit Task"
          children={
            <form onSubmit={handleEditSubmit}>
              <div className={styles.modalSection}>
                <input
                  value={editTask}
                  onChange={(e) => {
                    setEditTask(e.target.value);
                  }}
                  type="text"
                  placeholder="Type here"
                  className=""
                />
                <button type="submit" className="">
                  Submit
                </button>
              </div>
            </form>
          }
        />
        <button onClick={() => setOpenDelete(true)}>
          <Image
            alt="trash icon"
            src={"/trash.svg"}
            width={20}
            height={20}
          ></Image>
        </button>
        <Modal
          open={openDelete}
          setOpen={setOpenDelete}
          title="Delete Task"
          children={
            <React.Fragment>
              {" "}
              <h3>Are you sure you want to delete this task?</h3>
              <div>
                <button onClick={() => handleDeleteSubmit(task.id)}>Yes</button>
                <button onClick={() => setOpenDelete(false)}>No</button>
              </div>
            </React.Fragment>
          }
        />
      </td>
    </tr>
  );
}
