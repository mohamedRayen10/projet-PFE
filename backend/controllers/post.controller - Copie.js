// ✅ already present imports
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

// ✅ already present - createPost
export const createPost = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Title and content are required"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  if (req.body.category === "Event") {
    if (!req.body.eventDeadline || !req.body.maxMembers) {
      return next(
        errorHandler(
          400,
          "Event posts require a deadline date and a maximum number of members"
        )
      );
    }
  }

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
    approvedAttendees: [], // ✅ new field for admin-approved members
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// ✅ already present - getPosts
export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.find({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ already present - deletePost
export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to delete this post")
    );
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    next(error);
  }
};

// ✅ already present - updatePost
export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to update this post")
    );
  }

  if (req.body.category === "Event") {
    if (!req.body.eventDeadline || !req.body.maxMembers) {
      return next(
        errorHandler(
          400,
          "Event posts require a deadline date and a maximum number of members"
        )
      );
    }
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          eventDeadline: req.body.eventDeadline,
          maxMembers: req.body.maxMembers,
          attendees: req.body.attendees || [],
          approvedAttendees: req.body.approvedAttendees || [], // ✅ new field
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// ✅ already present - joinEvent
export const joinEvent = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    if (post.category !== "Event") {
      return next(errorHandler(400, "Cannot join a non-event post"));
    }
    if (post.attendees.includes(req.user.id)) {
      return next(errorHandler(400, "You have already requested to join this event"));
    }
    if (post.attendees.length >= post.maxMembers) {
      return next(errorHandler(400, "Event is full"));
    }

    post.attendees.push(req.user.id);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// ✅ NEW: Admin approves a member
export const approveMember = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    if (!req.user.isAdmin || req.user.id !== post.userId.toString()) {
      return next(errorHandler(403, "Only the event owner can approve members"));
    }

    const memberId = req.body.memberId;

    if (!post.attendees.includes(memberId)) {
      return next(errorHandler(400, "This user did not request to join the event"));
    }

    if (post.approvedAttendees.includes(memberId)) {
      return next(errorHandler(400, "This user is already approved"));
    }

    if (post.approvedAttendees.length >= post.maxMembers) {
      return next(errorHandler(400, "Event has reached max capacity"));
    }

    post.approvedAttendees.push(memberId);
    await post.save();
    res.status(200).json({ message: "Member approved", post });
  } catch (err) {
    next(err);
  }
};
