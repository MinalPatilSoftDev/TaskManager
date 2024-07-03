 //src/app/profile/page.jsx

 import UserContext from "../../context/userContext";
 import React, { useContext } from "react";

  const Profile = () => {

  const { user } = useContext(UserContext);

   return (
    <div>
        <h1 className="text-3xl text-rose-700 p-10 font-bold">Profile Page</h1>
       {/* {user ? (
        <div>
          <p>Name: {user.name}</p>
           <p>Email: {user.email}</p>
         </div>
       ) : (
         <p>Please log in to view your profile.</p>
       )}  */}
    </div>
   )
 }


export default Profile;