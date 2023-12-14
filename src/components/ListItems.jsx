import { storeTodoList, getRandomId } from "../../utils";


export default function ListItems({ toDoList, setToDoList }) {

  const deleteItem = (id) => {
    const newList = toDoList.filter(item => item.id !== id);
    setToDoList(newList);
    localStorage.setItem('todo', JSON.stringify(newList));
  }

  const toggleChecked = (id) => {
    const newList = toDoList.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setToDoList(newList);
    localStorage.setItem('todo', JSON.stringify(newList));
  }



  return (

    <ul>
      {toDoList.map((item) => (
        <li id={item.id}>
          <span>
            <input type="checkbox" id="checkbox" checked={item.checked} onChange={() => toggleChecked(item.id)} />
            <span className={item.checked ? 'strikethrough' : ''}>{item.title}</span>
          </span>
          <button onClick={() => deleteItem(item.id)} className='delete-button'>X</button>
        </li>
      ))
      }
    </ul >


  )
}