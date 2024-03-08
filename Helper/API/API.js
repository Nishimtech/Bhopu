import axios from 'axios'
import { Config, Constant } from '..';
import Path from './Path';
import { I18n } from '../../i18n';
const instance = axios.create({
  baseURL: Config.apiGateway,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': I18n.locale,
  },
});
const instanceGET = axios.create({
  method: 'GET',
});

const API = {
  LOGIN: (data = {}) => instance({
    'url': Path.LOGIN,
    'data': data,
  }),
  SIGNUP: (data = {}) => instance({
    'url': Path.SIGNUP,
    'data': data,
  }),
  SIGNUP_VALIDATE: (data = {}) => instance({
    'url': Path.SIGNUP_VALIDATE,
    'data': data,
  }),
  RESEND_OTP: (data = {}) => instance({
    'url': Path.RESEND_OTP,
    'data': data,
  }),
  FORGOT_PASSWORD: (data = {}) => instance({
    'url': Path.FORGOT_PASSWORD,
    'data': data,
  }),
  GET_GAME_TYPE_LIST: (data = {}) => instance({
    'url': Path.GET_GAME_TYPE_LIST,
    'data': data,
  }),
  GET_DAILY_STREAK_COINS: (data = {}) => instance({
    'url': Path.GET_DAILY_STREAK_COINS,
    'data': data,
    headers: ((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null) ? {
      'session_key': Constant.SESSION_KEY
    } : {})
  }),
  CLAIM_COINS: (data = {}) => instance({
    'url': Path.CLAIM_COINS,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_UNREAD_NOTIFICATION: (data = {}) => instance({
    'url': Path.GET_UNREAD_NOTIFICATION,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_LOBBY_FILTER: (data = {}) => instance({
    'url': Path.GET_LOBBY_FILTER,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_LOBBY_FIXTURE: (data = {}) => instance({
    'url': Path.GET_LOBBY_FIXTURE,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_FIXTURE_DETAILS: (data = {}) => instance({
    'url': Path.GET_FIXTURE_DETAILS,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_CONTEST_DETAIL: (data = {}) => instance({
    'url': Path.GET_CONTEST_DETAIL,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_CONTEST_USERS: (data = {}) => instance({
    'url': Path.GET_CONTEST_USERS,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_LINEUP_MASTER_DATA: (data = {}) => instance({
    'url': Path.GET_LINEUP_MASTER_DATA,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_ALL_ROSTER: (data = {}) => instance({
    'url': Path.GET_ALL_ROSTER,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  CHECK_FANTASY_POINTS: (data = {}) => instance({
    'url': Path.CHECK_FANTASY_POINTS,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_USER_BALANCE: (data = {}) => instance({
    'url': Path.GET_USER_BALANCE,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  JOIN_GAME: (data = {}) => instance({
    'url': Path.JOIN_GAME,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  CREATE_ROUND_TEAM: (data = {}) => instance({
    'url': Path.CREATE_ROUND_TEAM,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_USER_CONTEST_BY_STATUS: (data = {}) => instance({
    'url': Path.GET_USER_CONTEST_BY_STATUS,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_USER_LINEUP: (data = {}) => instance({
    'url': Path.GET_USER_LINEUP,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_MY_TEAM_DATA: (data = {}) => instance({
    'url': Path.GET_MY_TEAM_DATA,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  UPDATE_TEAM_LINEUP: (data = {}) => instance({
    'url': Path.UPDATE_TEAM_LINEUP,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_CONTEST_LEADERBOARD: (data = {}) => instance({
    'url': Path.GET_CONTEST_LEADERBOARD,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_H2H_LEADERBOARD: (data = {}) => instance({
    'url': Path.GET_H2H_LEADERBOARD,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_BRACKET_CONTEST_LEADERBOARD: (data = {}) => instance({
    'url': Path.GET_BRACKET_CONTEST_LEADERBOARD,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_ADVERTISEMENT: (sports_id) => instanceGET({
    'url': `${Config.s3URL}${'appstatic'}/prd_lobby_banner_list_${sports_id}_en.json`,
  }),
  CREATE_USER_CONTEST: (data) => instance({
    'url': Path.CREATE_USER_CONTEST,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_USERNAME_LIST: (data = {}) => instance({
    'url': Path.GET_USERNAME_LIST,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  INVITE_CODE: (data = {}) => instance({
    'url': Path.INVITE_CODE,
    'data': data,
    headers: ((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null) ? {
      'Sessionkey': Constant.SESSION_KEY
    } : {})
  }),
  GET_BRACKET_TEAM_COMPARE: (data = {}) => instance({
    'url': Path.GET_BRACKET_TEAM_COMPARE,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  COLLECTION_LIST: (data = {}) => instance({
    'url': Path.COLLECTION_LIST,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  CREATE_CONTEST_MASTER_DATA: (data = {}) => instance({
    'url': Path.CREATE_CONTEST_MASTER_DATA,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  SENT_CONTEST_INVITE: (data = {}) => instance({
    'url': Path.SENT_CONTEST_INVITE,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  CHECK_ELIGIBILITY_FOR_CONTEST: (data = {}) => instance({
    'url': Path.CHECK_ELIGIBILITY_FOR_CONTEST,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
  GET_MY_STATS: (data = {}) => instance({
    'url': Path.GET_MY_STATS,
    'data': data,
    headers:((Constant.SESSION_KEY != '' && Constant.SESSION_KEY != null)? {
      'Sessionkey': Constant.SESSION_KEY
    }:{})
  }),
}
export default API;
