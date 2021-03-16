let allUserInfo = {};

export const setParticipantsInfo = (data) => {
  allUserInfo = { ...allUserInfo, ...data };
};

export const getParticipantsInfo = () => {
  return { ...allUserInfo };
};

export default {
  setParticipantsInfo,
  getParticipantsInfo,
};
