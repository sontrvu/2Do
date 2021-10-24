import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',

  initialState: {
    pendingTasks: [
      {
        id: '1',
        name: 'YES YES',
        isCompleted: false,
      },
      {
        id: '2',
        name: "It's WORKING",
        isCompleted: false,
      },
      {
        id: '3',
        name: 'HAHAHAHA YEYEYEYE',
        isCompleted: false,
      },
    ],

    completedTasks: [
      {
        id: '4',
        name: '4rd Item Hehehe',
        isCompleted: true,
      },
    ],
  },

  reducers: {
    addTask: (state, action) => {
      state.pendingTasks.push({
        id: Math.random().toString(),
        name: action.payload,
        isCompleted: false,
      });
    },

    updateTask: (state, action) => {
      let task = action.payload;

      let pIdx = state.pendingTasks.findIndex((obj) => obj.id == task.id);
      if (pIdx != -1) {
        state.pendingTasks[pIdx].name = task.name;
        return;
      }

      let cIdx = state.completedTasks.findIndex((obj) => obj.id == task.id);
      if (cIdx != -1) {
        state.completedTasks[cIdx].name = task.name;
        return;
      }
    },

    deleteTask: (state, action) => {
      let taskId = action.payload;

      let pIdx = state.pendingTasks.findIndex((obj) => obj.id == taskId);
      if (pIdx != -1) {
        state.pendingTasks.splice(pIdx, 1);
        return;
      }

      let cIdx = state.completedTasks.findIndex((obj) => obj.id == taskId);
      if (cIdx != -1) {
        state.completedTasks.splice(cIdx, 1);
        return;
      }
    },

    setCompletedTask: (state, action) => {
      let task = action.payload;

      let allTasks = state.pendingTasks.concat(state.completedTasks);
      let idx = allTasks.findIndex((obj) => obj.id == task.id);
      allTasks[idx].isCompleted = task.isCompleted;

      [state.pendingTasks, state.completedTasks] = allTasks.reduce(
        (result, item) => {
          result[item.isCompleted ? 1 : 0].push(item);
          return result;
        },
        [[], []]
      );
    },
  },
});

export const { addTask, updateTask, deleteTask, setCompletedTask } = taskSlice.actions;
export default taskSlice.reducer;
