import { useParams } from "react-router-dom";
import { $authHost } from "../../../services/api.service";
import CommentsListView from "./SubscriptionList.view";
import { useRef } from "react";
import SubscriptionListView from "./SubscriptionList.view";

export const SubscriptionListContainer = ({ usersList, setUsersList }) => {
  const { id } = useParams();
  return (
    <SubscriptionListView
    usersList={usersList}
    setUsersList={setUsersList}
    />
  );
};
