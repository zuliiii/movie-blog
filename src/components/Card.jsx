import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import "./Card.css";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeUserLikedMovies } from "../store";

export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="containerrr"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movieData.image}`}
      />
      {isHovered && (
        <div className="hover">
          <div className="info-container flex column">
            <h3 className="name">{movieData.name}</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove From List"
                    onClick={() =>
                      dispatch(
                        removeUserLikedMovies({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    // <div
    //   className="containerrr"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   <img
    //     src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movieData.image}`}
    //   />
    //   {isHovered && (
    //     <div className="hover">
    //       <div className="image-video-container">
    //         <video
    //           src={video}
    //           autoPlay
    //           loop
    //           muted
    //           alt="video"
    //           onClick={() => navigate("/player")}
    //         />
    //       </div>
    //       <div className="info-container flex column">
    //         <h3 className="name" onClick={() => navigate("/player")}>
    //           {movieData.name}
    //         </h3>
    //         <div className="icons flex j-between">
    //           <div className="controls flex">
    //             <IoPlayCircleSharp
    //               title="play"
    //               onClick={() => navigate("/player")}
    //             />
    //             <RiThumbUpFill title="Like" />
    //             <RiThumbDownFill title="Dislike" />
    //             {isLiked ? (
    //               <BsCheck title="Remove From List" />
    //             ) : (
    //               <AiOutlinePlus title="Add to my list" />
    //             )}
    //           </div>
    //           <div className="info">
    //             <BiChevronDown title="More Info" />
    //           </div>
    //         </div>
    //         <div className="genres flex">
    //           <ul className="flex">
    //             {movieData.genres.map((genre) => (
    //               <li key={genre}>{genre}</li>
    //             ))}
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
});
