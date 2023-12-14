export default function ListItems({ toDoList, setToDoList, getUpdateItem}) {
  
  const deleteItem = (id) => {
    const newList = toDoList.filter(item => item.id !== id);
    setToDoList(newList);
  }

  return (
    <ul>
      {toDoList.map((item) => (
        <li id={item.id}>
          <span><input type="checkbox" id="checkbox" />
            <span onClick={() => getUpdateItem(item.id)}>{item.title}</span></span>
          <button onClick={() => deleteItem(item.id)} className='delete-button'>X</button>
        </li>
      ))
      }
    </ul >
  )
}