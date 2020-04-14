export const backendRoutes = {
  BASE_URL: "http://core.skipquest.com/",
  LOGIN: "auth/signin",
  USER_REGISTRATION: "users/registration",
  FORGOT_PASSWORD: "auth/forgot-password",
  UPLOAD_LOGO: "logos",
  UPLOAD_CLIP: "clips",
  USERS: "users/",
  CREATE_CONTEXT: "contexts/all",
  GET_USER_PROFILE: "me/",
  GET_CONTEXTS: "contexts/all?",
  CAMPAIGN: 'campaign/'
};

export const frontendRoutes = {
  login: { path: "/login", name: "Login page" },
  register: { path: "/register", name: "Register page" },
  forgotPassword: { path: "/forgot-password", name: "Forgot password page" },
  home: { path: "/", name: "Home" },
  dashboard: { path: "/dashboard", name: "Dashboard" },
  campaigns: { path: "/campaigns", name: "Campaigns" },
  createCampaigns: { path: "/campaigns/create", name: "Create Campaign" },
  editCampaigns: { path: "/campaigns/edit", name: "Edit Campaign" },
  context: { path: "/content", name: "Content" },
  createContext: {path: "/content/create", name: "Create Context"},
  activeContext: {path: "/content/active", name: "Active Context"},
  pendingContext: {path: "/content/pending", name: "Pending Context"},
  users: { path: "/users", name: "Users" },
  createUser: { path: "/users/create", name: "Create" },
  user: { path: "/users/:id", name: "User Details" }
};

export const messages = {
  EMAIL_SENT:
    "An email is sent to reset your password.\n Please login to continue.",
  NETWORK_FAILURE: " Server not found, Please check your network."
};

export const contextQuestionTypes = {
  MCQ4: "Correct-Incorrect with 4 answers.",
  MCQ3: "Correct-Incorrect with 3 answers",
  TRUEANDFALSE: "2 answers (TRUE/FALSE)",
  SQ4: "Survey Question with 4 answers",
  SQ3: "Survey Question with 3 answers"
};

export const contextStatus = {
  ACTIVE: "ACTIVE",
  PAUSE: "PAUSE"
};

export const contextReviewStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED"
};

export const userRole = {
  ADMIN: 1,
  EDITOR: 2,
  CLIENT: 3,
  PUBLISHER: 4
};

export const userTypes = {
  ADMIN: "Admin",
  CLIENT: "Client",
  EDITOR: "Editor",
  PUBLISHER: "Publisher"
};
