
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Header from "../Header";
import Footer from "../Footer";
import "./UserDashboard.css";

function UserDashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch("/api/my/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load dashboard."
          );
        }

        if (!cancelled) {
          setDashboard(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = dashboard?.statistics;

  return (
    <>
      <Header />

      <main className="user-dashboard">

        <section className="user-dashboard-heading">
          <div>
            <p className="dashboard-eyebrow">
              PERSONAL WORKSPACE
            </p>

            <h1>My Dashboard</h1>

            <p className="dashboard-intro">
              Welcome back, {dashboard?.user?.fullName || user?.fullName || "User"}.
              Here's an overview of your DEV@Deakin activity.
            </p>
          </div>

          <Link to="/post" className="dashboard-create-button">
            <span aria-hidden="true">＋</span> Create a Post
          </Link>
        </section>

        {loading && (
          <p className="dashboard-message">
            Loading your dashboard...
          </p>
        )}

        {error && (
          <p className="dashboard-error">
            {error}
          </p>
        )}

        {!loading && !error && dashboard && (
          <>
            <section className="dashboard-profile">
              <div className="profile-avatar">
                {(dashboard.user.fullName || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="dashboard-profile-details">
                <p className="dashboard-profile-label">ACCOUNT OVERVIEW</p>
                <h2>{dashboard.user.fullName}</h2>
                <p>{dashboard.user.email}</p>
                <span className={`dashboard-plan ${dashboard.user.plan}`}>
                  {dashboard.user.plan} member
                </span>
              </div>
            </section>

            <div className="dashboard-stats-heading">
              <div>
                <h2>At a glance</h2>
                <p>A quick snapshot of your contributions and engagement.</p>
              </div>
            </div>
            <section className="dashboard-stats" aria-label="Your activity statistics">
              <div className="dashboard-stat-card">
                <span className="stat-icon" aria-hidden="true">▤</span>
                <h3>{stats.totalPosts}</h3>
                <p>Total Posts</p>
              </div>

              <div className="dashboard-stat-card">
                <span className="stat-icon" aria-hidden="true">?</span>
                <h3>{stats.questions}</h3>
                <p>Questions</p>
              </div>

              <div className="dashboard-stat-card">
                <span className="stat-icon" aria-hidden="true">▥</span>
                <h3>{stats.articles}</h3>
                <p>Articles</p>
              </div>

              <div className="dashboard-stat-card">
                <span className="stat-icon" aria-hidden="true">♡</span>
                <h3>{stats.likesReceived}</h3>
                <p>Likes Received</p>
              </div>

              <div className="dashboard-stat-card">
                <span className="stat-icon" aria-hidden="true">◌</span>
                <h3>{stats.commentsReceived}</h3>
                <p>Comments Received</p>
              </div>

              <div className="dashboard-stat-card">
                <span className="stat-icon" aria-hidden="true">↪</span>
                <h3>{stats.repliesReceived}</h3>
                <p>Replies Received</p>
              </div>
            </section>

            <section className="dashboard-content">

              <div className="dashboard-section-heading">
                <div>
                  <h2>My Posts</h2>
                  <p>Content you've shared with the community.</p>
                </div>

                <span className="dashboard-published-count">
                  <span className="dashboard-status-dot" aria-hidden="true"></span>
                  {stats.publishedPosts} Published
                </span>
              </div>

              {dashboard.posts.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="dashboard-empty-icon" aria-hidden="true">✦</div>
                  <h3>Your story starts here</h3>
                  <p>You haven't published a post yet. Share a question or write an article to start building your contribution history.</p>
                  <Link to="/post">Create your first post <span aria-hidden="true">→</span></Link>
                </div>
              ) : (
                <div className="dashboard-post-list">
                  {dashboard.posts.map((post) => (
                    <article
                      className="dashboard-post-card"
                      key={post.id}
                    >
                      <div className="dashboard-post-header">
                        <span className={`dashboard-post-type ${post.postType}`}>
                          {post.postType}
                        </span>

                        <span className={`dashboard-post-status ${post.status}`}>
                          {post.status}
                        </span>
                      </div>

                      <h3>{post.title}</h3>

                      <p className="dashboard-post-date">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "Date unavailable"}
                      </p>

                      {post.status !== "removed" && (
                        <Link
                          to={`/posts/${post.id}/edit`}
                          className="dashboard-edit-post"
                        >
                          Edit Post
                        </Link>
                      )}

                      <div className="dashboard-post-engagement">
                        <span>❤️ {post.likeCount} Likes</span>
                        <span>💬 {post.commentsCount} Comments</span>
                        <span>↪ {post.repliesCount} Replies</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

            </section>

            <section className="dashboard-recent">
              <div className="dashboard-recent-heading">
                <h2>Recent Activity</h2>
                <p>Your five most recently created posts.</p>
              </div>

              {dashboard.recentPosts.length === 0 ? (
                <div className="dashboard-recent-empty">
                  <span aria-hidden="true" className="dashboard-recent-empty-icon">↗</span>
                  <div>
                    <strong>No recent activity yet</strong>
                    <p>Your latest posts will appear here when you start sharing with the community.</p>
                  </div>
                </div>
              ) : (
                <ul>
                  {dashboard.recentPosts.map((post) => (
                    <li key={post.id}>
                      <span>
                        <strong>{post.title}</strong>
                        <small>
                          {post.postType} · {post.status}
                        </small>
                      </span>

                      <span>
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "Date unavailable"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

      </main>

      <Footer />
    </>
  );
}

export default UserDashboard;
