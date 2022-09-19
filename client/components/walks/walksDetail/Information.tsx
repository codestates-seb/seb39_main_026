import React from 'react';
import { WalkDetail } from '../../../models/WalkDefault';

export default function Information({ walksData }: { walksData: WalkDetail }) {
  return (
    <ul>
      <li>일시</li>
      <li>{walksData?.time?.split(' ')[0]}</li>
      <li>시간대</li>
      <li>{walksData?.time?.split(' ')[1]} ~</li>
      <li>장소</li>
      <li>{walksData.address}</li>
    </ul>
  );
}
