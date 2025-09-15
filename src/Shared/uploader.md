Perfecto, estás muy cerca. Para terminar de hacerlo reutilizable, vamos a:

---

### ✅ Mejoras clave

1. **Renombrar el componente a `Uploader` con mayúscula** (por convención de React).
2. **Generalizar los nombres:** usar `"file"` en vez de `"image"` en `FormData.append(...)`, o aceptar el nombre del campo como prop.
3. **Mostrar una previsualización que cambia según el tipo (`image`, `video`, etc)**.
4. **Generalizar los textos y `accept`**, y permitir pasarlos como props si querés más control.
5. **Usar correctamente los estados `fileUrl` y `previewUrl`.**

---

### 💡 Componente base `Uploader`

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { showSuccess } from "../Utils/toastify";

const Uploader = ({
  titleField,
  fileValue,
  onFileUpload,
  maxWidth = "300px",
  urlUpload,
  fileFieldName = "file", // nombre del campo en FormData
  accept = "*/*", // para imágenes: "image/*", para videos: "video/*"
  successMessage = "Archivo cargado exitosamente",
  type = "image" // o "video", afecta la vista previa
}) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(fileValue || "");
  const [previewUrl, setPreviewUrl] = useState(fileValue || "");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (fileValue) setPreviewUrl(fileValue);
  }, [fileValue]);

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
    setPreviewUrl(fileValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append(fileFieldName, file);
    const token = localStorage.getItem("validToken");

    try {
      const response = await axios.post(urlUpload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": `${token}`,
        },
      });

      if (response.status === 200) {
        setFileUrl(response.data.data.url);
        onFileUpload(response.data.data.url);
        showSuccess(successMessage);
        setAlert(true);
      }
    } catch (error) {
      console.error("Error al subir archivo:", error);
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
            accept={accept}
          />

          {previewUrl && (
            <>
              <p className="text-success">
                {alert ? successMessage : "Archivo existente:"}
              </p>
              {type === "image" ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ maxWidth, marginTop: "10px" }}
                />
              ) : (
                <video
                  controls
                  src={previewUrl}
                  style={{ maxWidth, marginTop: "10px" }}
                />
              )}
              {file && (
                <button
                  type="button"
                  className="btn btn-outline-danger me-3"
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

        {fileUrl && !file && (
          <div>
            {type === "image" ? (
              <img src={fileUrl} alt="Uploaded" style={{ maxWidth: "20rem" }} />
            ) : (
              <video
                src={fileUrl}
                controls
                style={{ maxWidth: "20rem", marginTop: "10px" }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
```

---

### 🧪 Cómo usarlo para imagen o video

**Imagen:**

```jsx
<Uploader
  titleField="Foto del producto"
  fileValue={imageUrl}
  onFileUpload={setImageUrl}
  urlUpload="/api/v1/uploadImage"
  fileFieldName="image"
  accept="image/*"
  type="image"
/>
```

**Video:**

```jsx
<Uploader
  titleField="Video del producto"
  fileValue={videoUrl}
  onFileUpload={setVideoUrl}
  urlUpload="/api/v1/uploadVideo"
  fileFieldName="video"
  accept="video/*"
  type="video"
  successMessage="Video subido correctamente"
/>
```

---

¿Querés que esta lógica también detecte automáticamente si es video o imagen según el archivo seleccionado (`file.type`)? También se puede hacer.
