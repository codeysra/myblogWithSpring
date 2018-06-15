import React from 'react';

const requireAuth =(nextState, replace, next)=>{
    console.log("*************");
    if (!authenticated) {
        replace({
          pathname: "/login",
          state: {nextPathname: nextState.location.pathname}
        });
      }
      next();
};

export default requireAuth;
