import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { TbDots } from "react-icons/tb";
const SelectAction = ({ isDark }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={`outline-${isDark ? "light" : "none"}`}
        id="dropdown-basic"
      >
        <TbDots />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Save</Dropdown.Item>
        <Dropdown.Item>Copy link</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectAction;
