import React from "react";

const ShareLinkItem = ({ url, title }) => {
  return (
    <a
      className="text-white  p-2 rounded  inline-block no-underline hover:text-red-200 font-medium text-lg py-2 px-4 lg:-ml-2"
      href={url}
    >
      {title}
    </a>
  );
};

export default ShareLinkItem;
