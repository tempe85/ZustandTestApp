import { Mutate, StateCreator, StoreApi, UseBoundStore, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TaskStore {
  tasks: ITasks[];
  addTask: (title: string, state: string) => void;
  deleteTask: (title: string) => void;
  draggedTask: string | null;
  setDraggedTask: (title: string | null) => void;
  moveTask: (title: string, newState: string) => void;
}
export interface ITasks {
  title: string;
  state: string;
}

// const myMiddlewares = <Mos>(
//   f: UseBoundStore<Mutate<StoreApi<TaskStore>, Mos>>
// ) => devtools(persist(f, { name: "store2" }));

export const useStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        addTask: (title, state) =>
          set(
            (store) => ({ tasks: [...store.tasks, { title, state }] }),
            false,
            "addTask"
          ),
        deleteTask: (title) =>
          set(
            (store) => ({
              tasks: store.tasks.filter((task) => task.title !== title),
            }),
            false,
            "deleteTask"
          ),
        draggedTask: null,
        setDraggedTask: (title) =>
          set({ draggedTask: title }, false, "setDraggedTask"),
        moveTask: (title, newState) =>
          set(
            (store) => ({
              tasks: store.tasks.map((task) =>
                task.title === title ? { title, state: newState } : task
              ),
            }),
            false,
            "moveTask"
          ),
      }),
      { name: "store" }
    )
  )
);

// const log = (config) => (set, get, api) =>
//   config(
//     (...args) => {
//       console.log(args);
//       set(...args);
//     },
//     get,
//     api
//   );
