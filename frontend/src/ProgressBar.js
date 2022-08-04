import React from 'react';

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 20,
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
      marginBottom: '10px',
      backgroundColor: "#e0e0de",
      borderRadius: 8,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${Math.round(completed)}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;