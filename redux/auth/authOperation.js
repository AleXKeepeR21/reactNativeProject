import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authReduser";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const { uid, displayName } = await auth.currentUser;
      console.log(displayName, uid);
      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        authStateChange({
          stateChange: true,
        })
      );
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////////////////
// import { auth } from "../../firebase/config";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { authSlice } from "./authReducer";

// // todo: /DONE/ https://amanhimself.dev/blog/remove-asyncstorage-has-been-extracted-warning-using-firebase//

// export const authSignUpUser =
//   ({ email, password, login }) =>
//   async (dispatch, getState) => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(auth.currentUser, {
//         displayName: login,
//       });

//       const updatedUser = await auth.currentUser;
//       // console.log('test: ', test);
//       const { uid, displayName } = updatedUser;
//       // console.log(displayName, uid);
//       dispatch(
//         authSlice.actions.updateUserProfile({
//           userId: uid,
//           login: displayName,
//         })
//       );
//     } catch (err) {
//       // console.log('error', err);
//       console.log("error message", err.message);
//     }
//   };

// export const authSignInUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       const loggedUser = await auth.currentUser;
//       const { uid, displayName } = loggedUser;
//       // console.log(displayName, uid);
//       dispatch(
//         authSlice.actions.updateUserProfile({
//           userId: uid,
//           login: displayName,
//         })
//       );
//     } catch (err) {
//       // console.log('error', err);
//       console.log("error message", err.message);
//     }
//   };

// export const authStateChangeUser = () => async (dispatch, getState) => {
//   try {
//     await onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const authUser = auth.currentUser;
//         // console.log('test: ', test);
//         const { uid, displayName } = authUser;
//         // console.log(displayName, uid);
//         dispatch(
//           authSlice.actions.updateUserProfile({
//             userId: uid,
//             login: displayName,
//           })
//         );
//         dispatch(authSlice.actions.authStateChange({ currentState: true }));
//       }
//     });
//   } catch (err) {
//     // console.log('error', err);
//     console.log("error message", err.message);
//   }
// };

// export const authSignOutUser = () => async (dispatch, getState) => {
//   console.log("out");
//   await auth.signOut();
//   dispatch(authSlice.actions.authSignOut());
// };
