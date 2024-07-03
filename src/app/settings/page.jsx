// src/app/settings/page.jsx

 "use client"
import React, { useState, useContext, useEffect,useRef  } from 'react';
import UserContext from '@/context/userContext';
import { httpAxios } from "@/helper/httpHelper";
import axios from "axios";
import { useForm } from "react-hook-form"
import { useUser } from '@/hooks/userUser';


const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState('/profile-default-icon.png');
  // const [profileURL, setProfileURL] = useState('/profile-default-icon.png');
  const [hasProfilePic, setHasProfilePic] = useState(false);
  const [file,setFile]=useState()
  const { userData, mutate } = useUser();


  const {register,handleSubmit } = useForm()

  useEffect(() => {
    if (user && user.profilePic) {
      setProfilePic(user.profilePic);
      setHasProfilePic(true);
    }
  }, [user]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log({file})
    setProfilePic(file);
  };

  const onSubmit = async (data ) =>{
    const file = data.profile[0];
    const formData = new FormData()
    formData.append('file',data.profile[0])
    formData.append('userId',user._id)
  
     try {
      const response = await axios.put('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      //console.log("respaonse data:",response.data);

      // Update the profilePic state after successful upload
       setProfilePic(response.data.profileURL);
      mutate({ ...userData, profileURL: response.data.profileURL }, false);

     
    } catch (error) {
      console.error('Error uploading profile photo:', error);
    }
  }

  const handleeSubmit = async (e) => {
    e.preventDefault();
   
    if (isEditingPassword && newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      if (isEditingUsername) {
        const response = await axios.put('/api/settings?type=username', {
          userId: user._id,
          newUsername: username,
        });
        setUser({ ...user, name: username });
        setIsEditingUsername(false);
        setUsername('');
      }

      if (isEditingPassword) {
        const response = await axios.put('/api/settings?type=password', {
          userId: user._id,
          currentPassword,
          newPassword,
          confirmPassword,
        });
        setIsEditingPassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }


      if (isEditingProfile && file) {
        console.log("file:",file)
         const formData = new FormData();
         formData.append('profilePic', file);
         formData.append('userId', user._id);
         console.log({formData})
         

         const response = await axios.put('/api/profile', file, {
           headers: { 'Content-Type': 'multipart/form-data' },
         });

         setUser({ ...user, profileURL: response.data.profileURL });
         setIsEditingProfile(false);
         setFile(null);
      }
     
    } catch (error) {
      console.error('Error updating settings page:', error);
      alert('Failed to update Profile pic settings');
    }
  };

  const toggleEditUsername = () => {
    setIsEditingUsername(!isEditingUsername);
  };

  const toggleEditPassword = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  const toggleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };


  useEffect(() => {
    if (user) {
      const result = user.profileURL;
      // console.log("setting page profile url:: ", result);
      setProfilePic(result || '/profile-default-icon.png');
    }
  }, [user]);


  return (
    <>
      <div className=' mx-auto items-center bg-cover bg-center h-[92.2vh]' style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) ,url('/setting.jpg')`,}} >
        <h1 className='text-3xl text-rose-700 font-bold pt-10 px-10 flex items-center '>Profile Settings</h1>
        
        
          <div className='grid grid-cols-2 mt-16 w-[80%] p-12 h-[590px]  bg-white bg-opacity-65 rounded-[30px] justify-center mx-auto bg-cover bg-center' >

            {/* Profile Picture and username */}
            <div className=''>
              <h1 className='text-2xl text-rose-700 font-bold mb-16 '>User Information:</h1>
              <div className='flex items-center justify-center  mb-4 '>
                <img src={profilePic} alt="Profile Pic" className="rounded-full border-2 border-black border-opacity-25 shadow-xl shadow-gray-400 h-32 w-32" />;
              </div>

              <div className='w-full flex items-center justify-center  mb-10 pt-4'>
                <label htmlFor="username" className='pr-4 text-xl'>Username:</label>
                <span className='text-xl'>{user ? user.name : 'Loading...'}</span>
              </div>
            </div>

            {/* Update username, password and profile pic */}
            <div >
              {/* change username and password */}
              <form onSubmit={handleeSubmit}>
                <div className='flex flex-col w-full items-center pt-24 '>
                  
                  {/* change username */}
                  <div className='flex items-center mb-6 w-full font-semibold '>
                    {isEditingUsername && (
                      <>
                        <label htmlFor="username" className='w-1/2 pr-2'>New Username:</label>
                        <input type="text" id="username" placeholder='Enter new username' value={username} onChange={handleUsernameChange} className="w-full p-3 border border-gray-300 focus:outline-none  focus:border-sky-500 bg-gray-50 opacity-85" />
                      </>
                    )}
                    {/* <button type="button" onClick={toggleEditUsername} className="ml-4 mb-4 w-[45%] text-blue-500 ">
                      {isEditingUsername ? 'Cancel' : 'Change Username'}
                    </button> */}
                    {isEditingUsername ? (
                        <div className="flex items-center justify-center w-full space-x-4">
                          <button type="submit" className="px-6 py-2 font-semibold text-lg rounded-full  text-blue-500 hover:bg-blue-500 hover:text-white hover:border-[#188fffb7] hover:shadow-[#188fffb7]">
                            Save
                          </button>
                          <button type="button" onClick={toggleEditUsername} className="px-6 py-2 font-semibold text-lg rounded-full text-blue-500 hover:bg-blue-500 hover:text-white hover:border-[#188fffb7] hover:shadow-[#188fffb7]" >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button  type="button"onClick={toggleEditUsername}className="ml-4 mb-4 w-[45%]  text-blue-500 hover:text-blue-600 hover:underline ">
                          Change Username
                        </button>
                      )}

                  </div>

                  {/* change password */}
                  <div className='grid grid-rows-3 mt-4 items-center w-full font-semibold'>
                    {isEditingPassword && (
                      <>
                        <div className='flex items-center mb-4 w-full'>
                          <label htmlFor="current-password" className=' w-1/4'>Current Password:</label>
                          <input type="password" id="current-password" placeholder='Enter current password' value={currentPassword} onChange={handleCurrentPasswordChange} className="w-1/2 p-3 border border-gray-300 focus:outline-none focus:border-sky-500 bg-gray-50 opacity-85" />
                        </div>
                        <div className='flex items-center mb-4 w-full'>
                          <label htmlFor="new-password" className='pr-2 w-1/4'>New Password:</label>
                          <input type="password" id="new-password" placeholder='Enter new password' value={newPassword} onChange={handleNewPasswordChange} className="w-1/2 p-3 border border-gray-300 focus:outline-none focus:border-sky-500 bg-gray-50 opacity-85" />
                        </div>
                        <div className='flex items-center mb-4 w-full'>
                          <label htmlFor="confirm-password" className='pr-2 w-1/4'>Confirm Password:</label>
                          <input type="password" id="confirm-password" placeholder='Enter confirm password' value={confirmPassword} onChange={handleConfirmPasswordChange} className="w-1/2 p-3 border border-gray-300 focus:outline-none focus:border-sky-500 bg-gray-50 opacity-85" />
                        </div>
                      </>
                    )}
                    
                    {isEditingPassword ? (
                        <div className="flex items-center justify-center w-full space-x-4">
                          <button type="submit" className="px-6 py-2 font-semibold text-lg rounded-full   text-blue-500 hover:bg-blue-500 hover:text-white hover:border-[#188fffb7] hover:shadow-[#188fffb7]">
                            Save
                          </button>
                          <button type="button" onClick={toggleEditPassword} className="px-6 py-2 font-semibold text-lg rounded-full text-blue-500 hover:bg-blue-500 hover:text-white hover:border-[#188fffb7] hover:shadow-[#188fffb7]" >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button  type="button"onClick={toggleEditPassword}className="ml-4  w-[45%] text-blue-500 hover:text-blue-600 hover:underline">
                          Change Password
                        </button>
                      )}
                    
                  </div>

                  {/* {(isEditingUsername || isEditingPassword) && (
                    <div className='flex items-center justify-center w-1/2 mt-6'>
                      <button type="submit" className="mt-4 px-[15%] py-2 font-semibold text-lg ms-3 rounded-full border-[#188fff] border-2 shadow-sm shadow-[#183bff] bg-[#188fff] text-white hover:bg-[#188fffb7] hover:border-[#188fffb7] hover:shadow-[#188fffb7]">
                        Save Changes
                      </button>
                    </div>
                  )}
                */}
                </div>
              </form>

                {/* change profile pic */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center mt-4 w-full ml-3 font-semibold'>
                        {isEditingProfile&&(
                          <>
                            <input type="file" onChange={handleFileChange}  {...register('profile', { required: true })}/>
                          </>
                        )}
                          {isEditingProfile ? (
                          <div className="flex items-center justify-center w-full space-x-4">
                            <button type="submit" className="px-6 py-2 font-semibold text-lg rounded-full   text-blue-500 hover:bg-blue-500 hover:text-white hover:border-[#188fffb7] hover:shadow-[#188fffb7]">
                              Save
                            </button>
                            <button type="button" onClick={toggleEditProfile} className="px-6 py-2 font-semibold text-lg rounded-full text-blue-500 hover:bg-blue-500 hover:text-white hover:border-[#188fffb7] hover:shadow-[#188fffb7]" >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button  type="button"onClick={toggleEditProfile}className="ml-4  w-[45%] text-blue-500 hover:text-blue-600 hover:underline">
                            Change profile image
                          </button>
                        )}
                    </div>
                </form>
            </div>

          </div>
        </div>
      
    </>
  );
}



export default Settings;
