import { useState } from "react";
import ProfileView from "./Profile.view";
import { $authHost } from "../../services/api.service";
import { useQuery } from "react-query";
import Compressor from "compressorjs";

export const ProfileContainer = () => {
  const [userData, setUserData] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [subscribeList, setSubscribeList] = useState([]);
  const [subscribersList, setSubscribersList] = useState([]);
  const [showSubscription, setSubscription] = useState(false);
  const [showSubscribers, setSubscribers] = useState(false);
  const [imageString, setImageString] = useState("");
  const profileQuery = useQuery(
    ["userProfileData"],
    async () => {
      const { data } = await $authHost.get(
        `${process.env.REACT_APP_URL}/user/profile`
      );
      setUserData((prev) => ({ ...prev, ...data }));
      if (data.avatar) {
        setImageString(() => data.avatar);
      }
      console.log(data);
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const subscriptionProfileQuery = useQuery(
    ["subscriptionProfileUserData"],
    async () => {
      const { data } = await $authHost.get(
        `${process.env.REACT_APP_URL}/user/subscribtion`
      );
      setSubscribeList(() => [...data]);
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const subscribersProfileQuery = useQuery(
    ["subscribersProfileUserData"],
    async () => {
      const { data } = await $authHost.get(
        `${process.env.REACT_APP_URL}/user/subscribers`
      );
      setSubscribersList(() => [...data]);
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const userPostsQuery = useQuery(
    ["userPostsData"],
    async () => {
      const { data } = await $authHost.get(
        `${process.env.REACT_APP_URL}/user/article`
      );
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    if (isActive) return;
    const { username, cardDetails, profile } = userData;
    try {
      const { data } = await $authHost.put("/user/profile", {
        username,
        cardDetails,
        profile,
      });
      setUserData((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePicture(file) {
    const { username, cardDetails, profile } = userData;
    try {
      if (file) {
        const { data } = await $authHost.put("/user/profile", {
          username,
          cardDetails,
          profile,
          avatar: file,
        });
        setUserData((prev) => ({ ...prev, ...data }));
        if (data.avatar) {
          setImageString(data.avatar);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function changeHandler(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.7,
        mimeType: "image/jpeg",
        success(result) {
          const reader = new FileReader();
          reader.onloadend = function () {
            const compressedImageBase64 = reader.result;
            updatePicture(compressedImageBase64);
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.log(err.message);
        },
      };
      new Compressor(file, options);
    }
  }

  return (
    <ProfileView
      imageString={imageString}
      userPostsQuery={userPostsQuery}
      subscriptionProfileQuery={subscriptionProfileQuery}
      subscribersProfileQuery={subscribersProfileQuery}
      subscribeList={subscribeList}
      subscribersList={subscribersList}
      setSubscribers={setSubscribers}
      showSubscribers={showSubscribers}
      setSubscribeList={setSubscribeList}
      setSubscribersList={setSubscribersList}
      showSubscription={showSubscription}
      setSubscription={setSubscription}
      profileQuery={profileQuery}
      isActive={isActive}
      setIsActive={setIsActive}
      handleSubmit={handleSubmit}
      userData={userData}
      setUserData={setUserData}
      changeHandler={changeHandler}
    />
  );
};
