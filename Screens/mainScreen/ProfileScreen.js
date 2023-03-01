import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperation";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getUserComments = query(
    collection(db, "posts"),
    where("userId", "==", userId)
  );

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(getUserComments);
    const allPosts = querySnapshot.docs.map((post) => ({
      ...post.data(),
      id: post.id,
    }));

    const sortedPosts = allPosts.sort(
      (firstContact, secondContact) => secondContact.id - firstContact.id
    );
    setPosts(sortedPosts);
  };

  // const deletePost = async (postId) => {
  //   await deleteDoc(doc(db, "posts", postId));
  //   setDeletedPost(postId);
  // };

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      {/* <Text>ProfileScreen</Text> */}
      <Button title="sign out" onPress={signOut} />
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.photoContainer} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    borderColor: "#fff",
    borderWidth: 1,

    marginTop: 32,
    height: 240,
    width: 343,
    // marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});

export default ProfileScreen;
