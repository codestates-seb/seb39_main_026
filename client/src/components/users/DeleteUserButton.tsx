import { css } from '@emotion/react';
import { useState } from 'react';
import { Theme } from '../../styles/Theme';
import DeleteUserModal from './DeleteUserModal';

export default function DeleteUserButton({ id }: { id: string }) {
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const deleteUser = css`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: ${Theme.divisionLineColor};
    position: relative;
    float: right;
    margin-top: 0.5rem;
  `;
  return (
    <>
      <button
        css={deleteUser}
        type="button"
        onClick={() => setIsDeleteUserModalOpen(!isDeleteUserModalOpen)}
      >
        회원탈퇴
      </button>
      {isDeleteUserModalOpen && (
        <DeleteUserModal
          isDeleteUserModalOpen={isDeleteUserModalOpen}
          setIsDeleteUserModalOpen={setIsDeleteUserModalOpen}
          id={id}
        />
      )}
    </>
  );
}
