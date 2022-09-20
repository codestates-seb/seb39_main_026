import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Theme } from '../../styles/Theme';
import AddressModal from './AddressModal';

export default function AddressPicker() {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedVillage, setSelectedVillage] = useState<string | null>(
    '산책할 동네를 골라주세요'
  );
  const handleAddressModalOpen = () => {
    setIsAddressModalOpen(!isAddressModalOpen);
  };

  const AddressPickerContainer = css`
    margin: 1rem 1rem 0 0;
    display: flex;
    justify-content: flex-end;
    .currentAddress {
      cursor: pointer;
      font-weight: 500;
      color: ${Theme.mainColor};
      font-size: 1rem;
    }
    .icon {
      margin-right: 0.5rem;
    }
  `;

  useEffect(() => {
    if (!localStorage.getItem('currentAddress')) {
      setSelectedVillage('동네를 선택하세요');
    } else {
      setSelectedVillage(localStorage.getItem('currentAddress'));
    }
  }, [isAddressModalOpen]);

  return (
    <div css={AddressPickerContainer}>
      <div className="currentAddress" onClick={handleAddressModalOpen}>
        <Icon
          icon="akar-icons:chevron-down"
          color={Theme.mainColor}
          className="icon"
        />
        {selectedVillage}
      </div>
      {isAddressModalOpen ? (
        <AddressModal
          isModalOpen={isAddressModalOpen}
          setIsModalOpen={setIsAddressModalOpen}
        />
      ) : (
        ''
      )}
    </div>
  );
}
