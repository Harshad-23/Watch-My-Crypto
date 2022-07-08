import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SelectButton = ({ children, onClick, selected }) => {
  const ButtonSpan = styled(Button)(({ theme }) => ({
    border: `1px solid ${theme.palette.mainColor.main}`,
    borderRadius: 5,
    padding: "10px 40px",
    margin: "0 3px",
    textTransform: "capitalize",
    wordBreak: "keep-all",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      paddingLeft: 3,
      paddingRight: 3,
      wordSpacing: "30px",
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
