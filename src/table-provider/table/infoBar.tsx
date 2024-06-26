import React from 'react';
export default ({ infoContent, infoBarClassName }) => {
  return (
    <div className={`table-info-bar ${infoBarClassName}`}>{infoContent}</div>
  );
};
