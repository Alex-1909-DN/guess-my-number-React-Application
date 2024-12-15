import PropTypes from "prop-types";
function Header({ onReset }) {
  console.log("Header rendering...");
  return (
    <header>
      <h1>Guess My Number 🎲</h1>
      <button className="btn reset" onClick={onReset}>
        Reset Game
      </button>
    </header>
  );
}
Header.propTypes = {
  onReset: PropTypes.func.isRequired,
};
export default Header;
