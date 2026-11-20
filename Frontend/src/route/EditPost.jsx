
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import PostImagePicker from "../PostImagePicker";
import { useAuth } from "../AuthContext";
import "./EditPost.css";

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `/api/posts/${encodeURIComponent(postId)}/edit`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load your post.");
        }

        if (cancelled) {
          return;
        }

        setPost(data.post);
        setTitle(data.post.title || "");
        setDescription(data.post.description || "");
        setAbstract(data.post.abstract || "");
        setArticleText(data.post.articleText || "");
        setTags((data.post.tags || []).join(", "));
        setImageUrl(data.post.imageUrl || "");
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  async function savePost(event) {
    event.preventDefault();

    if (!post || submitting) {
      return;
    }

    const tagList = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);

    if (
      title.trim().length < 5 ||
      tagList.length > 3 ||
      (post.postType === "question" && !description.trim()) ||
      (post.postType === "article" && (!abstract.trim() || !articleText.trim()))
    ) {
      setError("Check your title, content and tags. A maximum of 3 tags is allowed.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      let finalImageUrl = imageUrl;

      if (image) {
        const uploadResponse = await fetch("/api/posts/images", {
          method: "POST",
          headers: {
            "Content-Type": image.type,
            Authorization: `Bearer ${token}`
          },
          body: image
        });

        const uploaded = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploaded.message || "Image upload failed.");
        }

        finalImageUrl = uploaded.imageUrl;
      }

      const response = await fetch(
        `/api/posts/${encodeURIComponent(postId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            postType: post.postType,
            postPlan: post.postPlan,
            title: title.trim(),
            description: description.trim(),
            abstract: abstract.trim(),
            articleText: articleText.trim(),
            tags: tagList,
            imageUrl: finalImageUrl
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update your post.");
      }

      navigate("/dashboard", {
        replace: true
      });
    } catch (err) {
      setError(err.message || "Unable to update your post.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />

      <main className="new-post-page">
        <h1>Edit Post</h1>
        <p>Update your published question or article.</p>

        {loading && (
          <p role="status">
            Loading your post...
          </p>
        )}

        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}

        {!loading && post && (
          <form className="post-form" onSubmit={savePost}>
            <p>
              Post type: {post.postType} · Access: {post.postPlan}
            </p>

            <label htmlFor="edit-title">
              Title
            </label>

            <input
              id="edit-title"
              value={title}
              onChange={event => setTitle(event.target.value)}
              maxLength={150}
              required
            />

            {post.postType === "question" ? (
              <>
                <label htmlFor="edit-description">
                  Describe your problem
                </label>

                <textarea
                  id="edit-description"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  maxLength={5000}
                  rows={8}
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="edit-abstract">
                  Abstract
                </label>

                <textarea
                  id="edit-abstract"
                  value={abstract}
                  onChange={event => setAbstract(event.target.value)}
                  maxLength={1000}
                  rows={3}
                  required
                />

                <label htmlFor="edit-article">
                  Article text
                </label>

                <textarea
                  id="edit-article"
                  value={articleText}
                  onChange={event => setArticleText(event.target.value)}
                  maxLength={20000}
                  rows={8}
                  required
                />
              </>
            )}

            <label htmlFor="edit-tags">
              Tags (maximum 3, comma-separated)
            </label>

            <input
              id="edit-tags"
              value={tags}
              onChange={event => setTags(event.target.value)}
            />

            {imageUrl && (
              <div className="post-image-picker">
                <p>Current image</p>

                <img
                  className="browse-post-image"
                  src={imageUrl}
                  alt="Current post attachment"
                />

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setImageUrl("")}
                >
                  Remove current image
                </button>
              </div>
            )}

            <PostImagePicker
              image={image}
              setImage={setImage}
              disabled={submitting}
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Saving changes..." : "Save Changes"}
            </button>

            <Link
              to="/dashboard"
              style={{ marginLeft: "14px" }}
            >
              Cancel
            </Link>
          </form>
        )}
      </main>

      <Footer />
    </>
  );
}

export default EditPost;
