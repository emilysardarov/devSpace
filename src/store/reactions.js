import axios from 'axios';

const reactions = (state = [], action) => {
  if (action.type === 'SET_REACTIONS') {
    return action.reactions;
  }
  if (action.type === 'CREATE_REACTION') {
    return [...state, action.reaction];
  }
  if (action.type === 'EDIT_REACTION') {
    return state.map((reaction) =>
      reaction.id === action.reaction.id ? action.reaction : reaction
    );
  }
  if (action.type === 'DELETE_REACTION') {
    return state.filter((reaction) => reaction.id !== action.reaction.id);
  }
  return state;
};

const _setReactions = (reactions) => {
  return {
    type: 'SET_REACTIONS',
    reactions,
  };
};

const _createReaction = (reaction) => {
  return {
    type: 'CREATE_REACTION',
    reaction,
  };
};

const _editReaction = (reaction) => {
  return {
    type: 'EDIT_REACTION',
    reaction,
  };
};

const _deleteReaction = (reaction) => {
  return {
    type: 'DELETE_REACTION',
    reaction,
  };
};

export const setReactions = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/reactions');
    dispatch(_setReactions(response.data));
  };
};

export const createReaction = (reaction) => {
  return async (dispatch) => {
    const response = await axios.post('/api/reactions', reaction);
    dispatch(_createReaction(response.data));
  };
};

export const editReaction = (reaction) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/reactions/${reaction.id}`, reaction);
    dispatch(_editReaction(response.data));
  };
};

export const deleteReaction = (reaction) => {
  return async (dispatch) => {
    await axios.delete(`/api/reactions/${reaction.id}`);
    dispatch(_deleteReaction(reaction));
  };
};

export default reactions;
