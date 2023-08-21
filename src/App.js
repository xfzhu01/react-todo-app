import React from 'react';
import { Toaster } from 'react-hot-toast';
import PageTitle from './components/PageTitle';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import style from './styles/modules/app.module.scss';

function App() {
  return (
    <div>
      <div className="container">
        <PageTitle>Todo List</PageTitle>
        <div className={style.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '1.4rem',
          },
        }}
      />
    </div>
  );
}

export default App;
