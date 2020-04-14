import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Context.css";
import { userTypes, contextReviewStatus } from "../../utils/constants";

// Component to create dynamic content list
export default function ContextList(props) {
  const userDetails = useSelector(state => state.userDetailsReducer);
  let roleId =
  userDetails.user && userDetails.user.RoleId
    ? userDetails.user.RoleId
    : null;

  function displayButtons() {
    if(props.listType === contextReviewStatus.ACCEPTED){
        return (
            <div className="action-groiup">
              <a href="#"> Edit </a>
              <a href="#"> Disable </a>
            </div>
          );
    }
  }

  return (
    <div className="video-card" key={props.index}>
      <div className="video-image-group">
        <img src="https://cdn.mos.cms.futurecdn.net/8mgLxGhj8EXPGvVyhedRHT.jpg" />
      </div>
      <div className="video-details-group">
        <div className="video-details-box">
          <h3 className="group-title">{props.listData.title}</h3>
          <p className="group-details">
            <strong>Player width</strong>
            <span>250mm</span>
            <strong>Player Height</strong>
            <span>150mm</span>
            <strong>Review Status</strong>
            <span>{props.listData.reviewStatus}</span>
            <strong>Question Type</strong>
            <span>{props.listData.Question.questionType}</span>
          </p>
          <div className="group-filds">
            <p className="group-details">
              <strong>{props.listData.Question.text}</strong>
            </p>

            {/* <p className="group-details"> */}
            {props.listData.Question.Options.map((optionData, index) => {
              return (
                <p className="group-details" key={index}>
                  {index + 1}. {optionData.answer}
                </p>
              );
            })}
            {/* </p> */}
            {displayButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}
