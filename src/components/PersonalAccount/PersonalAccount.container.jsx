import { useState } from "react";
import { $authHost } from "../../services/api.service";
import { useQuery } from "react-query";
import PersonalAccountView from "./PersonalAccount.view";
import { useParams } from "react-router-dom";

export const PersonalAccountContainer = () => {
  const { id } = useParams();
  const [showSubscription, setSubscription] = useState(false);
  const [showSubscribers, setSubscribers] = useState(false);
  const [subscribeList, setSubscribeList] = useState([]);
  const [subscribersList, setSubscribersList] = useState([]);
  const [imageString, setImageString] = useState("");
  const personalAccountQuery = useQuery(
    ["personalAccountData", id],
    async () => {
      const { data } = await $authHost.get(
        `${process.env.REACT_APP_URL}/user/profile/${id}`
      );
      if (data.avatar) {
        setImageString(() => data.avatar);
      }
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const subscriptionQuery = useQuery(
    ["subscriptionData", id],
    async () => {
      const { data } = await $authHost.get(
        `${process.env.REACT_APP_URL}/user/subscriptions/${id}`
      );
      setSubscribeList(() => [...data]);
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const subscribersAccountQuery = useQuery(
    ["subscribersData", id],
    async () => {
      const { data } = await $authHost.get(
        `${process.env.REACT_APP_URL}/user/subscribers/${id}`
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
    ["userPostsData", id],
    async () => {
      const { data } = await $authHost.get(
         `${process.env.REACT_APP_URL}/user/articles/${id}`
      );
      console.log(data,2345)
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <PersonalAccountView
      imageString={imageString}
      userPostsQuery={userPostsQuery}
      personalAccountQuery={personalAccountQuery}
      subscribersAccountQuery={subscribersAccountQuery}
      subscriptionQuery={subscriptionQuery}
      showSubscription={showSubscription}
      setSubscription={setSubscription}
      showSubscribers={showSubscribers}
      setSubscribers={setSubscribers}
      subscribeList={subscribeList}
      setSubscribeList={setSubscribeList}
      subscribersList={subscribersList}
      setSubscribersList={setSubscribersList}
    />
  );
};
