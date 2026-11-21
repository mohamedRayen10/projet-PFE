import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    // ← Event fields
    eventDeadline: {
      type: Date,
    },
    maxMembers: {
      type: Number,
    },
    attendees: {
      type: [String], // userIds
      default: [],
    },
    approvedAttendees: {
      type: [String],
      default: [],
    },
    
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
