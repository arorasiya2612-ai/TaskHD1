
import { useEffect, useState } from "react";

export default function PostImagePicker({ image, setImage, disabled }) {
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  function selectFile(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setError("Choose a JPG, PNG, WebP or GIF image.");
      setImage(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Images must be 5 MB or smaller.");
      setImage(null);
      return;
    }

    setError("");
    setImage(file);
  }

  return (
    <div className="post-image-picker">
      <label htmlFor="post-image">
        Add an image (optional)
      </label>

      <p>
        Share a project screenshot, diagram, code result, or event photo.
        JPG, PNG, WebP or GIF, up to 5 MB.
      </p>

      <input
        id="post-image"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={selectFile}
        disabled={disabled}
      />

      {preview && (
        <div className="post-image-preview">
          <img
            src={preview}
            alt="Attachment preview"
          />

          <button
            type="button"
            onClick={() => setImage(null)}
            disabled={disabled}
          >
            Remove image
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}
