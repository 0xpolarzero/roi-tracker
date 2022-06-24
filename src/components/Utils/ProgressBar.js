import React, { useEffect } from 'react';

const ProgressBar = ({ loadingProgress }) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(loadingProgress);
  }, [loadingProgress]);

  return (
    <div className='progress'>
      <span className='progress-bar' style={{ width: `${value}%` }}></span>
    </div>
  );
};

export default ProgressBar;
