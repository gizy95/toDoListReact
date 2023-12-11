const storeTodoList = (toDoList) => {
  try {
    localStorage.setItem(
      'todo',
      JSON.stringify(toDoList)
    );
  } catch (error) {
    console.error('Failed to store data in the local storage.')
  }
}

const getRandomId = () => crypto.randomUUID();

export { storeTodoList, getRandomId };