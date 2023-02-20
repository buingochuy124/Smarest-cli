import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import ShareLinkItem from "./ShareLinkItem";

const ShareLinkItems = () => {
  const authContext = useContext(AuthContext);
  const { shareLinkItems } = authContext;
  return (
    <>
      <div className="auth flex items-center w-full md:w-full">
        {shareLinkItems.map((item) => (
          <ShareLinkItem key={item.id} url={item.url} title={item.title} />
        ))}
      </div>
    </>
  );
};

export default ShareLinkItems;
