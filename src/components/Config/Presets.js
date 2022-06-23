const PresetsConfig = () => {
  // Make an icon when preset has been changed and not saved
  // Grey out save icon when there are no changes
  // Fill the button with some color when there is a preset populating it

  return (
    <div className='card presets-config config-item'>
      <div className='header'>
        <div className='title'>
          <i className='config-icon fa-solid fa-cogs'></i>Presets
        </div>
        <div className='buttons'>
          <button className='presets-load-btn'>Load</button>
          <button className='presets-save-btn'>Save</button>
        </div>
      </div>
      <div className='presets-list'>
        <fieldset>
          <input type='radio' id='presets-item-A' name='presets-slots' />
          <label htmlFor='presets-item-A'>A</label>

          <input type='radio' id='presets-item-B' name='presets-slots' />
          <label htmlFor='presets-item-B'>B</label>

          <input type='radio' id='presets-item-C' name='presets-slots' />
          <label htmlFor='presets-item-C'>C</label>

          <input type='radio' id='presets-item-D' name='presets-slots' />
          <label htmlFor='presets-item-D'>D</label>
        </fieldset>
      </div>
    </div>
  );
};

export default PresetsConfig;
