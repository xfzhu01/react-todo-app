import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import { addTodo, updateTodo } from '../slices/todoSlice';
import style from '../styles/modules/modal.module.scss';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModel({ type, modelOpen, setModelOpen, todo }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('uncompleted');

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('uncompleted');
    }
  }, [type, todo, modelOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please fill the title');
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task added successfully');
        setModelOpen(false);
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
          toast.success('Task updated successfully');
          setModelOpen(false);
        } else {
          toast.error('No changes found');
          return;
        }
      }
      setModelOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modelOpen && (
        <motion.div
          className={style.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={style.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={style.closeButton}
              onClick={() => setModelOpen(false)}
              onKeyDown={() => setModelOpen(false)}
              tabIndex={0}
              role="button"
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={style.formTitle}>
                {type === 'update' ? 'Update' : 'Add'} Task
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="uncompleted">Uncompleted</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <div className={style.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'update' ? 'Update' : 'Add'} Task
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModelOpen(false)}
                  onKeyDown={() => setModelOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModel;
