import React, { useState, useEffect } from "react";
import axios from "axios";
import { showSuccess } from "../Utils/toastify";

const VideoUploader = ({ titleField, videoValue, onVideoUpload, maxWidth = "300px" }) => {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(videoValue || "");
  const [previewUrl, setPreviewUrl] = useState(videoValue || "");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (videoValue) {
      setPreviewUrl(videoValue);
    }
  }, [videoValue]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setPreviewUrl(e.target.result);
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setPreviewUrl(videoValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);
    const token = localStorage.getItem("validToken");

    try {
      const response = await axios.post("/api/v1/uploadVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": `${token}`,
        },
      });

      if (response.status === 200) {
        setVideoUrl(response.data.data.url);
        onVideoUpload(response.data.data.url);
        showSuccess("Video cargado exitosamente");
        setAlert(true);
      }
    } catch (error) {
      console.error("Error al cargar el video:", error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8 mb-3 me-2">
        <section>
          <div className="d-flex justify-content-start align-items-center">
            <label className="form-label">{titleField}</label>
          </div>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept="video/*"
          />
          {previewUrl && (
            <>
              {alert ? (
                <p className="text-success">Video cargado exitosamente</p>
              ) : (
                <p className="text-success">Video existente:</p>
              )}
              <video
                controls
                src={previewUrl}
                style={{ maxWidth: maxWidth, marginTop: "10px" }}
              />
              {file && (
                <button
                  type="button"
                  className="btn btn-outline-danger mr-3"
                  onClick={handleDelete}
                >
                  Borrar selección
                </button>
              )}
            </>
          )}
          <button
            onClick={handleSubmit}
            className="btn btn-outline-primary"
            disabled={!file}
          >
            Subir
          </button>
        </section>

        {videoUrl && !file && (
          <div>
            <video
              controls
              src={videoUrl}
              style={{ maxWidth: "20rem", marginTop: "10px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
