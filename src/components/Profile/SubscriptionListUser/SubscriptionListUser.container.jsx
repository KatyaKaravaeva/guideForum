import { $authHost } from "../../../services/api.service";
import SubscriptionListUserView from "./SubscriptionListUser.view";
import { useParams } from "react-router-dom";

export const SubscriptionListUserContainer = ({
  subscriptionFlag,
  subscriptionList,
  setSubscribeList,
  setSubscription,
}) => {
  const { id } = useParams();
  async function deleteSubscribe(subscription) {
    try {
      const { data } = await $authHost.post(
        `${process.env.REACT_APP_URL}/user/subscribtion/${subscription.userId}?status=false`
      );
      setSubscribeList((prev) =>
        prev.filter((x) => x.userId !== subscription.userId)
      );

      if (subscriptionList.length === 1) {
        setSubscription(() => false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SubscriptionListUserView
      subscriptionFlag={subscriptionFlag}
      deleteSubscribe={deleteSubscribe}
      subscriptionList={subscriptionList}
      setSubscribeList={setSubscribeList}
    />
  );
};
