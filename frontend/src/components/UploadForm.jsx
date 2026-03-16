import { useState } from "react";
import axios from "axios";

function UploadForm() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {

    if (!image) return alert("Select image");

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      "http://localhost:5000/api/upload",
      formData
    );

    setResult(res.data);
  };

  return (
    <div className="flex flex-col items-center gap-6">

      <input
        type="file"
        onChange={handleImage}
        className="border p-3 rounded-lg"
      />

      {preview && (
        <img
          src={preview}
          className="w-48 rounded-xl shadow-lg"
        />
      )}

      <button
        onClick={handleUpload}
        className="
        bg-[#088395]
        text-white
        px-6
        py-3
        rounded-lg
        shadow-md
        hover:bg-[#09637E]
        hover:scale-105
        transition
        "
      >
        Predict Disease
      </button>

      {result && (
        <div className="
        mt-6
        bg-[#7AB2B2]/20
        p-5
        rounded-xl
        text-center
        ">

          <h3 className="text-xl font-bold text-[#09637E]">
            Disease: {result.disease}
          </h3>

          <p>
            Recommended Hospital: {result.hospital}
          </p>

        </div>
      )}

    </div>
  );
}

export default UploadForm;