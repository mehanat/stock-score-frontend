import {useRef} from 'react';

const RatingCard = ({rating}) => {
  const color = useRef('');

  if (rating <= 100 && rating >= 90) color.current = 'green';
  if (rating < 90 && rating >= 80) color.current = 'green-1';
  if (rating < 80 && rating >= 70) color.current = 'green-2';
  if (rating < 70 && rating >= 60) color.current = 'green-3';
  if (rating < 60 && rating >= 50) color.current = 'green-4';
  if (rating < 50 && rating >= 40) color.current = 'pink';
  if (rating < 40 && rating >= 20) color.current = 'pink-1';
  if (rating < 20 && rating >= 0) color.current = 'red';
  return (
    <>
      <div className={`rating__body ${color.current}`}>{rating}</div>
    </>
  );
};
export default RatingCard;
