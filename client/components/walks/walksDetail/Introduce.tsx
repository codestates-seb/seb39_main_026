/* eslint-disable @next/next/no-img-element */
import { WalkDetail } from '../../../models/WalkDefault';

export default function Introduce({ walksData }: { walksData: WalkDetail }) {
  return (
    <>
      <article>
        <p>{walksData.body}</p>
      </article>
    </>
  );
}
