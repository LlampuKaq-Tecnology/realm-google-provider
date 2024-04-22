import { Button } from "cllk";
import React, { useEffect } from "react";

function RealmTiktokButton() {
  const get = async () => {
    const csrfState = Math.random().toString(36).substring(2);
    let url = "https://www.tiktok.com/v2/auth/authorize/";
    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += "?client_key=aw3x47bmmyxrhv0i";
    url += "&scope=user.info.basic,user.info.profile,user.info.stats";
    url += "&response_type=code";
    url += "&redirect_uri=https://www.llampukaq.com/me";
    url += "&state=" + csrfState;
    window.location.href = `${url}`;
  };

  return (
    <div onClick={get}>
      <Button>RealmTiktokButton</Button>
    </div>
  );
}

export default RealmTiktokButton;
