import styles from "@/styles/Home.module.css";
import React, { FormEventHandler, useState } from "react";
import Modal from "@/components/Modal";
import { useId } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function AddTask() {
  const [open, setOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: useId, text: newTaskValue }),
    });
    setNewTaskValue("");
    setOpen(false);
    router.refresh();
  };
  return (
    <React.Fragment>
      <button className={styles.addTask} onClick={() => setOpen(true)}>
        ADD NEW TASK{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-plus"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 5l0 14"></path>
          <path d="M5 12l14 0"></path>
        </svg>
      </button>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New Task"
        children={
          <form onSubmit={handleSubmit}>
            <div className={styles.modalSection}>
              <input
                value={newTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
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
    </React.Fragment>
  );
}
