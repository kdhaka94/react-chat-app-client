import React from 'react';
import Sidebar from './SideBar';
import Dialog from './Dialog';

export default function Messenger() {
  return (
    <div className='messenger-container'>
      <Sidebar />
      <Dialog />
    </div>
  );
}
