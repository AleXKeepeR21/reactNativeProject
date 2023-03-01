import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
// import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";

import { db } from "../../firebase/config";
import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function Home({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const storage = getStorage();
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      let locationRef = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: locationRef.coords.latitude,
        longitude: locationRef.coords.longitude,
      };
      setLocation(coords);
      setPhoto(uri);
    }
  };

  const sendPhoto = () => {
    uploadPostsToServer();
    navigation.navigate("Home");
  };

  const uploadPostsToServer = async () => {
    const photo = await uploadPhotoToServer();
    // const createPosts = await db
    //   .firestore()
    //   .collection("posts")
    //   .add({ photo, comment, location: location.coords, userId, login });

    const uniquePostId = Date.now().toString();
    // const photo = await uploadPhoto();
    await setDoc(doc(db, "posts", `${uniquePostId}`), {
      photo: photo,
      location: location,
      // headers: pictureHeaders,
      login: login,
      userId: userId,
      // commentsCount: 0,
      // comment: comment,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(`${photo}`);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();
    const imageRef = await ref(storage, `photos/${uniquePostId}`);
    await uploadBytes(imageRef, file);

    return await getDownloadURL(imageRef);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.photoView}>
          {/* <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity> */}
          <View>
            {photo && (
              <Image source={{ uri: photo }} style={styles.photoContainer} />
            )}
          </View>
          <TouchableOpacity style={styles.cameraWrap} onPress={takePhoto}>
            <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </Camera>
      <View>
        <Text
          style={{
            fontSize: 14,
            marginLeft: 16,
            marginTop: 8,
            color: "#BDBDBD",
          }}
        >
          Редагувати фото
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.formButton}
          onPress={sendPhoto}
        >
          <Text style={styles.textButton}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container2}>
        <MapView
          style={styles.mapStyle}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {location && (
            <Marker
              title="I am here"
              coordinate={location}
              description="Hello"
            />
          )}
        </MapView>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: {
    marginTop: 32,
    height: 240,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  // photoView: {
  //   flex: 1,
  //   backgroundColor: "transparent",
  //   justifyContent: "flex-end",
  // },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  cameraWrap: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    borderColor: "#fff",
    borderWidth: 1,
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  formButton: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  textButton: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    fontSize: 16,
    color: "#212121",
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
  },
  inputContainer: {
    marginTop: 32,
    marginHorizontal: 16,
  },
});
