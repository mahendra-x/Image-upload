import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../../../components/layout/Layout";
import { API_URL } from "../../../Config";

const Profile = () => {
  const param = useParams();
  const navigate = useNavigate();
  console.log("param navigate", param, navigate);
  const [profileData, setProfileData] = useState({
    name: "",
    // photo: "",
    description: "",
  });
  const [photo, setPhoto] = useState(null);
  const submitHandler = async () => {
    console.log("submitHandler called");
    if (profileData.name != "" && profileData.description != "") {
      console.log("CALL API", profileData);

      try {
        const profileRes = await axios({
          url: API_URL + "/admin/profile",
          method: "POST",
          data: {
            ...profileData,
          },
        });

        if (profileRes) {
          console.log("profileRes ", profileRes);
          if (profileRes?.data?.success) {
            uploadFile(profileRes?.data?.data?._id);
            navigate("/profiles");
          }
        }
      } catch (error) {
        console.log("API error", error);
      }
    } else {
      window.alert("Required Fields Missing");
    }
  };

  const updateHandler = async () => {
    console.log("updateHandler called");
    if (
      profileData.name != "" &&
      profileData.description != "" &&
      param?.profileid
    ) {
      const profileid = param?.profileid;
      console.log("CALL API");
      //   const toSubmit = {
      //     ...studentData
      //   }
      try {
        const submitProfile = await axios({
          url: API_URL + `/admin/profile/${profileid}`,
          method: "PUT",
          data: {
            ...profileData,
          },
        });

        if (submitProfile) {
          console.log("updateHandler submitProfile ", submitProfile);
          navigate("/profiles");
        }
      } catch (error) {
        console.log("API error", error);
        alert("ERROR");
      }
    } else {
      window.alert("Required Fields Missing");
    }
  };
  const getprofileData = async () => {
    if (param?.profileid) {
      const profileid = param?.profileid;
      try {
        const apiRes = await axios({
          url: API_URL + `/admin/profile/${profileid}`,
          method: "GET",
        });
        if (apiRes) {
          console.log("getprofileData", apiRes);
          setProfileData(apiRes?.data?.results);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  useEffect(() => {
    getprofileData();
  }, [param?.profileid]);

  const uploadFile = async (hashtagId) => {
    if (photo) {
      try {
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("model", "profile");
        formData.append("model_id", profileId);
        formData.append("model_key", "photo");
        const res = await axios({
          url: API_URL + `/upload`,
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res) {
          console.log("uploadPhotores", res?.data);
        }
      } catch (e) {
        console.log("uploadError", e);
      }
    }
  };
  return (
    <>
      <Layout>
        <div className="sm:-mt-40 w-full">
          <div className="min-h-screen bg-white text-gray-900 shadow-lg rounded">
            <main className=" mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Add New Profile</h1>
                <Link
                  to={"/profiles"}
                  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  See all
                </Link>
              </div>
              <div className="mt-6">
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-5 justify-center max-w-4xl m-auto">
                  <div className="col-span-1 sm:col-span-2 relative mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      onChange={(e) => {
                        console.log("NAME", e.target.value);
                        setProfileData({
                          ...profileData,
                          // name: "",
                          // mobile: "",
                          // gender: "",
                          // lang: "",
                          name: e.target.value,
                        });
                      }}
                      value={profileData?.name}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2 relative mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Photo
                    </label>
                    <input
                      type="file"
                      className="custom-file-input border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Photo"
                      onChange={(e) => {
                        console.log("photo", e.target.files[0]);
                        setPhoto(e.target.files[0] ?? null);
                      }}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2 relative mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      rows={5}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Description"
                      onChange={(e) => {
                        console.log("Description", e.target.value);
                        setProfileData({
                          ...profileData,
                          // Description: "",
                          // mobile: "",
                          // gender: "",
                          // lang: "",
                          description: e.target.value,
                        });
                      }}
                      value={profileData?.description}
                    />
                  </div>
                </div>
                <span
                  class=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded justify-center align-self-center align-center cursor-pointer"
                  // onClick={submitHandler}
                  onClick={() => {
                    param?.profileid ? updateHandler() : submitHandler();
                  }}
                >
                  Submit
                </span>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
