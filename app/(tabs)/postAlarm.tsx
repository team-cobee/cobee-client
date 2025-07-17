import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type NotificationType = "comment" | "post" | "invite";

interface Notification {
  id: number;
  sender: string;
  type: NotificationType;
  isRead: boolean;
  profileImage?: string;
}

// 샘플 데이터 - api 연동 후 수정해야
const notifications: Notification[] = [
  {
    id: 1,
    sender: "김감자",
    type: "post",
    isRead: false,
    profileImage: undefined,
  },
  {
    id: 2,
    sender: "김감자",
    type: "invite",
    isRead: false,
    profileImage: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  },
  {
    id: 3,
    sender: "김감자",
    type: "comment",
    isRead: false,
  },
  {
    id: 4,
    sender: "김감자",
    type: "post",
    isRead: false,
  },
];

export default function PostAlarm() {
  const [readIds, setReadIds] = useState<number[]>(() =>
    notifications.filter((n) => n.isRead).map((n) => n.id)
  );

  const handlePress = (id: number) => {
    if (!readIds.includes(id)) {
      setReadIds((prev) => [...prev, id]);
    }
  };

  return (
    <MainLayout title="알림" titleAlign="center" showTabs backType="arrow">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {notifications.map((noti) => {
          const isRead = readIds.includes(noti.id);
          return (
            <TouchableOpacity
              key={noti.id}
              style={[
                styles.card,
                {
                  backgroundColor: isRead ? "#ffffff" : "#FFE9B2",
                  borderColor: isRead ? "#ffffff" : "#FFE9B2",
                },
              ]}
              onPress={() => handlePress(noti.id)}
              activeOpacity={0.9}
            >
              <View style={styles.content}>
                <Image
                  source={{
                    uri:
                      noti.profileImage ??
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.message}>{getMessage(noti)}</Text>
              </View>
              <View style={styles.buttonGroup}>{renderButtons(noti.type)}</View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </MainLayout>
  );
}

function getMessage(noti: Notification): string {
  switch (noti.type) {
    case "comment":
      return `${noti.sender}님께서 댓글을 남겼습니다.`;
    case "post":
      return `${noti.sender}님께서 설문에 응답했습니다.`;
    case "invite":
      return `${noti.sender}님께서 채팅방에 초대했습니다.`;
  }
}

function renderButtons(type: NotificationType) {
  const buttonBase = {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 6,
  };

  const textBase = {
    fontSize: 13,
    color: "#fff",
    textAlign: "center" as const,
  };

  switch (type) {
    case "post":
      return (
        <TouchableOpacity style={{ ...buttonBase, backgroundColor: "#FFB100" }}>
          <Text style={textBase}>초대</Text>
        </TouchableOpacity>
      );

    case "invite":
      return (
        <>
          <TouchableOpacity
            style={{ ...buttonBase, backgroundColor: "#C4C4C4" }}
          >
            <Text style={textBase}>거절</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...buttonBase, backgroundColor: "#F59E0B" }}
          >
            <Text style={textBase}>입장</Text>
          </TouchableOpacity>
        </>
      );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 9,
    marginBottom: 0,
    marginHorizontal: 0,
    borderRadius: 1,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
  },
  message: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
