import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import Context from "../context/Context";
import ContactsFloatingIcon from "../components/ContactsFloatingIcon";
import ListItem from "../components/ListItem";
import useContacts from "../hooks/useHooks";

export default function Chats() {
  const { currentUser } = auth;

  const { rooms, setRooms } = useContext(Context);

  const contacts = useContacts();

  // 2nd mvvm architechture - una, ni get ko yung collection ng rooms kung saan present yung currentUser.email sa field
  //  tas nilagay ko sa chatsQuery
  // visualization

  // participantsArray = [ currentUser.email, userB, userC ]

  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        .filter((doc) => doc.data().lastMessage)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p) => p.email !== currentUser.email),
        }));
      setRooms(parsedChats);
    });
    return () => unsubscribe();
  }, []);

  // end of 2nd mvvm

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return (
    <View className="flex flex-grow p-2">
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
      <ContactsFloatingIcon />
    </View>
  );
}
