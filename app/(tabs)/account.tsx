import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AccountSettings() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bellIcon}>
          <Ionicons name="notifications-outline" size={20} color="#333" />
        </TouchableOpacity>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/56' }}
            style={styles.profileImg}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>김박수</Text>
            <Text style={styles.subInfo}>2002.04.30 / 여성</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>회원 정보 수정</Text>
          <Ionicons name="chevron-forward" size={20} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Ionicons name="chevron-forward" size={20} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>공개 프로필 수정</Text>
          <Ionicons name="chevron-forward" size={20} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>제출 명단 확인</Text>
          <Ionicons name="chevron-forward" size={20} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>내가 쓴 구인글</Text>
          <Ionicons name="chevron-forward" size={20} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>로그아웃</Text>
          <Ionicons name="chevron-forward" size={20} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>회원탈퇴</Text>
          <Ionicons name="chevron-forward" size={20} color="#222" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffb84d',
    paddingTop: 24,
    paddingBottom: 48,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 24,
  },
  bellIcon: {
    position: 'absolute',
    right: 16,
    top: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subInfo: {
    fontSize: 13,
    marginTop: 4,
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: -32,
    marginHorizontal: 16,
    paddingTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#222',
  },
  });