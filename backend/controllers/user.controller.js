import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Bonjour de Test Backend" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Non autorisée"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long")
      );
    }
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Le nom d’utilisateur doit comporter entre 7 et 20 caractères")
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Le nom d’utilisateur ne peut pas contenir d’espaces"));
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Le nom d’utilisateur doit être en minuscules"));
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Le nom d’utilisateur ne doit contenir que des lettres et des chiffres")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          tele: req.body.tele,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Non autorisée"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("L’utilisateur a été supprimé");
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("L’utilisateur a été déconnecté");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Non autorisée"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "Utilisateur introuvable"));
    }

    const { password, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// New function to make a user an admin with a maximum of 3 admins allowed
export const makeAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Non autorisée"));
  }
  try {
    // Check current admin count
    const adminCount = await User.countDocuments({ isAdmin: true });
    if (adminCount >= 3) {
      return next(errorHandler(400, "Maximum de 3 administrateurs autorisés"));
    }

    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(404, "Utilisateur introuvable"));
    }
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// New function to remove admin privileges from a user ensuring at least one admin remains
export const removeAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Non autorisée"));
  }
  try {
    // Check current admin count
    const adminCount = await User.countDocuments({ isAdmin: true });
    if (adminCount <= 1) {
      return next(errorHandler(400, "Au moins un administrateur doit être présent"));
    }

    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAdmin: false },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(404, "Utilisateur introuvable"));
    }
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
