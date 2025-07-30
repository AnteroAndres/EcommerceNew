import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600]">Shop by category</h3>
        <div className="scroll">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
