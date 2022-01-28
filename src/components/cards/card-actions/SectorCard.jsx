import React, {useRef} from 'react';

const SectorCard = ({mainSector}) => {
  const icon = useRef('');
  if (mainSector == 'Food') icon.current = 'food.png';
  if (mainSector == 'Tech.') icon.current = 'tech.png';
  if (mainSector == 'Bio') icon.current = 'bio.png';
  if (mainSector == 'Construct.') icon.current = 'construct.png';

  return (
    <div>
      <img src={`/images/${icon.current}`} alt="" />
    </div>
  );
};
export default SectorCard;
