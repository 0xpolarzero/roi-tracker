import React, { useEffect } from 'react';

const ProgressBar = ({ loadingProgress }) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(loadingProgress.progress);
  }, [loadingProgress]);

  return (
    <div className='progress-container'>
      <div className='progress'>
        <span className='progress-bar' style={{ width: `${value}%` }}></span>
      </div>
      <span className='progress-message'>{loadingProgress.message}</span>
    </div>
  );
};

export default ProgressBar;
