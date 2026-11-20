function QuestionForm({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  setTags,
  onPost,
  message,
}) {
  return (
    <section className="post-form">
      <h2>Write your question</h2>

      <p>
        Add a descriptive title and explain what you need help with.
      </p>

      <label htmlFor="question-title">Title</label>
      <input
        id="question-title"
        type="text"
        placeholder="Start your question with how, what, why, etc."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="question-description">
        Question details
      </label>
      <textarea
        id="question-description"
        placeholder="Question details..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={8}
      />

      <label htmlFor="question-tags">Tags</label>
      <input
        id="question-tags"
        type="text"
        placeholder="Add up to 3 tags, separated by commas"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="button" onClick={onPost}>
        Publish question
      </button>

      {message && <p role="status">{message}</p>}
    </section>
  );
}

export default QuestionForm;
