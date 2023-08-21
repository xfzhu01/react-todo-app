import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import style from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import TodoModel from './TodoModel';
import CheckButton from './CheckButton';

const childVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(todo.status === 'completed');
  const [updateModelOpen, setUpdateModelOpen] = useState(false);

  useEffect(() => {
    setChecked(todo.status === 'completed');
  }, [todo.status]);
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Task deleted successfully');
  };
  const handleUpdate = () => {
    setUpdateModelOpen(true);
  };

  const handleCheck = () => {
    dispatch(
      updateTodo({
        ...todo,
        status: todo.status === 'completed' ? 'uncompleted' : 'completed',
      })
    );
    setChecked(!checked);
  };

  return (
    <>
      <motion.div className={style.item} variants={childVariants}>
        <div className={style.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={style.texts}>
            <p
              className={getClasses([
                style.todoText,
                todo.status === 'completed' && style['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={style.time}>
              {format(new Date(todo.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={style.todoActions}>
          <div
            className={style.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={style.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModel
        modelOpen={updateModelOpen}
        setModelOpen={setUpdateModelOpen}
        type="update"
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
