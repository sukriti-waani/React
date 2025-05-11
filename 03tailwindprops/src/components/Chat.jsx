import React from "react";

const Chat = ({username, btnText="visit me"}) => {
  // console.log("props", props);
  console.log(username)
  return (
    <>
      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4">
        <div class="shrink-0">
          <img class="size-12" src="/img/logo.svg" alt="ChitChat Logo" />
        </div>
        <div>
          <div class="text-xl font-medium text-black">{username}</div>
          <p class="text-slate-500">You have a new message! {btnText || "visit me"}  </p>
        </div>
      </div>
    </>
  );
};

export default Chat;
