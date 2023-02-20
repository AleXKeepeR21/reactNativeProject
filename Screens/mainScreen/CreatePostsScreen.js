// import React, { useState } from "react";
// import { Camera } from "expo-camera";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import { MaterialIcons } from "@expo/vector-icons";

// const CreatePostsScreen = () => {
//   const [camera, setCamera] = useState(null);
//   const [photo, setPhoto] = useState("");

//   const takePhoto = async () => {
//     const photo = await camera.takePictureAsync();
//     setPhoto(photo.uri);
//   };

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={setCamera}>
//         <View>
//           <Image source={{ url: photo }} />
//         </View>
//         <TouchableOpacity onPress={takePhoto} style={styles.cameraWrap}>
//           {/* <Entypo name="instagram-with-circle" size={24} color="#BDBDBD" /> */}
//           <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
//           {/* <Text style={styles.cameraTitle}>ппп</Text> */}
//         </TouchableOpacity>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: "center",
//     // alignItems: "center",
//   },
//   camera: {
//     marginTop: 32,
//     height: 240,
//     marginHorizontal: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cameraWrap: {
//     borderWidth: 1,
//     backgroundColor: "#FFFFFF",
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cameraTitle: {
//     color: "black",
//   },
// });

// export default CreatePostsScreen;

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
// import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);

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
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      console.log("latitude", location.coords.latitude);
      console.log("longitude", location.coords.longitude);
      setPhoto(uri);
      console.log("photo", photo);
    }
  };

  const sendPhoto = () => {
    navigation.navigate("Home", { photo });
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
});
