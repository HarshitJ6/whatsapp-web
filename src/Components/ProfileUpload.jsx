import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { Button, Modal } from "rsuite";

function ProfileUpload({ children, extensions }) {
  const displayNone = { display: "none" };
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* <button onClick={() => console.log(extensions)}></button> */}
      <label htmlFor="file" onClick={() => setShowModal(true)}>
        {children}
        <input id="file" type="file" style={displayNone} accept={extensions} />
      </label>
    </div>
  );
}

export default ProfileUpload;
