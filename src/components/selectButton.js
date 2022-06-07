import { styled } from "@mui/material/styles";

const SelectButton = ({ children, onClick, selected }) => {
  const ButtonSpan = styled("span")(({ theme }) => ({
    border: `1px solid ${theme.palette.mainColor.main}`,
    borderRadius: 5,
    padding: "10px 40px",
    margin: 5,
    [theme.breakpoints.down("md")]: {
      padding: 10,
    },
    [theme.breakpoints.down("sm")]: {
      padding: 3,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: "0.8rem",
    },
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.mainColor.main,
      color: "black",
      fontWeight: 700,
    },
    width: "22%",
    backgroundColor: selected ? theme.palette.mainColor.main : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
  }));
  return (
    <ButtonSpan onClick={onClick} selected={selected}>
      {children}
    </ButtonSpan>
  );
};

export default SelectButton;
