export const ROUTES = {
  ROUTE_HOME: "/",
  ROUTE_SIGN_IN: "/sign-in",
  ROUTE_SIGN_UP: "/sign-up",
  ROUTE_BOARD: (boardId: string) => `/board/${boardId}`,
  ROUTE_ADD_TASK: (boardId: string) => `/board/${boardId}/add-task`,
  ROUTE_TASK: (boardId: string, taskId: string) =>
    `/board/${boardId}/t/${taskId}`,
  ROUTE_EDIT_TASK: (boardId: string, taskId: string) =>
    `/board/${boardId}/t/${taskId}/edit-task`,
  ROUTE_DELETE_TASK: (boardId: string, taskId: string) =>
    `/board/${boardId}/t/${taskId}/delete-task`,
  ROUTE_SETTINGS: (boardId: string) => `/board/${boardId}/settings`,
  ROUTE_CALENDAR: (boardId: string) => `/board/${boardId}/calendar`,
  ROUTE_MESSAGES: `/messages`,
  ROUTE_NEW_MESSAGE: `/messages/new-message`,
};
