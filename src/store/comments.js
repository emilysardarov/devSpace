import axios from 'axios';

const comments = (state = [], action) => {
  if (action.type === 'SET_COMMENTS') {
    return action.comments;
  }
  if (action.type === 'CREATE_COMMENT') {
    return [...state, action.comment];
  }
  if (action.type === 'EDIT_COMMENT') {
    return state.map((comment) =>
      comment.id === action.comment.id ? action.comment : comment
    );
  }
  if (action.type === 'DELETE_COMMENT') {
    return state.filter((comment) => comment.id !== action.comment);
  }
  return state;
};

const _setComments = (comments) => {
  return {
    type: 'SET_COMMENTS',
    comments,
  };
};

const _createComment = (comment) => {
  return {
    type: 'CREATE_COMMENT',
    comment,
  };
};

const _editComment = (comment) => {
  return {
    type: 'EDIT_COMMENT',
    comment,
  };
};

const _deleteComment = (comment) => {
  return {
    type: 'DELETE_COMMENT',
    comment,
  };
};

export const setComments = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/comments');
    dispatch(_setComments(response.data));
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    const response = await axios.post('/api/comments', comment);
    dispatch(_createComment(response.data));
  };
};

export const editComment = (comment) => {
  return async (dispatch) => {
    const response = await axios.put(
      `/api/comments/${comment.commentId}`,
      comment
    );
    dispatch(_editComment(response.data));
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    await axios.delete(`/api/comments/${commentId}`);
    dispatch(_deleteComment(commentId));
  };
};

export default comments;
