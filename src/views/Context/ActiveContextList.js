import React, { useState, useEffect } from "react";
import "./Context.css";
import { apiGet } from "../../utils/serviceManager";
import { backendRoutes, contextReviewStatus } from "../../utils/constants";
import ContextList from './ContextList';

export default function ActiveContextList(props) {
  const [contextList, setContextList] = useState([]);

  useEffect(() => {
    getContext();
  }, []);

  function getContext() {

    // setContextList(roughData.result.data);

    let queryParams =
      `start=0` +
      `&length=20` +
      `&columns[0][data]=id` +
      `&columns[0][name]=id` +
      `&columns[1][data]=reviewStatus` +
      `&columns[1][name]=reviewStatus&order[0][column]=0` +
      `&order[0][dir]=DESC` +
      `&search[value]=${""}`;
    apiGet(
      backendRoutes.GET_CONTEXTS + queryParams,
      {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      successRes => {
        // console.log("Success contextList data: ", successRes);
        setContextList(successRes.data.result.data);
      },
      errorRes => {
        console.log("Error contextList: ", errorRes);
      }
    );
  }

  function displayContextList() {
    if (contextList.length === 0) {
      return <div>No data found</div>;
    } else {
      console.log("Success contextList data: ", contextList);

      // let
      return (
        <div className="advert-video-box">
          {contextList.map((listData, index) => {
            return (
              <ContextList
                listData = {listData}
                index = {index}
                listType = {contextReviewStatus.ACCEPTED}
              />
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="animated fadeIn">
      {props.text}
      <div className="advert-video-wrapper">
        <div className="advert-video-group">
          {displayContextList()}

          <div className="advert-video-box">
            <div className="video-card">
              <div className="video-image-group">
                <img src="https://cdn.mos.cms.futurecdn.net/8mgLxGhj8EXPGvVyhedRHT.jpg" />
              </div>
              <div className="video-details-group">
                <div className="video-details-group">
                  <h3 className="group-title">
                    Easy to use, stylish placeholders
                  </h3>
                  <p className="group-details">
                    <strong>Player width</strong>
                    <span>250mm</span>
                    <strong>Player Height</strong>
                    <span>150mm</span>
                  </p>
                  <div className="group-filds">
                    <p className="group-details">
                      <strong>Ut cursus lectus ac ultricies viverra?</strong>
                    </p>
                    <p className="group-details">Ans1 | Ans2 | Ans3 | Ans4</p>
                  </div>
                  <div className="group-filds">
                    <p className="group-details">
                      <strong>Ut cursus lectus ac ultricies viverra?</strong>
                    </p>
                    <p className="group-details">Ans1 | Ans2 | Ans3 | Ans4</p>
                  </div>
                </div>
                <div className="action-groiup">
                  <a href="#"> Edit </a>
                  <a href="#"> Delete </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
