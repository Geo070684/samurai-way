const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGLE_IS_FETCHING = "TOGLE_IS_FETCHING"

export type UsersType = {
  id: number;
  photos: {
    small: string | null;
    large: string | null;
  };
  followed: boolean;
  name: string;
  status: string;
  uniqueUrlName: null|string
};
export type InitialStateType = {
  users: UsersType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching:boolean
};

type FollowACType = ReturnType<typeof followAC>;
type UnFollowACType = ReturnType<typeof unfollowAC>;
type SetUsersAcType = ReturnType<typeof setUsersAC>;
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;
type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>;
type SetIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>

type ActionType =
  | FollowACType
  | UnFollowACType
  | SetUsersAcType
  | SetCurrentPageACType
  | SetTotalUsersCountACType
  | SetIsFetchingACType;

const initialState: InitialStateType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching:false
};

const UsersRedusers = (
  state: InitialStateType = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: [...state["users"]].map((item) =>
          item.id === action.payload.userId
            ? { ...item, followed: true }
            : item
        ),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: [...state["users"]].map((item) =>
          item.id === action.payload.userId
            ? { ...item, followed: false }
            : item
        ),
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.payload.users,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.payload.totalUsersCount,
      };
    }
    case TOGLE_IS_FETCHING:{
      return {
        ...state, isFetching:action.payload.isFetching
      }
    }


    default:
      return state;
  }
};

export const followAC = (id: number) =>
  ({
    type: FOLLOW,
    payload: {
      userId: id,
    },
  } as const);

export const unfollowAC = (id: number) =>
  ({
    type: UNFOLLOW,
    payload: {
      userId: id,
    },
  } as const);

export const setUsersAC = (users: UsersType[]) =>
  ({
    type: SET_USERS,
    payload: {
      users: users,
    },
  } as const);
  
export const setCurrentPageAC = (currentPage: number) =>
  ({
    type: SET_CURRENT_PAGE,
    payload: {
      currentPage: currentPage,
    },
  } as const);

export const setTotalUsersCountAC = (totalUsersCount: number) =>
  ({
    type: SET_TOTAL_USERS_COUNT,
    payload: {
      totalUsersCount: totalUsersCount,
    },
  } as const);

  export const toggleIsFetchingAC = (isFetching: boolean) =>
  ({
    type: TOGLE_IS_FETCHING,
    payload: {
      isFetching: isFetching,
    },
  } as const);


export default UsersRedusers;
