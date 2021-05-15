import React from 'react';
import { useParams } from 'react-router';

export default function Dialog() {
  const { id } = useParams();
  return (
    <div className="dialog-container">
      {!id && (
        <>
          <div className="user-info-container">
            <div className="user-info-align">
              <img
                src="/img/user-avatar.png"
                className="user-avatar-md"
                alt="username"
              />
              <p>Hey there Kuldeep! Select user to chat</p>
            </div>
          </div>
        </>
      )}
      {id && <>
      </>}
    </div>
  );
}
