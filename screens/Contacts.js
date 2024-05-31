import { FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import useContacts from "../hooks/useHooks";
import Context from "../context/Context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ListItem from "../components/ListItem";
import { useRoute } from "@react-navigation/native";
import { db } from "../firebase";

export default function Contacts() {
  const contacts = useContacts();
  const route = useRoute();
  const image = route.params && route.params.image;

  return (
    <FlatList
      className="flex flex-grow p-[10px]"
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />
  );
}

// 3rd mvvm

function ContactPreview({ contact, image }) {
  const { rooms } = useContext(Context);
  const [user, setUser] = useState(contact);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ListItem
      className="mt-[7px]"
      type="contacts"
      user={user}
      image={image}
      room={rooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />
  );
}
