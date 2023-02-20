import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList, Button } from "react-native";

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.photoContainer} />
            <Button
              title="go to map"
              onPress={() => navigation.navigate("Map")}
            />
            <Button
              title="go to Comments"
              onPress={() => navigation.navigate("Comments")}
            />
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
