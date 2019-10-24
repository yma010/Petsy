import * as APIUtil from "../util/requests_api_util";

export const RECEIVE_SENT_REQUESTS = "RECEIVE_SENT_REQUESTS";
export const RECEIVE_RECEIVED_REQUESTS = "RECEIVE_RECEIVED_REQUESTS";
export const RECEIVE_SENT_REQUEST = "RECEIVE_SENT_REQUEST";
export const REMOVE_SENT_REQUEST = "REMOVE_SENT_REQUEST";
export const APPROVE_RECEIVED_REQUEST = "APPROVE_RECEIVED_REQUEST";
export const DENY_RECEIVED_REQUEST = "DENY_RECEIVED_REQUEST";

export const receiveSentRequests = ({sentRequests, pets, users}) => ({
  type: RECEIVE_SENT_REQUESTS,
  sentRequests,
  pets,
  users
});

export const receiveReceivedRequests = ({receivedRequests, pets, users}) => ({
  type: RECEIVE_RECEIVED_REQUESTS,
  receivedRequests,
  pets,
  users
});

export const receiveSentRequest = sentRequest => ({
  type: RECEIVE_SENT_REQUEST,
  sentRequest
});

export const removeSentRequest = sentRequestId => ({
  type: REMOVE_SENT_REQUEST,
  sentRequestId
});

export const approveReceivedRequest = ({approved, denied}) => ({
  type: APPROVE_RECEIVED_REQUEST,
  approved,
  denied
});

export const denyRecievedRequest = deniedRequest => ({
  type: DENY_RECEIVED_REQUEST,
  deniedRequest
});

export const fetchSentRequests = () => dispatch => {
  return APIUtil.requestSentRequests()
    .then(response => {
      let requests = response.data;
      dispatch(receiveSentRequests(requests))
    })
    .catch(err => console.log(err))
}

export const fetchReceivedRequests = () => dispatch => {
  return APIUtil.requestReceivedRequests()
    .then(response => {
      let requests = response.data;
      dispatch(receiveReceivedRequests(requests))
    })
    .catch(err => console.log(err))
}

export const sendRequest = petId => dispatch => {
  return APIUtil.sendRequest(petId)
    .then(response => {
      let request = response.data;
      dispatch(receiveSentRequest(request));
    })
    .catch(err => console.log(err))
}

export const deleteRequest = petId => dispatch => {
  return APIUtil.deleteRequest(petId)
    .then(sentRequestId => dispatch(removeSentRequest(sentRequestId)))
    .catch(err => console.log(err))
}

export const approveRequest = requestId => dispatch => {
  return APIUtil.approveReceivedRequest(requestId)
    .then(requests => dispatch(approveReceivedRequest(requests)))
    .catch(err => console.log(err))
}

export const denyRequest = requestId => dispatch => {
  return APIUtil.denyReceivedRequest(requestId)
    .then(deniedRequest => dispatch(denyRecievedRequest(deniedRequest)))
    .catch(err => console.log(err))
}
