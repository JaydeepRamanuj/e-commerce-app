import React from "react";

async function UsersPage({ params }) {
  const { userId } = params;
  return (
    <>
      <div>UsersPage</div>
      <h1>user id: {userId}</h1>
    </>
  );
}

export default UsersPage;
