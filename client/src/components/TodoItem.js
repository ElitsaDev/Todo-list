import styles from "./TodoItem.module.css";

export const TodoItem = (props) => {
    let className = `todo`;
    
    if(props.isCompleted){
        className += 'is-completed';
    }
    
    return (
        <tr className={className}>
            <td>{props.text}</td>
            <td>{props.isCompleted ? 'Complete': 'Incomplete'}</td>
            <td className="todo-action">
                <button className={styles["todo-item"]} onClick={() => props.onClick(props)}>Change status</button>
                <button className={styles["todo-item"]} onClick={() => props.onDelete(props)}>Delete</button>
            </td>
        </tr>
    );
}