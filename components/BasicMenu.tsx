import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import router from "next/router";
import { useState } from "react";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const list = () => {
    router.push("/MyList");
  };

  const home = () => {
    router.push("/Home");
  };

  const like = () => {
    router.push("/MyLike");
  };

  const movie = () => {
    router.push("/MyMovie");
  };


  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={home}>Home</MenuItem>
        <MenuItem onClick={handleClose}>TV Shows</MenuItem>
        <MenuItem onClick={movie}>Movies</MenuItem>
        <MenuItem onClick={handleClose}>New & Popular</MenuItem>
        <MenuItem onClick={list}>My List</MenuItem>
        <MenuItem onClick={like}>My Like</MenuItem>
      </Menu>
    </div>
  );
}
