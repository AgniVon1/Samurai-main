import React from 'react';


type PropsType = {}
export const LoginForm = (props:PropsType) => {
  return (
    <div>
      <form>
        <div>
          <input placeholder={ "Login"}/>
        </div>
        <div>
          <input placeholder={ "Password"}/>
        </div>
        <div>
          <input type = {"checkbox"} placeholder={ "Password"}/> Remember me
        </div>
        <div>
          <button>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
