//externalimports
import PropTypes from "prop-types";

//internal imports
import styled from "styled-components";

const StyledUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 8px;
  color: #fff;
`;

const User = ({ comment }) => {
  return (
    <StyledUser>
      <div>
        <img src="/logo.svg" alt="" />
      </div>
      <div>
        <span>
          <b>Saad Hassan</b>
        </span>
        <p>{comment && comment}</p>
      </div>
    </StyledUser>
  );
};

//declaring proptypes

User.propTypes = {
  comment: PropTypes.string,
};
export default User;
