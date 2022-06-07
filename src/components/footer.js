import { Divider, Link, styled } from "@mui/material";
const StyledFooter = styled("footer")(() => ({
  width: "100%",
  position: "static",
  left: 0,
  bottom: 0,
  marginTop: 25,
  "> div": { textAlign: "center" },
  img: {
    margin: 5,
    height: 25,
    ":hover": {
      transition: "transform .2s ease",
      transform: "scale(1.3)",
    },
  },
  ".MuiDivider-root": {
    fontSize: 14,
  },
}));

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <Divider variant="middle">Made by Harshad Gujar</Divider>
        <div>
          <Link
            href="https://www.instagram.com/harshad.gujar/?hl=en"
            target="_blank"
            rel="noreferer noopener"
          >
            <img src="/instagram.webp" alt="instagram" />
          </Link>

          <Link
            href="https://github.com/Harshad-23"
            target="_blank"
            rel="noreferer noopener"
          >
            <img src="/github.webp" alt="github" />
          </Link>

          <Link
            href="https://linkedin.com/in/harshad-gujar-7b5887212"
            target="_blank"
            rel="noreferer noopener"
          >
            <img src="/linkedin.webp" alt="linkedin" />
          </Link>
        </div>
      </StyledFooter>
    </>
  );
};

export default Footer;
