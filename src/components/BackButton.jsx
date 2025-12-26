import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./BackButton.module.css";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className={styles.backButtonContainer}>
      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
}

export default BackButton;

// import { useNavigate } from "react-router-dom";
// import Button from "./Button";

// function BackButton() {
//   const navigator = useNavigate();

//   return (
//     <Button
//       type="back"
//       onClick={(e) => {
//         e.preventDefault();
//         navigator(-1);
//       }}
//     >
//       &larr; Back
//     </Button>
//   );
// }

// export default BackButton;
