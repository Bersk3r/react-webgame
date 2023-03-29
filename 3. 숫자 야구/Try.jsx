import React, { memo } from "react";

const Try = memo(({ tryInfo }) => {
    return (
      <li>
          <div>{tryInfo.try}</div>
          <div>{tryInfo.result}</div>
      </li>
    );
});

Try.displayName = 'zTry';

export default Try;