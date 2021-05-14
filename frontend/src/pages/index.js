import "../assets/css/index.css";
import { InputUploadImage } from "../components/InputUploadImage";
import { ImageCardList } from "../components/ImageCardList";

const MainPage = () => {
  return (
    <div>
      <h2 className="mt-3">Upload Image</h2>
      <InputUploadImage />
      <ImageCardList />
    </div>
  );
};

export default MainPage;
