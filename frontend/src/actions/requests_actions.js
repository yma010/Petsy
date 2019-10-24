import * as APIUtil from "../util/requests_api_util";

export const RECEIVE_SENT_REQUESTS = "RECEIVE_SENT_REQUESTS";
export const RECEIVE_RECEIVED_REQUESTS = "RECEIVE_RECEIVED_REQUESTS";
export const RECEIVE_SENT_REQUEST = "RECEIVE_SENT_REQUEST";
export const REMOVE_SENT_REQUEST = "REMOVE_SENT_REQUEST";
export const APPROVE_RECEIVED_REQUEST = "APPROVE_RECEIVED_REQUEST";
export const DENY_RECEIVED_REQUEST = "DENY_RECEIVED_REQUEST";

export const receiveSentRequests = sentRequests => ({
  type: RECEIVE_SENT_REQUESTS,
  sentRequests
});

export const receiveReceivedRequests = receivedRequests => ({
  type: RECEIVE_RECEIVED_REQUESTS,
  receivedRequests
});

export const receiveSentRequest = sentRequest => ({
  type: RECEIVE_SENT_REQUEST,
  sentRequest
});

export const removeSentRequest = sentRequestId => ({
  type: REMOVE_SENT_REQUEST,
  sentRequestId
});

export const approveReceivedRequest =({approved, denied}) ({
  type: APPROVE_RECEIVED_REQUEST,
  approved,
  denied
});

export const denyRecievedRequest = deniedRequest => ({
  type: DENY_RECEIVED_REQUEST,
  deniedRequest
})