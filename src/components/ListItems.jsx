import { storeTodoList, getRandomId } from "../../utils";


export default function ListItems({ toDoList }) {







  return (

    <ul>
      {toDoList.map((item) => (
        <li id={item.id}>
          <span><input type="checkbox" id="checkbox" />
            <span>{item.title}</span></span>
          <button className='delete-button'>X</button>
        </li>
      ))
      }
    </ul >


  )
}