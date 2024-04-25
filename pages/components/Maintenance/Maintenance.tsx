import React, { useState, useEffect } from 'react';
import css from "./Maintenance.module.scss";

const MaintenancePage = () => {
  // State to track whether the text has been shown or not
  const [textShown, setTextShown] = useState(false);

  // Effect to set textShown to true once the component mounts
  useEffect(() => {
    setTextShown(true);
  }, []);

  // Render the text only if it hasn't been shown yet
  return (
    <div className={css.Maintenance}>
      {!textShown && (
        <>
          <h3>Sorry, the server is currently under maintenance.</h3>
          <p>We apologize for any inconvenience. Please try again later.</p>
        </>
      )}
    </div>
  );
}

export default MaintenancePage;
