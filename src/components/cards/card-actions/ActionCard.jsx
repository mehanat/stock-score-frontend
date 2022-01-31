const ActionCard = ({title, increaseAbsolute, increasePercentage}) => {
  let color;
  let sign;
  if (title === 'Sold out' || title === 'Decrease') {
    if (title > 0) {
      sign = '-';
    }
    color = 'red_title';
  }
  if (title === 'Increase' || title === 'New purchase') {
    color = 'green_title';
    sign = '+';
  }
  if (increaseAbsolute > 500000) {
    increaseAbsolute = `${(increaseAbsolute / 1000000).toFixed(1)} mln`;
  } else if (increaseAbsolute < 500000) {
    increaseAbsolute = `${(increaseAbsolute / 1000).toFixed(1)} k`;
  }

  if (title === 'No change') {
    return <div className="noChange">{title}</div>;
  }

  return (
    <div className="actionCard__block">
      <div className="actionCard__block_title">
        <span className={`${color} title`}>{title}</span>{' '}
        {increasePercentage ? (
          <span className={color}>{(increasePercentage * 100).toFixed(1)} %</span>
        ) : null}
      </div>
      <div className={`${color} actionCard__block absolute`}>
        {sign}
        {increaseAbsolute} shares
      </div>
    </div>
  );
};

export default ActionCard;
