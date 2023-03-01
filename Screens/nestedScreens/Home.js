import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList, Button, Text } from "react-native";
import { db } from "../../firebase/config";
import { collection, getDocs, query } from "firebase/firestore";

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  // const { login } = useSelector((state) => state.auth);
  // const { avatar } = useSelector((state) => state.auth);

  let uniquePostId = "";
  if (route.params) {
    uniquePostId = route.params.uniquePostId;
  }

  const q = query(collection(db, "posts"));

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(q);
    const allPosts = querySnapshot.docs.map((post) => ({
      ...post.data(),
      id: post.id,
    }));

    const sortedPosts = allPosts.sort(
      (firstContact, secondContact) => secondContact.id - firstContact.id
    );
    setPosts(sortedPosts);
  };

  useEffect(() => {
    getAllPosts();
  }, [uniquePostId]);

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);
  // console.log("posts", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.photoContainer} />
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View>
              <Button
                title="go to map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="go to Comments"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
            </View>
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

export default Home;
