import { useQuery } from "react-query";
import CreateArticleView from "./CreateArticle.view";
import { $authHost } from "../../services/api.service";
import { useState } from "react";
import Modal from "../Modal/Modal";

export const CreateArticleContainer = () => {
  const [textEditor, setTextEditor] = useState("");
  const [isModalOpenFinish, setIsModalOpenFinish] = useState(false);
  const [isModalOpenNotAll, setIsModalOpenNotAll] = useState(false);
  const handleModalClose = () => {
    setIsModalOpenFinish(false);
  };

  const handleModalCloseNotAll = () => {
    setIsModalOpenNotAll(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const categories = target["article[categories]"].value;
    const title = target["article[title]"].value;
    if (!categories.trim() || !title.trim() || !textEditor.trim()) {
      setIsModalOpenNotAll(true);
      return;
    }
    try {
      const { data } = await $authHost.post("user/article", {
        categoryName: categories,
        title,
        text: textEditor,
      });
      setIsModalOpenFinish(true);
      setTextEditor((prev) => "");
      target["article[categories]"].value = "";
      target["article[title]"].value = "";
    } catch (error) {
      console.log(error);
    }
  }
  const categoriesQuery = useQuery(
    ["categoriesData"],
    async () => {
      const { data } = await $authHost.get(
        `${process.env.REACT_APP_URL}/article/category`
      );
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <CreateArticleView
        categoriesQuery={categoriesQuery}
        textEditor={textEditor}
        setTextEditor={setTextEditor}
        handleSubmit={handleSubmit}
      />
      {isModalOpenFinish && (
        <Modal isOpen={true} isDone={true} onClose={handleModalClose}>
          <p>Запись создана</p>
          <p>Поздравляем!</p>
        </Modal>
      )}

      {isModalOpenNotAll && (
        <Modal isOpen={true} isDone={false} onClose={handleModalCloseNotAll}>
          <p>Должны быть заполнены все поля</p>
        </Modal>
      )}
    </>
  );
};
