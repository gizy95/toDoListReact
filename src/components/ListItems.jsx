export default function ListItems({ toDoList, setToDoList, getUpdateItem}) {
  
  const deleteItem = (id) => {
    const newList = toDoList.filter(item => item.id !== id);
    setToDoList(newList);
  }

  const toggleChecked = (id) => {
    const newList = toDoList.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item);
    setToDoList(newList);
    localStorage.setItem('todo', JSON.stringify(newList));
  }

  return (
    <ul>
      {toDoList.map((item) => (
        <li id={item.id}>
          <span>
            <input type="checkbox" id="checkbox" checked={item.isChecked} onChange={() => toggleChecked(item.id)} />
            <span
             onClick={() => getUpdateItem(item.id)}
             className={item.isChecked ? 'strikethrough' : ''}>{item.title}</span>
            </span>
          <button onClick={() => deleteItem(item.id)} className='delete-button'>X</button>
        </li>
      ))
      }
    </ul >
  )
}