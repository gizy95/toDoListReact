import { storeTodoList, getRandomId } from "../../utils";


export default function ListItems({ toDoList, setToDoList }) {

  const deleteItem = (id) => {
    const newList = toDoList.filter(item => item.id !== id);
    setToDoList(newList);
    localStorage.setItem('toDoList', JSON.stringify(newList));
  }





  return (

    <ul>
      {toDoList.map((item) => (
        <li id={item.id}>
          <span><input type="checkbox" id="checkbox" />
            <span>{item.title}</span></span>
          <button onClick={() => deleteItem(item.id)} className='delete-button'>X</button>
        </li>
      ))
      }
    </ul >


  )
}