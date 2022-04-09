import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
  try {
    const res = await fetch("http://localhost:8080/todos")
    if (res.ok) {
      const todos = await res.json()
      console.log(todos)
      return { todos }
    } else {
      console.log("Something went wrong on API side")
    }
  } catch (error) {
    console.log(error)
  }
})

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async payload => {
  try {
    const res = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: payload.title })
    })
    if (res.ok) {
      const todo = await res.json()
      return { todo }
    }
  } catch (error) {
    console.log("Something went wrong on API side")
  }
})

export const toggleCompleteAsync = createAsyncThunk("todos/toggleCompleteAsync", async payload => {
  try {
    const res = await fetch(`http://localhost:8080/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: payload.completed })
    })
    if (res.ok) {
      const todo = await res.json()
      return { todo }
    }
  } catch (error) {
    console.log("Something went wrong on API side")
  }
})

export const deleteTodoAsync = createAsyncThunk("todos/deleteTodoAsync", async payload => {
  try {
    const res = await fetch(`http://localhost:8080/todos/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      const todos = await res.json()
      return { todos }
    }
  } catch (error) {
    console.log("Something went wrong on API side")
  }
})

export const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: true },
    { id: 4, title: "todo4", completed: false },
    { id: 5, title: "todo5", completed: false }
  ],
  // reducers: {
  //   addTodo: (state, action) => {
  //     const todo = {
  //       id: new Date(),
  //       title: action.payload.title,
  //       completed: false
  //     }
  //     state.push(todo)
  //   },
  //   markTodoComplete: (state, action) => {
  //     const todoItemIndex = state.findIndex(item => item.id === action.payload.id)
  //     state[todoItemIndex].completed = action.payload.completed
  //   },
  //   deleteTodoItem: (state, action) => {
  //     return state.filter(item => item.id !== action.payload.id)
  //   }
  // },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo)
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const todoItemIndex = state.findIndex(item => item.id === action.payload.todo.id)
      state[todoItemIndex].completed = action.payload.todo.completed
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return action.payload.todos
    }
  }
})

// export const { addTodo, markTodoComplete, deleteTodoItem } = todoSlice.actions

export default todoSlice.reducer
